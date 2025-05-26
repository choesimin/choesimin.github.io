---
layout: none
---

document.addEventListener('DOMContentLoaded', function() {
  var allNotes = [];

  {% for note in site.notes %}
  var path = "{{ note.path }}".replace("_notes/", "").split("/");

  allNotes.push({
    category: path.slice(0, path.length - 1),
    name: path[path.length - 1].replace(".md", ""),
    title: "{{ note.title | escape }}",
    description: "{{ note.description | escape }}",
    url: "{{ note.url | relative_url }}",
  });
  {% endfor %}

  console.log(allNotes);

  // Global variables for view management
  let currentView = 'grid';
  let clusterSvg = null;
  let tooltip = null;

  // Initialize view toggle functionality
  function initializeViewToggle() {
    const gridBtn = document.getElementById('gridViewBtn');
    const clusterBtn = document.getElementById('clusterViewBtn');
    const radialBtn = document.getElementById('radialViewBtn');

    gridBtn.addEventListener('click', () => switchView('grid'));
    clusterBtn.addEventListener('click', () => switchView('cluster'));
    radialBtn.addEventListener('click', () => switchView('radial'));
  }

  // Switch between different views
  function switchView(view) {
    currentView = view;
    
    // Update active button
    document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(view + 'ViewBtn').classList.add('active');
    
    // Show/hide containers
    const gridContainer = document.getElementById('notesGrid');
    const clusterContainer = document.getElementById('clusterContainer');
    
    if (view === 'grid') {
      gridContainer.style.display = 'block';
      clusterContainer.style.display = 'none';
      displayAllNotes();
    } else {
      gridContainer.style.display = 'none';
      clusterContainer.style.display = 'block';
      
      if (view === 'cluster') {
        renderClusterView();
      } else if (view === 'radial') {
        renderRadialClusterView();
      }
    }
  }

  // Function to format category: replace hyphens with spaces and capitalize each word
  function formatCategory(category) {
    if (!category || category.length === 0) return [{ text: "Note", class: "category-item" }];
    
    // If category is an array, join it to create path segments
    const categoryPath = Array.isArray(category) ? category.join('/') : category;
    
    // Split by slash to get path segments
    return categoryPath.split('/').map(segment => {
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

  // Function to create hierarchical data structure for D3
  function createHierarchicalData() {
    const root = { name: "Notes", children: [] };
    const categoryMap = new Map();

    allNotes.forEach(note => {
      const category = note.category || [];
      const segments = Array.isArray(category) ? category : category.split('/');
      
      let currentLevel = root;
      let currentPath = "";
      
      segments.forEach((segment, index) => {
        currentPath = currentPath ? `${currentPath}/${segment}` : segment;
        
        let child = currentLevel.children.find(c => c.name === segment);
        if (!child) {
          child = { 
            name: segment, 
            children: [],
            path: currentPath,
            type: 'category'
          };
          currentLevel.children.push(child);
        }
        currentLevel = child;
      });
      
      currentLevel.children.push({
        name: note.name,
        path: currentPath + '/' + note.name,
        url: note.url,
        description: note.description,
        type: 'note',
        category: note.category,
        title: note.title // Keep original title for reference
      });

      console.log(currentLevel);
    });

    return root;
  }

  // Render cluster view using D3
  function renderClusterView() {
    const container = document.getElementById('clusterContainer');
    container.innerHTML = '';
    
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;
    
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    
    const g = svg.append('g')
      .attr('transform', `translate(40, 0)`);
    
    const cluster = d3.cluster()
      .size([height - 40, width - 160]);
    
    const hierarchyData = createHierarchicalData();
    const root = d3.hierarchy(hierarchyData);
    cluster(root);
    
    // Add links
    g.selectAll('.cluster-link')
      .data(root.links())
      .enter().append('path')
      .attr('class', 'cluster-link')
      .attr('d', d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x));
    
    // Add nodes
    const node = g.selectAll('.cluster-node')
      .data(root.descendants())
      .enter().append('g')
      .attr('class', 'cluster-node')
      .attr('transform', d => `translate(${d.y},${d.x})`);
    
    node.append('circle')
      .attr('r', d => d.data.type === 'note' ? 4 : 6)
      .style('fill', d => d.data.type === 'note' ? '#007acc' : '#fff')
      .style('stroke', '#333')
      .style('cursor', d => d.data.type === 'note' ? 'pointer' : 'default')
      .on('click', function(event, d) {
        if (d.data.type === 'note' && d.data.url) {
          window.location.href = d.data.url;
        }
      });
    
    node.append('text')
      .attr('class', 'cluster-text')
      .attr('dy', '0.31em')
      .attr('x', d => d.children ? -6 : 6)
      .style('text-anchor', d => d.children ? 'end' : 'start')
      .text(d => {
        const displayText = d.data.name;
        return displayText.length > 20 ? displayText.substring(0, 20) + '...' : displayText;
      })
      .style('font-size', d => d.data.type === 'note' ? '10px' : '12px')
      .style('font-weight', d => d.data.type === 'note' ? 'normal' : 'bold');
    
    clusterSvg = svg;
  }

  // Render radial cluster view using D3
  function renderRadialClusterView() {
    const container = document.getElementById('clusterContainer');
    container.innerHTML = '';
    
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;
    const radius = Math.min(width, height) / 2 - 40;
    
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    
    const g = svg.append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);
    
    const cluster = d3.cluster()
      .size([2 * Math.PI, radius]);
    
    const hierarchyData = createHierarchicalData();
    const root = d3.hierarchy(hierarchyData);
    cluster(root);
    
    // Add links
    g.selectAll('.cluster-link')
      .data(root.links())
      .enter().append('path')
      .attr('class', 'cluster-link')
      .attr('d', d3.linkRadial()
        .angle(d => d.x)
        .radius(d => d.y));
    
    // Add nodes
    const node = g.selectAll('.cluster-node')
      .data(root.descendants())
      .enter().append('g')
      .attr('class', 'cluster-node')
      .attr('transform', d => `
        rotate(${d.x * 180 / Math.PI - 90})
        translate(${d.y},0)
      `);
    
    node.append('circle')
      .attr('r', d => d.data.type === 'note' ? 4 : 6)
      .style('fill', d => d.data.type === 'note' ? '#007acc' : '#fff')
      .style('stroke', '#333')
      .style('cursor', d => d.data.type === 'note' ? 'pointer' : 'default')
      .on('click', function(event, d) {
        if (d.data.type === 'note' && d.data.url) {
          window.location.href = d.data.url;
        }
      });
    
    node.append('text')
      .attr('class', 'cluster-text')
      .attr('dy', '0.31em')
      .attr('x', d => d.x < Math.PI === !d.children ? 6 : -6)
      .style('text-anchor', d => d.x < Math.PI === !d.children ? 'start' : 'end')
      .attr('transform', d => d.x >= Math.PI ? 'rotate(180)' : null)
      .text(d => {
        const displayText = d.data.name;
        return displayText.length > 15 ? displayText.substring(0, 15) + '...' : displayText;
      })
      .style('font-size', d => d.data.type === 'note' ? '9px' : '11px')
      .style('font-weight', d => d.data.type === 'note' ? 'normal' : 'bold');
    
    clusterSvg = svg;
  }

  // Function to shuffle array (Fisher-Yates algorithm)
  function shuffleArray(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle
    while (currentIndex !== 0) {
      // Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // Swap with the current element
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  // Function to display all notes
  function displayAllNotes() {
    const gridContainer = document.getElementById('notesGrid');
    if (!gridContainer) {
      return;
    }
    
    // Clear previous notes
    gridContainer.innerHTML = '';
    
    // Shuffle notes before displaying
    const shuffledNotes = shuffleArray([...allNotes]);
    
    // Add each note as a card
    shuffledNotes.forEach(note => {
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
  
  // Initialize view toggle functionality
  initializeViewToggle();
});
