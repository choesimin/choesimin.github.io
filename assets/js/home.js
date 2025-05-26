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

  // Initialize tooltip
  function initializeTooltip() {
    if (!tooltip) {
      tooltip = d3.select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('background', 'rgba(0, 0, 0, 0.8)')
        .style('color', 'white')
        .style('padding', '10px')
        .style('border-radius', '5px')
        .style('font-size', '12px')
        .style('max-width', '200px')
        .style('z-index', '1000')
        .style('pointer-events', 'none');
    }
  }

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
      
      // Handle index nodes specially - don't add them as children, but store their info in parent
      if (note.name === 'index') {
        currentLevel.url = note.url;
        currentLevel.description = note.description;
        currentLevel.title = note.title;
      } else {
        currentLevel.children.push({
          name: note.name,
          path: currentPath + '/' + note.name,
          url: note.url,
          description: note.description,
          type: 'note',
          category: note.category,
          title: note.title
        });
      }

      console.log(currentLevel);
    });

    return root;
  }

  // Render cluster view using D3
  function renderClusterView() {
    const container = document.getElementById('clusterContainer');
    container.innerHTML = '';
    
    const width = container.clientWidth || 928;
    
    // Compute the tree height
    const hierarchyData = createHierarchicalData();
    const root = d3.hierarchy(hierarchyData);
    const dx = 10;
    const dy = width / (root.height + 1);
    
    // Create a tree layout
    const tree = d3.cluster().nodeSize([dx, dy]);
    
    // Sort the tree and apply the layout
    root.sort((a, b) => d3.ascending(a.data.name, b.data.name));
    tree(root);
    
    // Compute the extent of the tree
    let x0 = Infinity;
    let x1 = -x0;
    root.each(d => {
      if (d.x > x1) x1 = d.x;
      if (d.x < x0) x0 = d.x;
    });
    
    // Compute the adjusted height of the tree
    const height = x1 - x0 + dx * 2;
    
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-dy / 3, x0 - dx, width, height])
      .attr('style', 'max-width: 100%; height: auto; font: 10px sans-serif;');
    
    // Add links
    const link = svg.append('g')
      .attr('fill', 'none')
      .attr('stroke', '#555')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5)
      .selectAll()
      .data(root.links())
      .join('path')
      .attr('d', d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x));
    
    // Add nodes
    const node = svg.append('g')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', 3)
      .selectAll()
      .data(root.descendants())
      .join('g')
      .attr('transform', d => `translate(${d.y},${d.x})`);
    
    node.append('circle')
      .attr('fill', d => d.children ? '#555' : '#999')
      .attr('r', 2.5);
    
    node.append('text')
      .attr('dy', '0.31em')
      .attr('x', d => d.children ? -6 : 6)
      .attr('text-anchor', d => d.children ? 'end' : 'start')
      .text(d => d.data.name)
      .attr('stroke', 'white')
      .attr('paint-order', 'stroke')
      .style('cursor', d => (d.data.type === 'note' || d.data.url) ? 'pointer' : 'default')
      .on('click', function(event, d) {
        if (d.data.type === 'note' && d.data.url) {
          window.location.href = d.data.url;
        } else if (d.data.type === 'category' && d.data.url) {
          window.location.href = d.data.url;
        }
      })
      .on('mouseover', function(event, d) {
        if (d.data.type === 'note' || d.data.url) {
          initializeTooltip();
          const title = d.data.title || d.data.name;
          const description = d.data.description || 'No description available';
          const categorySegments = d.data.category ? formatCategory(d.data.category) : [];
          const categoryHTML = categorySegments.map(segment => segment.text).join(' / ');
          
          tooltip.html(`
            <div style="font-weight: bold; margin-bottom: 5px;">${title}</div>
            <div style="margin-bottom: 5px;">${description}</div>
            ${categoryHTML ? `<div style="font-size: 10px; opacity: 0.8;">${categoryHTML}</div>` : ''}
          `)
          .style('visibility', 'visible');
        }
      })
      .on('mousemove', function(event) {
        if (tooltip) {
          tooltip.style('top', (event.pageY - 10) + 'px')
                 .style('left', (event.pageX + 10) + 'px');
        }
      })
      .on('mouseout', function() {
        if (tooltip) {
          tooltip.style('visibility', 'hidden');
        }
      });
    
    clusterSvg = svg;
  }

  // Render radial cluster view using D3
  function renderRadialClusterView() {
    const container = document.getElementById('clusterContainer');
    container.innerHTML = '';
    
    // Specify the chart's dimensions
    const width = container.clientWidth || 928;
    const height = width;
    const cx = width * 0.5;
    const cy = height * 0.54;
    const radius = Math.min(width, height) / 2 - 80;
    
    // Create a radial cluster layout
    const tree = d3.cluster()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);
    
    // Sort the tree and apply the layout
    const hierarchyData = createHierarchicalData();
    const root = tree(d3.hierarchy(hierarchyData)
      .sort((a, b) => d3.ascending(a.data.name, b.data.name)));
    
    // Creates the SVG container
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-cx, -cy, width, height])
      .attr('style', 'width: 100%; height: auto; font: 10px sans-serif;');
    
    // Append links
    svg.append('g')
      .attr('fill', 'none')
      .attr('stroke', '#555')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5)
      .selectAll()
      .data(root.links())
      .join('path')
      .attr('d', d3.linkRadial()
        .angle(d => d.x)
        .radius(d => d.y));
    
    // Append nodes
    svg.append('g')
      .selectAll()
      .data(root.descendants())
      .join('circle')
      .attr('transform', d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`)
      .attr('fill', d => d.children ? '#555' : '#999')
      .attr('r', 2.5);
    
    // Append labels
    svg.append('g')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', 3)
      .selectAll()
      .data(root.descendants())
      .join('text')
      .attr('transform', d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0) rotate(${d.x >= Math.PI ? 180 : 0})`)
      .attr('dy', '0.31em')
      .attr('x', d => d.x < Math.PI === !d.children ? 6 : -6)
      .attr('text-anchor', d => d.x < Math.PI === !d.children ? 'start' : 'end')
      .attr('paint-order', 'stroke')
      .attr('stroke', 'white')
      .attr('fill', 'currentColor')
      .text(d => d.data.name)
      .style('cursor', d => (d.data.type === 'note' || d.data.url) ? 'pointer' : 'default')
      .on('click', function(event, d) {
        if (d.data.type === 'note' && d.data.url) {
          window.location.href = d.data.url;
        } else if (d.data.type === 'category' && d.data.url) {
          window.location.href = d.data.url;
        }
      })
      .on('mouseover', function(event, d) {
        if (d.data.type === 'note' || d.data.url) {
          initializeTooltip();
          const title = d.data.title || d.data.name;
          const description = d.data.description || 'No description available';
          const categorySegments = d.data.category ? formatCategory(d.data.category) : [];
          const categoryHTML = categorySegments.map(segment => segment.text).join(' / ');
          
          tooltip.html(`
            <div style="font-weight: bold; margin-bottom: 5px;">${title}</div>
            <div style="margin-bottom: 5px;">${description}</div>
            ${categoryHTML ? `<div style="font-size: 10px; opacity: 0.8;">${categoryHTML}</div>` : ''}
          `)
          .style('visibility', 'visible');
        }
      })
      .on('mousemove', function(event) {
        if (tooltip) {
          tooltip.style('top', (event.pageY - 10) + 'px')
                 .style('left', (event.pageX + 10) + 'px');
        }
      })
      .on('mouseout', function() {
        if (tooltip) {
          tooltip.style('visibility', 'hidden');
        }
      });
    
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
  
  // Initialize view toggle functionality
  initializeViewToggle();

  // Initial display
  switchView(currentView);
});
