---
layout: none
---

document.addEventListener('DOMContentLoaded', function() {
  // Initialize progress bar
  const progressBar = document.getElementById("progressBar");
  window.onscroll = function () {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;

    progressBar.style.width = scrolled + "%";
  };

  // Notes data only
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

  // Global variables for view management
  let currentView = localStorage.getItem('notesCurrentView') || 'grid'; // Default to grid (search) view
  let currentClusterView = localStorage.getItem('notesCurrentClusterView') || 'tree'; // Default to tree
  let treeExpanded = localStorage.getItem('notesTreeExpanded') === 'true'; // Default to false (collapsed)
  let currentData = allNotes;
  let clusterSvg = null;
  let tooltip = null;
  let shuffledNotesCache = null; // Cache for shuffled notes order

  // Save view state to localStorage
  function saveViewState() {
    localStorage.setItem('notesCurrentView', currentView);
    localStorage.setItem('notesCurrentClusterView', currentClusterView);
    localStorage.setItem('notesTreeExpanded', treeExpanded);
  }

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
        .style('font-size', '0.75rem')
        .style('max-width', '200px')
        .style('z-index', '1000')
        .style('pointer-events', 'none');
    }
  }

  // Initialize view toggle functionality
  function initializeViewToggle() {
    const gridBtn = document.getElementById('gridViewBtn');
    const clusterBtn = document.getElementById('clusterViewBtn');
    const treeBtn = document.getElementById('treeViewBtn');

    gridBtn.addEventListener('click', () => switchView('grid'));
    clusterBtn.addEventListener('click', () => switchView('cluster'));
    treeBtn.addEventListener('click', () => switchView('tree'));
    
    // Initialize cluster sub-view controls
    initializeClusterControls();
  }
  
  // Initialize cluster sub-view controls
  function initializeClusterControls() {
    const treeClusterBtn = document.getElementById('treeClusterBtn');
    const radialClusterBtn = document.getElementById('radialClusterBtn');
    
    if (treeClusterBtn) {
      treeClusterBtn.addEventListener('click', () => switchClusterView('tree'));
    }
    if (radialClusterBtn) {
      radialClusterBtn.addEventListener('click', () => switchClusterView('radial'));
    }
  }
  
  // Switch between cluster sub-views
  function switchClusterView(clusterView) {
    currentClusterView = clusterView;
    saveViewState(); // Save state when cluster view changes
    
    // Update active button for cluster controls
    document.querySelectorAll('#viewControls .toggle-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(clusterView + 'ClusterBtn').classList.add('active');
    
    // Re-render the cluster view with the new type
    if (currentView === 'cluster') {
      if (clusterView === 'tree') {
        renderClusterView();
      } else if (clusterView === 'radial') {
        renderRadialClusterView();
      }
    }
  }

  // Switch between different views
  function switchView(view) {
    currentView = view;
    saveViewState(); // Save state when view changes
    
    // Update active button (only for main view toggle)
    document.querySelectorAll('.view-toggle .toggle-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(view + 'ViewBtn').classList.add('active');
    
    // Show/hide containers
    const gridContainer = document.getElementById('notesGrid');
    const clusterContainer = document.getElementById('clusterContainer');
    const treeContainer = document.getElementById('treeContainer');
    const viewControls = document.getElementById('viewControls');
    
    // Hide all containers first
    gridContainer.style.display = 'none';
    clusterContainer.style.display = 'none';
    treeContainer.style.display = 'none';
    if (viewControls) viewControls.style.display = 'none';
    
    if (view === 'grid') {
      gridContainer.style.display = 'block';
      initializeGridView();
    } else if (view === 'tree') {
      treeContainer.style.display = 'block';
      if (viewControls) {
        viewControls.style.display = 'flex';
        // Show only tree controls (Close/Open)
        document.getElementById('collapseAllBtn').style.display = 'inline-block';
        document.getElementById('expandAllBtn').style.display = 'inline-block';
        document.getElementById('treeClusterBtn').style.display = 'none';
        document.getElementById('radialClusterBtn').style.display = 'none';
      }
      renderTreeView();
    } else if (view === 'cluster') {
      clusterContainer.style.display = 'block';
      if (viewControls) {
        viewControls.style.display = 'flex';
        // Show only cluster controls (Tree/Radial)
        document.getElementById('collapseAllBtn').style.display = 'none';
        document.getElementById('expandAllBtn').style.display = 'none';
        document.getElementById('treeClusterBtn').style.display = 'inline-block';
        document.getElementById('radialClusterBtn').style.display = 'inline-block';
        // Set active button for current cluster view
        document.querySelectorAll('#viewControls .toggle-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(currentClusterView + 'ClusterBtn').classList.add('active');
      }
      
      // Render the appropriate cluster view
      if (currentClusterView === 'tree') {
        renderClusterView();
      } else if (currentClusterView === 'radial') {
        renderRadialClusterView();
      }
    }
  }

  // Initialize grid view with search functionality
  function initializeGridView() {
    const searchInput = document.getElementById('searchInput');
    const gridContent = document.getElementById('gridContent');
    
    // Handle search input events first
    if (searchInput) {
      let searchTimeout;
      
      function handleSearch() {
        const searchTerm = searchInput.value.trim();
        
        if (searchTimeout) {
          clearTimeout(searchTimeout);
        }
        
        if (searchTerm === '') {
          // Immediately show original notes when search is empty
          displayAllNotes();
          return;
        }
        
        // Hide original notes when there's a search term
        hideOriginalNotes();
        
        // For non-empty searches, let SimpleJekyllSearch handle it
        // But add a small delay to prevent excessive calls
        searchTimeout = setTimeout(() => {
          // SimpleJekyllSearch will handle the actual search
        }, 50);
      }
      
      searchInput.addEventListener('input', handleSearch);
      searchInput.addEventListener('keyup', handleSearch);
      searchInput.addEventListener('paste', function() {
        setTimeout(handleSearch, 10);
      });
      searchInput.addEventListener('blur', function(e) {
        if (this.value.trim() === '') {
          displayAllNotes();
        }
      });
    }
    
    // Initialize Simple Jekyll Search if not already done
    if (window.SimpleJekyllSearch && !searchInput.hasAttribute('data-search-initialized')) {
      SimpleJekyllSearch({
        searchInput: searchInput,
        resultsContainer: gridContent,
        json: '/assets/json/search.json',
        searchResultTemplate: '<div class="note-card search-result"><a href="{url}"><h3 class="search-title">{title}</h3><p class="search-description">{description}</p></a></div>',
        noResultsText: '<div class="no-results">No results found</div>',
        limit: 100,
        fuzzy: false,
        success: function(data) {
          // When search is performed, ensure original notes are hidden
          if (searchInput.value.trim() !== '') {
            hideOriginalNotes();
          }
        },
        templateMiddleware: function(prop, value, template) {
          // Don't process if search input is empty
          if (searchInput && searchInput.value.trim() === '') {
            return value;
          }
          return value;
        }
      });
      searchInput.setAttribute('data-search-initialized', 'true');
    }
    
    // Initially display all notes
    displayAllNotes();
  }

  // Function to create hierarchical data structure for D3
  function createHierarchicalData() {
    const root = { name: 'notes', children: [] };
    const categoryMap = new Map();

    currentData.forEach(item => {
      const category = item.category || [];
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
      if (item.name === 'index') {
        currentLevel.url = item.url;
        currentLevel.description = item.description;
        currentLevel.title = item.title;
      } else {
        currentLevel.children.push({
          name: item.name,
          path: currentPath + '/' + item.name,
          url: item.url,
          description: item.description,
          type: 'note',
          category: item.category,
          title: item.title
        });
      }
    });

    return root;
  }

  // Render cluster view using D3
  function renderClusterView() {
    const container = document.getElementById('clusterContainer');
    container.innerHTML = '';
    
    if (typeof d3 === 'undefined') {
      container.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">D3.js is not loaded. Please check the script inclusion.</div>';
      return;
    }
    
    try {
      const width = container.clientWidth || 928;
      
      const hierarchyData = createHierarchicalData();
      const root = d3.hierarchy(hierarchyData);
    const dx = 10;
    const dy = width / (root.height + 1);
    
    const tree = d3.cluster().nodeSize([dx, dy]);
    
    root.sort((a, b) => d3.ascending(a.data.name, b.data.name));
    tree(root);
    
    let x0 = Infinity;
    let x1 = -x0;
    root.each(d => {
      if (d.x > x1) x1 = d.x;
      if (d.x < x0) x0 = d.x;
    });
    
    const calculatedHeight = x1 - x0 + dx * 2;
    const height = Math.max(calculatedHeight, window.innerHeight * 1.5);
    
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-dy / 3, x0 - dx, width, height])
      .attr('style', 'max-width: 100%; height: auto; font: 0.63rem sans-serif;');
    
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
          
          tooltip.html(`
            <div style="font-weight: bold; margin-bottom: 8px;">${title}</div>
            <div style="opacity: 0.9;">${description}</div>
          `)
          .style('visibility', 'visible');
        }
      })
      .on('mousemove', function(event) {
        if (tooltip) {
          const tooltipWidth = 220;
          let leftPosition;
          
          if (event.pageX + tooltipWidth > window.innerWidth) {
            leftPosition = event.pageX - tooltipWidth - 10;
          } else {
            leftPosition = event.pageX + 10;
          }
          
          tooltip.style('top', (event.pageY - 10) + 'px')
                 .style('left', leftPosition + 'px');
        }
      })
      .on('mouseout', function() {
        if (tooltip) {
          tooltip.style('visibility', 'hidden');
        }
      });
    
    clusterSvg = svg;
    } catch (error) {
      console.error('Error rendering cluster view:', error);
      container.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">Error rendering cluster view. Check console for details.</div>';
    }
  }

  // Render radial cluster view using D3
  function renderRadialClusterView() {
    const container = document.getElementById('clusterContainer');
    container.innerHTML = '';
    
    if (typeof d3 === 'undefined') {
      container.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">D3.js is not loaded. Please check the script inclusion.</div>';
      return;
    }
    
    try {
      const width = container.clientWidth || 928;
      const height = Math.min(width, window.innerHeight * 1.2);
      const cx = width * 0.5;
      const cy = height * 0.5;
      const radius = Math.min(width, height) / 2 - 150;
      
      const tree = d3.cluster()
        .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);
    
    const hierarchyData = createHierarchicalData();
    const root = tree(d3.hierarchy(hierarchyData)
      .sort((a, b) => d3.ascending(a.data.name, b.data.name)));
    
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-cx, -cy, width, height])
      .attr('style', 'width: 100%; height: auto; font: 0.63rem sans-serif;');
    
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
    
    svg.append('g')
      .selectAll()
      .data(root.descendants())
      .join('circle')
      .attr('transform', d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`)
      .attr('fill', d => d.children ? '#555' : '#999')
      .attr('r', 2.5);
    
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
          
          tooltip.html(`
            <div style="font-weight: bold; margin-bottom: 5px;">${title}</div>
            <div style="opacity: 0.9;">${description}</div>
          `)
          .style('visibility', 'visible');
        }
      })
      .on('mousemove', function(event) {
        if (tooltip) {
          const tooltipWidth = 220;
          let leftPosition;
          
          if (event.pageX + tooltipWidth > window.innerWidth) {
            leftPosition = event.pageX - tooltipWidth - 10;
          } else {
            leftPosition = event.pageX + 10;
          }
          
          tooltip.style('top', (event.pageY - 10) + 'px')
                 .style('left', leftPosition + 'px');
        }
      })
      .on('mouseout', function() {
        if (tooltip) {
          tooltip.style('visibility', 'hidden');
        }
      });
    
    clusterSvg = svg;
    } catch (error) {
      console.error('Error rendering radial cluster view:', error);
      container.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">Error rendering radial cluster view. Check console for details.</div>';
    }
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
    const gridContent = document.getElementById('gridContent');
    if (!gridContent) {
      return;
    }
    
    // Check if we already have the original notes rendered
    const existingOriginalNotes = gridContent.querySelector('.original-notes-container');
    
    if (existingOriginalNotes) {
      // Just show the existing original notes and hide search results
      existingOriginalNotes.style.display = 'block';
      const searchResults = gridContent.querySelectorAll('.note-card.search-result, .no-results');
      searchResults.forEach(result => result.style.display = 'none');
    } else {
      // First time - create and cache the original notes
      gridContent.innerHTML = '';
      
      const originalContainer = document.createElement('div');
      originalContainer.className = 'original-notes-container';
      
      // Use cached shuffled notes if available, otherwise create and cache them
      if (!shuffledNotesCache) {
        shuffledNotesCache = shuffleArray([...currentData]);
      }
      
      // Add each note as a card using the cached order
      shuffledNotesCache.forEach(note => {
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card original-note';
        
        const noteContent = `
          <a href="${note.url}">
            <h3>${note.title}</h3>
            <p>${note.description}</p>
          </a>
        `;
        
        noteCard.innerHTML = noteContent;
        originalContainer.appendChild(noteCard);
      });
      
      gridContent.appendChild(originalContainer);
    }
  }
  
  // Function to hide original notes when searching
  function hideOriginalNotes() {
    const gridContent = document.getElementById('gridContent');
    if (!gridContent) return;
    
    const originalContainer = gridContent.querySelector('.original-notes-container');
    if (originalContainer) {
      originalContainer.style.display = 'none';
    }
  }

  // Tree view functionality
  function renderTreeView() {
    const treeList = document.getElementById('treeList');
    if (!treeList) return;
    
    // Clear previous tree
    treeList.innerHTML = '';
    
    // Create tree structure using the same logic as sidebar
    const nodes = makeTreeNodes(currentData);
    const root = groupTreeNodes(nodes);
    
    const list = document.createElement("ul");
    list.className = "root";
    
    if (root.children && root.children.length > 0) {
      for (let i = 0; i < root.children.length; i++) {
        makeTreeList(root.children[i], list);
      }
    }
    
    treeList.appendChild(list);
    
    // Initialize tree control buttons
    initializeTreeControls();
    
    // Apply saved expand/collapse state
    if (treeExpanded) {
      expandAllTreeNodes();
    } else {
      collapseAllTreeNodes();
    }
  }

  // Tree node creation functions (adapted from default.js)
  function makeTreeList(node, list) {
    const listItem = document.createElement("li");
    listItem.classList.add("tree-list-item");
    
    if (node.children != undefined) {
      // Store original children count before filtering
      node.originalChildrenCount = node.children.length;
      
      const index = node.children.filter(child => child.isIndex)[0];
      node.children = node.children.filter(child => !child.isIndex);

      // Create the main content container with proper layout
      const contentContainer = document.createElement("div");
      contentContainer.classList.add("content-container");
      
      // Left side: Toggle icon (only if node has children)
      if (node.children && node.children.length > 0) {
        const toggleIcon = document.createElement("span");
        toggleIcon.className = "tree-toggle-icon";
        toggleIcon.textContent = "▾";
        contentContainer.appendChild(toggleIcon);
      } else {
        // Add empty space for alignment
        const spacer = document.createElement("span");
        spacer.className = "tree-toggle-icon tree-spacer";
        spacer.textContent = "";
        contentContainer.appendChild(spacer);
      }
      
      // Middle: Text content
      const textContainer = document.createElement("span");
      textContainer.classList.add("tree-text");
      
      if (index != undefined) {
        listItem.id = index.category.join('-');
        const anchor = document.createElement("a");
        anchor.textContent = index.name;
        anchor.href = index.url;
        textContainer.appendChild(anchor);
      } else {
        textContainer.textContent = node.name;
      }
      
      contentContainer.appendChild(textContainer);
      
      // Right side: Count
      const totalDescendants = countTreeDescendants(node);
      const countContainer = document.createElement("span");
      countContainer.className = "tree-count";
      countContainer.textContent = totalDescendants;
      contentContainer.appendChild(countContainer);
      
      listItem.appendChild(contentContainer);
      list.appendChild(listItem);

      if (node.children.length > 0) {
        const childList = document.createElement("ul");
        // Remove hidden class to show expanded by default
        // childList.classList.add("hidden");
        for (let i = 0; i < node.children.length; i++) {
          makeTreeList(node.children[i], childList);
        }
        listItem.appendChild(childList);

        // Make the toggle icon clickable for toggling
        const toggleIcon = contentContainer.querySelector('.tree-toggle-icon');
        if (toggleIcon) {
          toggleIcon.style.cursor = "pointer";
          toggleIcon.classList.add('open');
          toggleIcon.addEventListener("click", function(e) {
            toggleTreeChildList(e, childList, toggleIcon);
          });
        }

        // Add navigation to the text container if it has a link
        if (index != undefined) {
          const textAnchor = textContainer.querySelector('a');
          if (textAnchor) {
            textAnchor.addEventListener("click", function(e) {
              e.stopPropagation();
              window.location.href = index.url;
            });
          }
        }
      }
    } else {
      // For leaf nodes, use simpler structure
      const contentContainer = document.createElement("div");
      contentContainer.classList.add("content-container");
      
      // Empty space for toggle icon alignment
      const spacer = document.createElement("span");
      spacer.className = "tree-toggle-icon tree-spacer";
      spacer.textContent = "";
      contentContainer.appendChild(spacer);
      
      // Text content
      const textContainer = document.createElement("span");
      textContainer.classList.add("tree-text");
      const anchor = document.createElement("a");
      anchor.textContent = node.name;
      anchor.href = node.url;
      textContainer.appendChild(anchor);
      contentContainer.appendChild(textContainer);
      
      // Empty count for alignment
      const countContainer = document.createElement("span");
      countContainer.className = "tree-count";
      countContainer.textContent = "";
      contentContainer.appendChild(countContainer);
      
      listItem.appendChild(contentContainer);
      list.appendChild(listItem);
    }
  }

  // Helper function to toggle child list visibility
  function toggleTreeChildList(e, childList, toggleIcon) {
    e.stopPropagation(); // Prevent event from bubbling up
    
    if (childList.classList.contains("hidden")) {
      childList.classList.remove("hidden");
      if (toggleIcon) {
        toggleIcon.classList.add('open');
      }
    } else {
      childList.classList.add("hidden");
      if (toggleIcon) {
        toggleIcon.classList.remove('open');
      }
    }
    
    // Update overall tree state based on current state
    updateTreeExpandedState();
  }
  
  // Check if all tree nodes are expanded or collapsed and update state
  function updateTreeExpandedState() {
    const treeContainer = document.getElementById('treeContainer');
    if (!treeContainer) return;
    
    const allLists = treeContainer.querySelectorAll('ul:not(.root)');
    const hiddenLists = treeContainer.querySelectorAll('ul.hidden:not(.root)');
    
    // If no lists are hidden, consider tree as expanded
    // If all lists are hidden, consider tree as collapsed
    if (hiddenLists.length === 0 && allLists.length > 0) {
      treeExpanded = true;
    } else if (hiddenLists.length === allLists.length) {
      treeExpanded = false;
    }
    // For partial states, keep the current setting
    
    saveViewState();
  }

  // Expand all tree nodes
  function expandAllTreeNodes() {
    const treeContainer = document.getElementById('treeContainer');
    if (!treeContainer) return;
    
    treeExpanded = true;
    saveViewState(); // Save state
    
    // Remove hidden class from all ul elements
    const allLists = treeContainer.querySelectorAll('ul.hidden');
    allLists.forEach(list => {
      list.classList.remove('hidden');
    });
    
    // Set all toggle icons to open state
    const allToggleIcons = treeContainer.querySelectorAll('.tree-toggle-icon');
    allToggleIcons.forEach(icon => {
      if (!icon.classList.contains('tree-spacer')) {
        icon.classList.add('open');
      }
    });
  }

  // Collapse all tree nodes
  function collapseAllTreeNodes() {
    const treeContainer = document.getElementById('treeContainer');
    if (!treeContainer) return;
    
    treeExpanded = false;
    saveViewState(); // Save state
    
    // Add hidden class to all ul elements except root
    const allLists = treeContainer.querySelectorAll('ul:not(.root)');
    allLists.forEach(list => {
      list.classList.add('hidden');
    });
    
    // Set all toggle icons to closed state
    const allToggleIcons = treeContainer.querySelectorAll('.tree-toggle-icon');
    allToggleIcons.forEach(icon => {
      if (!icon.classList.contains('tree-spacer')) {
        icon.classList.remove('open');
      }
    });
  }

  // Initialize tree control buttons
  function initializeTreeControls() {
    const expandAllBtn = document.getElementById('expandAllBtn');
    const collapseAllBtn = document.getElementById('collapseAllBtn');
    
    if (expandAllBtn) {
      expandAllBtn.addEventListener('click', expandAllTreeNodes);
    }
    
    if (collapseAllBtn) {
      collapseAllBtn.addEventListener('click', collapseAllTreeNodes);
    }
  }

  // Count all descendants
  function countTreeDescendants(node) {
    // For leaf nodes
    if (!node.children) {
      return 1;
    }
    
    let count = 0;
    
    // Count all children including their descendants
    for (let child of node.children) {
      if (child.children) {
        // For nodes with children, recursively count their descendants
        count += countTreeDescendants(child);
      } else {
        // For leaf nodes, add 1
        count += 1;
      }
    }
    
    return count;
  }

  function groupTreeNode(node) {
    // Track original children count before any operation
    if (node.children) {
      node.originalChildrenCount = node.children.length;
    }
    
    const categories = Array.from(new Set(node.children.filter(child => child.children != undefined).map(child => child.name)));

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const groupedNode = {
        name: category,
        children: node.children.filter(child => child.name === category).map(child => child.children).flat(Infinity)
      };
      
      // Preserve index information in the grouped node
      if (groupedNode.children) {
        groupedNode.originalChildrenCount = groupedNode.children.length;
      }

      node.children = node.children.filter(child => child.name != category);
      node.children.push(groupedNode);

      if (groupedNode.children != undefined) {
        groupTreeNode(groupedNode);
      }
    }

    return node;
  }

  function groupTreeNodes(nodes) {
    const root = { name: "root" };
    root.children = nodes;

    return groupTreeNode(root);
  }

  function makeTreeNodes(pages) {
    const nodes = pages.map(page => makeTreeNode(page));
    return nodes;
  }

  function makeTreeNode(page) {
    const leaf = {
      name: page.title,
      url: page.url,
      category: page.category,
      isIndex: page.name === "index"
    }
    return makeMultiDepthTreeNode(page.category, leaf, 1);
  }

  function makeMultiDepthTreeNode(category, child, indent) {
    const node = {
      name: category[category.length - indent],
      children: [child]
    };

    while (indent < category.length) {
      indent++;
      return makeMultiDepthTreeNode(category, node, indent);
    }

    return node;
  }
  
  // Initialize view toggle functionality
  initializeViewToggle();

  // Initial display - restore saved state
  switchView(currentView);

});
