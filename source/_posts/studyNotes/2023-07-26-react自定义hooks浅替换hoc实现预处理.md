---
layout: blog
# istop: true
title: "react自定义hooks浅替换hoc实现预处理"
mark: 原创
# background-image: https://o243f9mnq.qnssl.com/2017/06/116099051.jpg
background: notes
date: 2023-07-26
category: 学习笔记
tags:
  - react
  - hooks
  - hoc
  - 预处理
---

自定义hooks: 
```ts
import { useLocation } from 'react-router';
import { MetaForm } from '../metaRender/interface';
import { useEffect, useState } from 'react';
import { getCommonHints, getMetaData, getPageName } from '@/actions';
import { ErrorBlock, NoticeBar } from 'antd-mobile';
import React from 'react';
import Spin from '../spin';
import _ from 'lodash';

export type DocProps = {
  meta: {
    defaultValue: any;
    metaData: MetaForm;
  };
  pageName: any;
  warningTip: any;
  sourceProps: any;
};

const useDoc = () => {
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);
  const [props, setProps] = useState<DocProps>({
    meta: {
      metaData: {},
      defaultValue: {},
    },
    sourceProps: {},
  } as DocProps);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const { state } = location;
    const { id, billTypeCode = '', templateCode = '', orgId } = state;
    const pkey = `${billTypeCode}${templateCode}`;
    try {
      const metaData = await getMetaData({
        keyId: id,
        pkey,
        orgId,
      });
      const pageName = await getPageName({ templateCode: pkey });
      const commonHints = id && (await getCommonHints(id, billTypeCode)).result;
      setProps({
        meta: {
          defaultValue: metaData.attribute?.defaultValue || {},
          metaData: metaData.result,
        },
        pageName: pageName.result,
        warningTip: commonHints && <NoticeBar content={commonHints.result} color='alert' />,
        sourceProps: state,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  let loadNode: any = null;
  if (loading) {
    loadNode = <Spin spinning={loading} loadText='元数据加载中...'></Spin>;
  } else if (_.isEmpty(props)) {
    loadNode = <ErrorBlock title='元数据不存在或者配置错误' description='请检查元数据配置' fullPage />;
  } else {
    loadNode = null;
  }

  return { ...props, loadNode };
};

export default useDoc;

```

使用: 
> tips: 要确保所有的return操作在useEffect等hooks之后，否则会报错: 两次渲染间加载了额外的hooks
```ts
const Index: React.FC<any> = () => {
  const { loadNode, ...props } = useDoc();

  if (loadNode) {
    return loadNode;
  }

  return <div>
    组件内容
  </div>
}
```