---
layout: none
---

// Main application initialization
(function() {
  'use strict';
  
  // Progress bar functionality
  function initializeProgressBar() {
    const progressBar = document.getElementById("progressBar");
    if (!progressBar) return;
    
    window.addEventListener('scroll', function() {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + "%";
    });
  }

  // Initialize all components
  function initialize() {
    initializeProgressBar();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
})();
