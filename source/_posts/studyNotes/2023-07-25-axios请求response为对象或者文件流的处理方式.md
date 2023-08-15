---
layout: blog
# istop: true
title: "axios请求response为对象或者文件流的处理方式"
mark: 原创
# background-image: https://o243f9mnq.qnssl.com/2017/06/116099051.jpg
background: notes
date: 2023-07-25
category: 学习笔记
tags:
  - axios
  - 文件流
---

```ts
const res = await Axios.get(url, {
	params,
	responseType: "blob",
});
// 如果response为json串
if (res.data.type === "application/json") {
	const reader = new FileReader();
	reader.readAsText(res.data, "utf-8"); // 设置读取的数据以及返回的数据类型为utf-8
	reader.addEventListener("loadend", function () {
		const json = JSON.parse(reader.result as any); // 返回的数据
		console.log(json);
	});
} else {
	const fileName = `需要下载的文件名`;
	const blob = new Blob([res.data], { type: "application/zip" }); // 需要下载的文件类型
	if (window.navigator && window.navigator.msSaveOrOpenBlob) {
		window.navigator.msSaveOrOpenBlob(blob, fileName);
	} else {
		const downloadElement = document.createElement("a");
		const href = window.URL.createObjectURL(blob); //创建下载的链接
		downloadElement.href = href;
		downloadElement.download = fileName; //下载后文件名
		document.body.appendChild(downloadElement);
		downloadElement.click(); //点击下载
		document.body.removeChild(downloadElement); //下载完成移除元素
		window.URL.revokeObjectURL(href); //释放掉blob对象
	}
}
```
