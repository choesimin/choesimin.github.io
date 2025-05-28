---
layout: none
---

// Algorithm functionality
(function() {
  'use strict';
  
  function groupAlgorithms() {
    const algorithmList = document.getElementById('algorithmList');
    if (!algorithmList) return;
    
    algorithmList.innerHTML = '';
    
    // Get all algorithm problems
    const algorithmProblems = [
      {% for problem in site.problems %}
      {
        url: "{{ problem.url | relative_url }}",
        category: "{{ problem.category }}",
        title: "{{ problem.title }}",
        tags: "{{ problem.tags }}"
      },
      {% endfor %}
    ];
    
    if (algorithmProblems.length === 0) return;
    
    // Group problems by category
    const categories = {};
    algorithmProblems.forEach(function(problem) {
      if (!categories[problem.category]) {
        categories[problem.category] = [];
      }
      categories[problem.category].push(problem);
    });
    
    // Create category groups
    for (const category in categories) {
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'algorithm-category';
      
      // Create category header
      const categoryHeader = document.createElement('div');
      categoryHeader.className = 'algorithm-category-header';
      categoryHeader.innerHTML = `
        <span class="display-inline-block">${category.charAt(0).toUpperCase() + category.slice(1)}</span>
        <span class="float-right">
          <span class="count-display">${categories[category].length}</span>
          <span class="toggle-icon">▾</span>
        </span>
      `;
      categoryDiv.appendChild(categoryHeader);
      
      // Create list of problems
      const problemList = document.createElement('ul');
      problemList.classList.add('hidden');
      
      categories[category].forEach(function(problem) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <a href="${problem.url}">
            ${problem.title}
            <small class="algorithm-tag">(${problem.tags})</small>
          </a>
        `;
        problemList.appendChild(listItem);
      });
      
      categoryDiv.appendChild(problemList);
      algorithmList.appendChild(categoryDiv);
      
      // Add toggle functionality
      categoryHeader.addEventListener('click', function() {
        const list = this.nextElementSibling;
        const icon = this.querySelector('.toggle-icon');
        if (list.classList.contains('hidden')) {
          list.classList.remove('hidden');
          icon.classList.add('open');
        } else {
          list.classList.add('hidden');
          icon.classList.remove('open');
        }
      });
    }
  }
  
  // Export function
  window.groupAlgorithms = groupAlgorithms;
})();
