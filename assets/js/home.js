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

  // Function to get random notes
  function getRandomNotes(count) {
    // Create a copy of the notes array
    const notesCopy = [...allNotes];
    const randomNotes = [];
    const totalNotes = notesCopy.length;
    
    console.log("Getting", count, "random notes from", totalNotes, "total notes");
    
    // Get random notes or all notes if fewer than count
    const numToShow = Math.min(count, totalNotes);
    
    for (let i = 0; i < numToShow; i++) {
      // Get random index
      const randomIndex = Math.floor(Math.random() * notesCopy.length);
      // Add the note to randomNotes
      randomNotes.push(notesCopy[randomIndex]);
      // Remove the note from the copy to avoid duplicates
      notesCopy.splice(randomIndex, 1);
    }
    
    return randomNotes;
  }

  // Function to display notes in grid
  function displayRandomNotes() {
    const gridContainer = document.getElementById('randomNotesGrid');
    if (!gridContainer) {
      console.error('Random notes grid container not found');
      return;
    }
    
    const randomNotes = getRandomNotes(20);
    
    // Clear previous notes
    gridContainer.innerHTML = '';
    
    // Add each note as a card
    randomNotes.forEach(note => {
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
          <p>${note.description}</p>
          <div class="note-categories">
            ${categoryHTML}
          </div>
        </a>
      `;
      
      noteCard.innerHTML = noteContent;
      gridContainer.appendChild(noteCard);
    });
  }

  // Initial display of random notes
  displayRandomNotes();

  // Add event listener to refresh button
  const refreshButton = document.getElementById('refreshNotes');
  if (refreshButton) {
    refreshButton.addEventListener('click', function() {
      console.log("Refresh button clicked");
      displayRandomNotes();
    });
  } else {
    console.error('Refresh button not found');
  }
});
