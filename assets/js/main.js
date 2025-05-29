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
    
    // Initialize search if function exists
    if (typeof window.initializeSearch === 'function') {
      window.initializeSearch();
    }
    
    // Initialize note tree if function exists
    if (typeof window.initializeNoteTree === 'function') {
      window.initializeNoteTree();
    }
    
    // Initialize algorithms if function exists
    if (typeof window.groupAlgorithms === 'function') {
      window.groupAlgorithms();
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
  
  // Also initialize on window load for additional components
  window.addEventListener('load', function() {
    if (typeof window.groupAlgorithms === 'function') {
      window.groupAlgorithms();
    }
  });
})();
