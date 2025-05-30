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
  
  // Category toggle functionality
  function initializeCategoryToggles() {
    document.querySelectorAll('.category-header').forEach(function(header) {
      header.addEventListener('click', function(e) {
        // Handle Note category redirect
        if (this.hasAttribute('data-target') && this.getAttribute('data-target') === 'note') {
          if (window.location.pathname !== '/' && !window.location.pathname.endsWith('/index.html')) {
            window.location.href = '/';
            return;
          }
          return;
        }
        
        const targetContainer = this.parentElement;
        let targetElement;
        
        // Find and toggle appropriate content
        if (targetContainer.querySelector('#noteList')) {
          const searchElement = document.getElementById('noteSearch');
          targetElement = document.getElementById('noteList');

          if (targetElement.classList.contains('hidden')) {
            searchElement.classList.remove('hidden');
            targetElement.classList.remove('hidden');
          } else {
            searchElement.classList.add('hidden');
            targetElement.classList.add('hidden');
          }
        } else if (targetContainer.querySelector('#algorithmList')) {
          targetElement = document.getElementById('algorithmList');
          toggleDisplay(targetElement);
        } else if (targetContainer.querySelector('#graphicsList')) {
          targetElement = document.getElementById('graphicsList');
          toggleDisplay(targetElement);
        }
      });
    });
  }
  
  function toggleDisplay(element) {
    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
    } else {
      element.classList.add('hidden');
    }
  }
  
  // Initialize all components
  function initialize() {
    initializeProgressBar();
    initializeCategoryToggles();
    
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
