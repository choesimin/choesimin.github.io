---
layout: none
---

// Search functionality
(function() {
  'use strict';
  
  let searchInitialized = false;
  
  function initializeSearch() {
    if (searchInitialized) return;
    
    const searchInput = document.querySelector('#noteSearch input');
    const searchResults = document.getElementById('searchResult');
    const noteList = document.getElementById('noteList');
    
    if (!searchInput || !searchResults || !noteList) return;
    
    // Initialize Simple Jekyll Search
    SimpleJekyllSearch({
      searchInput: searchInput,
      resultsContainer: searchResults,
      json: '/assets/json/note-search.json',
      searchResultTemplate: '<li><a href="{url}"><div class="search-title">{title}</div><div class="search-description">{description}</div></a></li>',
      noResultsText: 'No results found',
      limit: 30,
      fuzzy: false
    });
    
    // Handle search input changes
    searchInput.addEventListener('input', function(e) {
      if (this.value.trim() !== '') {
        noteList.classList.add('hidden');
        searchResults.classList.remove('hidden');
      } else {
        noteList.classList.remove('hidden');
        searchResults.classList.add('hidden');
      }
    });
    
    // Handle clicks outside search
    document.addEventListener('click', function(e) {
      if (!searchInput.contains(e.target) && 
          !searchResults.contains(e.target) && 
          searchInput.value.trim() !== '') {
        searchInput.value = '';
        searchResults.classList.add('hidden');
        noteList.classList.remove('hidden');
      }
    });
    
    searchInitialized = true;
  }
  
  // Export function
  window.initializeSearch = initializeSearch;
})();
