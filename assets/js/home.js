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

  console.log(allNotes);

  // Global variables for view management
  let currentView = 'grid';
  let currentData = allNotes;
  let clusterSvg = null;
  let tooltip = null;
  let shuffledNotesCache = null; // Cache for shuffled notes order

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
    const treeBtn = document.getElementById('treeViewBtn');

    gridBtn.addEventListener('click', () => switchView('grid'));
    clusterBtn.addEventListener('click', () => switchView('cluster'));
    radialBtn.addEventListener('click', () => switchView('radial'));
    treeBtn.addEventListener('click', () => switchView('tree'));
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
    const treeContainer = document.getElementById('treeContainer');
    
    // Hide all containers first
    gridContainer.style.display = 'none';
    clusterContainer.style.display = 'none';
    treeContainer.style.display = 'none';
    
    if (view === 'grid') {
      gridContainer.style.display = 'block';
      initializeGridView();
    } else if (view === 'tree') {
      treeContainer.style.display = 'block';
      renderTreeView();
    } else {
      clusterContainer.style.display = 'block';
      
      if (view === 'cluster') {
        renderClusterView();
      } else if (view === 'radial') {
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
        json: '/assets/json/note-search.json',
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
    const root = { name: currentCollection, children: [] };
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
          type: currentCollection,
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
    
    // Compute the adjusted height of the tree - ensure minimum height for scrolling
    const calculatedHeight = x1 - x0 + dx * 2;
    const height = Math.max(calculatedHeight, window.innerHeight * 1.5);
    
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
          
          tooltip.html(`
            <div style="font-weight: bold; margin-bottom: 8px;">${title}</div>
            <div style="opacity: 0.9;">${description}</div>
          `)
          .style('visibility', 'visible');
        }
      })
      .on('mousemove', function(event) {
        if (tooltip) {
          const tooltipWidth = 220; // Approximate tooltip width including padding
          let leftPosition;
          
          if (event.pageX + tooltipWidth > window.innerWidth) {
            // Show tooltip on the left when near right edge
            leftPosition = event.pageX - tooltipWidth - 10;
          } else {
            // Show tooltip on the right (default)
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
  }

  // Render radial cluster view using D3
  function renderRadialClusterView() {
    const container = document.getElementById('clusterContainer');
    container.innerHTML = '';
    
    // Specify the chart's dimensions - use screen height for better fit
    const width = container.clientWidth || 928;
    const height = Math.min(width, window.innerHeight * 1.2);
    const cx = width * 0.5;
    const cy = height * 0.5;
    const radius = Math.min(width, height) / 2 - 150;
    
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
          
          tooltip.html(`
            <div style="font-weight: bold; margin-bottom: 5px;">${title}</div>
            <div style="opacity: 0.9;">${description}</div>
          `)
          .style('visibility', 'visible');
        }
      })
      .on('mousemove', function(event) {
        if (tooltip) {
          const tooltipWidth = 220; // Approximate tooltip width including padding
          let leftPosition;
          
          if (event.pageX + tooltipWidth > window.innerWidth) {
            // Show tooltip on the left when near right edge
            leftPosition = event.pageX - tooltipWidth - 10;
          } else {
            // Show tooltip on the right (default)
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

      // Create the main content container (left side)
      const contentContainer = document.createElement("span");
      contentContainer.classList.add("tree-content-container");
      
      if (index != undefined) {
        listItem.id = index.category.join('-');

        const anchor = document.createElement("a");
        anchor.textContent = index.name;
        anchor.href = index.url;
        contentContainer.appendChild(anchor);
      } else {
        contentContainer.textContent = node.name;
      }
      
      listItem.appendChild(contentContainer);
      
      // Create the right-aligned container for count and toggle
      const rightContainer = document.createElement("span");
      rightContainer.classList.add("tree-right-container");
      
      // Calculate total descendants 
      const totalDescendants = countTreeDescendants(node);
      
      const childCount = document.createElement("span");
      childCount.className = "tree-count-display";
      childCount.textContent = totalDescendants;
      rightContainer.appendChild(childCount);
      
      // Only add toggle text if node has children
      if (node.children && node.children.length > 0) {
        const toggleText = document.createElement("span");
        toggleText.classList.add("tree-toggle-margin-left");

        // Create toggle icon element
        const toggleIcon = document.createElement("span");
        toggleIcon.className = "tree-toggle-icon";
        toggleIcon.textContent = "▾";

        toggleText.appendChild(toggleIcon);
        rightContainer.appendChild(toggleText);
      }
      
      listItem.appendChild(rightContainer);
      list.appendChild(listItem);

      if (node.children.length > 0) {
        const childList = document.createElement("ul");
        // Remove hidden class to show expanded by default
        // childList.classList.add("hidden");
        for (let i = 0; i < node.children.length; i++) {
          makeTreeList(node.children[i], childList);
        }
        listItem.appendChild(childList);

        // Make the entire right container clickable for toggling
        rightContainer.style.cursor = "pointer";
        rightContainer.addEventListener("click", function(e) {
          toggleTreeChildList(e, childList, rightContainer);
        });

        // Set toggle icon to open state by default
        const toggleIcon = rightContainer.querySelector('.tree-toggle-icon');
        if (toggleIcon) {
          toggleIcon.classList.add('open');
        }

        // Add navigation to the content container if it has a link
        if (index != undefined) {
          contentContainer.addEventListener("click", function(e) {
            e.stopPropagation();
            window.location.href = index.url;
          });
        }
      }
    } else {
      // For leaf nodes, no toggle or count
      const anchor = document.createElement("a");
      anchor.textContent = node.name;
      anchor.href = node.url;
      listItem.appendChild(anchor);
      list.appendChild(listItem);
    }
  }

  // Helper function to toggle child list visibility
  function toggleTreeChildList(e, childList, rightContainer) {
    e.stopPropagation(); // Prevent event from bubbling up
    
    const toggleIcon = rightContainer.querySelector('.tree-toggle-icon');
    
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

  // Initial display
  switchView(currentView);
});
