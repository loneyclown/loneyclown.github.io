/**
 * Neo-Ancient Theme — 赛博古风
 * 赛博朋克 × 中国古风 融合设计
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. 粒子背景 (水墨粒子)
  // ==========================================================================
  function initParticles() {
    var canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var particles = [];
    var maxParticles = 60;
    var w, h;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function createParticle() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: Math.random() < 0.5 ? '0, 240, 255' : '212, 160, 23' // cyan or gold
      };
    }

    function drawParticle(p) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + p.color + ',' + p.opacity + ')';

      // 霓虹发光
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(' + p.color + ',0.4)';
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    function updateParticle(p) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
    }

    // 画连线
    function drawLines() {
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            var opacity = (1 - dist / 120) * 0.08;
            ctx.strokeStyle = 'rgba(0, 240, 255,' + opacity + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < particles.length; i++) {
        updateParticle(particles[i]);
        drawParticle(particles[i]);
      }

      drawLines();
      requestAnimationFrame(animate);
    }

    // 初始化
    resize();
    for (var i = 0; i < maxParticles; i++) {
      particles.push(createParticle());
    }
    animate();

    window.addEventListener('resize', function () {
      resize();
      particles = [];
      for (var i = 0; i < maxParticles; i++) {
        particles.push(createParticle());
      }
    });
  }

  // ==========================================================================
  // 2. 移动端导航
  // ==========================================================================
  function initMobileNav() {
    var toggle = document.getElementById('menu-toggle');
    var nav = document.getElementById('nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });

    // 点击链接后关闭
    var links = nav.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {
        nav.classList.remove('open');
      });
    }
  }

  // ==========================================================================
  // 3. 滚动渐入动画
  // ==========================================================================
  function initScrollReveal() {
    var cards = document.querySelectorAll('.cyber-card, .archive-item');
    if (!cards.length) return;

    // 标记所有卡片
    for (var i = 0; i < cards.length; i++) {
      cards[i].classList.add('scroll-hidden');
    }

    function reveal() {
      var windowHeight = window.innerHeight;
      for (var i = 0; i < cards.length; i++) {
        var rect = cards[i].getBoundingClientRect();
        if (rect.top < windowHeight - 60) {
          cards[i].classList.add('scroll-revealed');
        }
      }
    }

    reveal();
    window.addEventListener('scroll', reveal);
  }

  // ==========================================================================
  // 4. 霓虹闪烁 (标题)
  // ==========================================================================
  function initNeonFlicker() {
    var titles = document.querySelectorAll('.cyber-gradient-text');
    for (var i = 0; i < titles.length; i++) {
      titles[i].classList.add('neon-flicker');
    }
  }

  // ==========================================================================
  // 5. 代码块复制按钮
  // ==========================================================================
  function initCodeCopy() {
    var blocks = document.querySelectorAll('.cyber-prose pre');
    for (var i = 0; i < blocks.length; i++) {
      (function (block) {
        var btn = document.createElement('button');
        btn.className = 'code-copy-btn';
        btn.innerHTML = '复制';
        btn.style.cssText =
          'position:absolute;top:8px;right:8px;padding:4px 10px;' +
          'background:var(--cyber-bg-tertiary);border:1px solid var(--cyber-border);' +
          'color:var(--cyber-text-dim);border-radius:var(--radius-sm);font-size:0.75rem;' +
          'cursor:pointer;font-family:var(--font-mono);transition:all 0.2s;z-index:1;';

        btn.addEventListener('mouseenter', function () {
          btn.style.borderColor = 'var(--cyber-cyan)';
          btn.style.color = 'var(--cyber-cyan)';
        });
        btn.addEventListener('mouseleave', function () {
          btn.style.borderColor = 'var(--cyber-border)';
          btn.style.color = 'var(--cyber-text-dim)';
        });

        btn.addEventListener('click', function () {
          var code = block.querySelector('code');
          if (!code) return;
          var text = code.textContent || code.innerText;

          // Fallback for older browsers
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () {
              btn.innerHTML = '已复制';
              setTimeout(function () { btn.innerHTML = '复制'; }, 2000);
            });
          } else {
            var textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
              document.execCommand('copy');
              btn.innerHTML = '已复制';
              setTimeout(function () { btn.innerHTML = '复制'; }, 2000);
            } catch (e) {
              btn.innerHTML = '失败';
            }
            document.body.removeChild(textarea);
          }
        });

        block.style.position = 'relative';
        block.appendChild(btn);
      })(blocks[i]);
    }
  }

  // ==========================================================================
  // 6. 搜索功能
  // ==========================================================================
  function initSearch() {
    var input = document.getElementById('search-input');
    if (!input) return;

    // placeholder location for search results
    var resultBox = document.getElementById('search-result');
    if (!resultBox) {
      resultBox = document.createElement('div');
      resultBox.id = 'search-result';
      resultBox.className = 'absolute top-full left-0 right-0 mt-2 z-50 search-results-dropdown';
      input.parentNode.appendChild(resultBox);
    }

    input.addEventListener('input', function () {
      var query = input.value.trim();
      if (query.length < 2) {
        resultBox.innerHTML = '';
        resultBox.style.display = 'none';
        return;
      }

      // 尝试从 search.json 搜索
      if (window.searchData || (window.__searchData)) {
        performSearch(query, resultBox);
      } else {
        fetch('/search.json')
          .then(function (r) { return r.json(); })
          .then(function (data) {
            window.__searchData = data;
            performSearch(query, resultBox);
          })
          .catch(function () {
            resultBox.innerHTML =
              '<div class="p-4 text-cyber-gray text-sm">搜索不可用</div>';
          });
      }
    });

    function performSearch(query, resultBox) {
      var data = window.__searchData;
      if (!data) return;

      var results = [];
      var q = query.toLowerCase();

      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (
          (item.title && item.title.toLowerCase().indexOf(q) !== -1) ||
          (item.text && item.text.toLowerCase().indexOf(q) !== -1)
        ) {
          results.push(item);
        }
        if (results.length >= 8) break;
      }

      if (results.length === 0) {
        resultBox.innerHTML =
          '<div class="cyber-card p-4 text-cyber-gray text-sm">未找到结果</div>';
      } else {
        var html = '';
        for (var j = 0; j < results.length; j++) {
          html +=
            '<a href="' + results[j].url + '" class="block cyber-card p-3 mb-1 hover-lift">' +
            '<div class="text-sm font-bold cyber-link-title">' + results[j].title + '</div>' +
            '</a>';
        }
        resultBox.innerHTML = html;
      }
      resultBox.style.display = 'block';
    }

    // 点击外部关闭
    document.addEventListener('click', function (e) {
      if (e.target !== input && e.target !== resultBox) {
        resultBox.style.display = 'none';
      }
    });
  }

  // ==========================================================================
  // 启动
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', function () {
    initParticles();
    initMobileNav();
    initScrollReveal();
    initNeonFlicker();
    initCodeCopy();
    initSearch();
  });
})();
