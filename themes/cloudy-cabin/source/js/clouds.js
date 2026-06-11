// ====================
// Cloudy Cabin - Clouds Animation
// ====================

(function() {
  'use strict';

  // Additional cloud interactions can be added here
  // The CSS animations handle the basic floating
  // This file is for any JS-based cloud effects

  const cloudsBg = document.getElementById('cloudsBg');
  if (!cloudsBg) return;

  // Parallax effect on mouse move
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  document.addEventListener('mousemove', function(e) {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 10;
  });

  function animateClouds() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    const clouds = cloudsBg.querySelectorAll('.cloud');
    clouds.forEach(function(cloud, index) {
      const factor = (index + 1) * 0.3;
      cloud.style.transform = 'translate(' + (currentX * factor) + 'px, ' + (currentY * factor) + 'px)';
    });

    requestAnimationFrame(animateClouds);
  }

  // Only enable parallax on non-touch devices
  if (!window.matchMedia('(pointer: coarse)').matches) {
    animateClouds();
  }

})();
