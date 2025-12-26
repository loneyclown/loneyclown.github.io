// 科幻主题主脚本

(function() {
  'use strict';

  // 初始化
  document.addEventListener('DOMContentLoaded', function() {
    initSearch();
    initSmoothScroll();
    initCodeHighlight();
  });

  // 搜索功能
  function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResult = document.getElementById('search-result');
    
    if (!searchInput || !searchResult) return;

    let searchData = null;

    // 加载搜索数据
    fetch('/search.json')
      .then(response => response.json())
      .then(data => {
        searchData = data;
      })
      .catch(err => console.error('搜索数据加载失败:', err));

    searchInput.addEventListener('input', function(e) {
      const query = e.target.value.trim().toLowerCase();
      
      if (!query || !searchData) {
        searchResult.classList.remove('show');
        return;
      }

      const results = searchData.filter(item => {
        const title = (item.title || '').toLowerCase();
        const content = (item.content || '').toLowerCase();
        return title.includes(query) || content.includes(query);
      }).slice(0, 10);

      if (results.length > 0) {
        searchResult.innerHTML = results.map(item => `
          <a href="${item.path}" class="search-result-item">
            <h4>${item.title}</h4>
            <p>${item.content.substring(0, 100)}...</p>
          </a>
        `).join('');
        searchResult.classList.add('show');
      } else {
        searchResult.innerHTML = '<p class="no-result">未找到相关结果</p>';
        searchResult.classList.add('show');
      }
    });

    // 点击外部关闭搜索结果
    document.addEventListener('click', function(e) {
      if (!searchInput.contains(e.target) && !searchResult.contains(e.target)) {
        searchResult.classList.remove('show');
      }
    });
  }

  // 平滑滚动
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // 代码高亮（如果需要）
  function initCodeHighlight() {
    // 这里可以集成 highlight.js 或其他代码高亮库
    // 目前使用 Hexo 内置的高亮功能
  }
})();

