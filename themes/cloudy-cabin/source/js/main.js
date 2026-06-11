// ====================
// Cloudy Cabin - Main JS
// ====================

(function() {
  'use strict';

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('cloudy-theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    updateThemeIcon(true);
  } else if (savedTheme === 'light') {
    body.classList.remove('dark-mode');
    updateThemeIcon(false);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.add('dark-mode');
    updateThemeIcon(true);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const isDark = body.classList.toggle('dark-mode');
      localStorage.setItem('cloudy-theme', isDark ? 'dark' : 'light');
      updateThemeIcon(isDark);
    });
  }

  function updateThemeIcon(isDark) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  // Search functionality
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');

  if (searchInput && searchBtn) {
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }

  function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
      // Use Hexo search or redirect to search page
      window.location.href = '/search/?q=' + encodeURIComponent(query);
    }
  }

  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const headerNav = document.querySelector('.header-nav');

  if (mobileMenuToggle && headerNav) {
    mobileMenuToggle.addEventListener('click', function() {
      headerNav.classList.toggle('mobile-open');
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add loaded class for animations
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });

  // Intersection Observer for scroll reveal
  if ('IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('.post-card, .sidebar-card, .timeline-item');
    
    const revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      revealObserver.observe(el);
    });
  }

  // Header shadow on scroll
  const header = document.querySelector('.site-header');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (header) {
      if (currentScroll > 10) {
        header.querySelector('.header-inner').style.boxShadow = '0 4px 24px rgba(175, 203, 255, 0.3)';
      } else {
        header.querySelector('.header-inner').style.boxShadow = '';
      }
    }

    lastScroll = currentScroll;
  });

})();
