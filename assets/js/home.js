---
layout: none
---

document.addEventListener('DOMContentLoaded', function() {
  console.log("Home.js loaded");
  
  const allNotes = [
    {% for note in site.notes %}
      {
        title: "{{ note.title  | escape }}",
        url: "{{ note.url | relative_url }}",
        description: "{{ note.description | escape }}",
        category: "{{ note.path | remove: '_notes/' | split: '/' | pop | join: '/' }}"
      },
    {% endfor %}
  ];

  // Function to format category: replace hyphens with spaces and capitalize each word
  function formatCategory(category) {
    if (!category) return [{ text: "Note", class: "category-item" }];
    
    // Split by slash to get path segments
    return category.split('/').map(segment => {
      // Replace hyphens with spaces and capitalize each word
      const formattedSegment = segment.split('-').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }).join(' ');
      
      return { 
        text: formattedSegment,
        class: "category-item"
      };
    });
  }

  // Function to display all notes
  function displayAllNotes() {
    const gridContainer = document.getElementById('notesGrid');
    if (!gridContainer) {
      console.error('Notes grid container not found');
      return;
    }
    
    console.log("Displaying all", allNotes.length, "notes");
    
    // Clear previous notes
    gridContainer.innerHTML = '';
    
    // Add each note as a card
    allNotes.forEach(note => {
      const noteCard = document.createElement('div');
      noteCard.className = 'note-card';
      
      // Get category segments as an array of objects
      const categorySegments = formatCategory(note.category);
      
      // Create category elements HTML
      const categoryHTML = categorySegments.map(segment => 
        `<span class="${segment.class}">${segment.text}</span>`
      ).join('');
      
      const noteContent = `
        <a href="${note.url}">
          <h3>${note.title}</h3>
          <p>${note.description || 'No description available'}</p>
          <div class="note-categories">
            ${categoryHTML}
          </div>
        </a>
      `;
      
      noteCard.innerHTML = noteContent;
      gridContainer.appendChild(noteCard);
    });
    
    // Apply masonry layout after all cards are added
    applyMasonryLayout();
    
    // Reapply masonry on window resize
    window.addEventListener('resize', debounce(applyMasonryLayout, 100));
  }
  
  // Simple masonry layout implementation
  function applyMasonryLayout() {
    const grid = document.getElementById('notesGrid');
    const items = document.querySelectorAll('.note-card');
    
    if (!grid || items.length === 0) return;
    
    // Reset positions
    grid.style.height = '';
    items.forEach(item => {
      item.style.transform = '';
    });
    
    // Get column width based on screen size
    const gridWidth = grid.offsetWidth;
    let columns = 4; // Default to 4 columns
    
    if (window.innerWidth <= 600) {
      columns = 1;
    } else if (window.innerWidth <= 900) {
      columns = 2;
    } else if (window.innerWidth <= 1200) {
      columns = 3;
    }
    
    const columnWidth = gridWidth / columns;
    const gap = 20; // Gap between items
    
    // Create array to track column heights
    const columnHeights = Array(columns).fill(0);
    
    // Position each item
    items.forEach((item, index) => {
      // Find column with lowest height
      const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
      
      // Position item
      const x = shortestColumn * columnWidth;
      const y = columnHeights[shortestColumn];
      
      item.style.transform = `translateX(${x}px) translateY(${y}px)`;
      item.style.width = `${columnWidth - gap}px`;
      
      // Update column height
      columnHeights[shortestColumn] += item.offsetHeight + gap;
    });
    
    // Set grid height to tallest column
    grid.style.height = `${Math.max(...columnHeights)}px`;
  }
  
  // Debounce function to limit how often a function can run
  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  }

  // Display all notes when page loads
  displayAllNotes();
});
