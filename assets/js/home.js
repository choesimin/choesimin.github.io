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
  }
  
  // Display all notes when page loads
  displayAllNotes();
});
