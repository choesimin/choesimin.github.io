---
layout: none
---

// Initialize Simple Jekyll Search
document.addEventListener('DOMContentLoaded', function() {
  SimpleJekyllSearch({
    searchInput: document.querySelector('#noteSearch input'),
    resultsContainer: document.getElementById('searchResult'),
    json: '/assets/json/note-search.json',
    searchResultTemplate: '<li><a href="{url}">{title}</a></li>',
    noResultsText: 'No results found',
    limit: 30,
    fuzzy: false
  });
  
  // Simplified search display handler
  document.querySelector('#noteSearch input').addEventListener('input', function(e) {
    var noteList = document.getElementById('noteList');
    var searchResults = document.getElementById('searchResult');
    
    if (this.value.trim() !== '') {
      noteList.classList.add('hidden');
      searchResults.classList.remove('hidden');
    } else {
      noteList.classList.remove('hidden');
      searchResults.classList.add('hidden');
    }
  });
});

// Simplify click handler
document.addEventListener('click', function(e) {
  var searchInput = document.querySelector('#noteSearch input');
  var searchResults = document.getElementById('searchResult');
  var noteList = document.getElementById('noteList');
  
  if (searchInput && !searchInput.contains(e.target) && 
      searchResults && !searchResults.contains(e.target) && 
      searchInput.value.trim() !== '') {
    searchInput.value = '';
    searchResults.classList.add('hidden');
    noteList.classList.remove('hidden');
  }
});

// Initialize progress bar
const progressBar = document.getElementById("progressBar");
window.onscroll = function () {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;

  progressBar.style.width = scrolled + "%";
};

// Set up note tree
var pages = getPages();
var nodes = makeNodes(pages);
var root = groupNodes(nodes);

var list = document.createElement("ul");
list.className = "root";

if (root.children && root.children.length > 0) {
  for (var i = 0; i < root.children.length; i++) {
    makeList(root.children[i], list);
  }
}

document.getElementById("noteList").appendChild(list);

// Clean up algorithm display logic
function groupAlgorithms() {
  var algorithmList = document.getElementById('algorithmList');
  algorithmList.innerHTML = '';
  
  // Get all algorithm problems
  var algorithmProblems = [
    {% for problem in site.problems %}
    {
      url: "{{ problem.url | relative_url }}",
      category: "{{ problem.category }}",
      title: "{{ problem.title }}",
      tags: "{{ problem.tags }}"
    },
    {% endfor %}
  ];
  
  // Skip empty algorithm collections
  if (algorithmProblems.length === 0) return;
  
  // Group problems by category
  var categories = {};
  algorithmProblems.forEach(function(problem) {
    if (!categories[problem.category]) {
      categories[problem.category] = [];
    }
    categories[problem.category].push(problem);
  });
  
  // Create category groups
  for (var category in categories) {
    var categoryDiv = document.createElement('div');
    categoryDiv.className = 'algorithm-category';
    
    // Create category header
    var categoryHeader = document.createElement('div');
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
    var problemList = document.createElement('ul');
    problemList.classList.add('hidden');
    
    categories[category].forEach(function(problem) {
      var listItem = document.createElement('li');
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
      var list = this.nextElementSibling;
      var icon = this.querySelector('.toggle-icon');
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

// Add category toggle functionality for top-level categories
document.querySelectorAll('.category-header').forEach(function(header) {
  header.addEventListener('click', function(e) {
    // Get the container that follows this header
    var targetContainer = this.parentElement;
    var targetId;
    
    // Find the content element to toggle
    if (targetContainer.querySelector('#noteList')) {
      targetId = 'noteList';
      var searchElement = document.getElementById('noteSearch');
      var targetElement = document.getElementById(targetId);

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
    } else if (targetContainer.querySelector('#graphicList')) {
      targetElement = document.getElementById('graphicList');
      toggleDisplay(targetElement);
    } else if (targetContainer.querySelector('#storyList')) {
      targetElement = document.getElementById('storyList');
      toggleDisplay(targetElement);
    }
  });
});

// Initialize algorithm categories after page loads
window.addEventListener('load', function() {
  groupAlgorithms();
});

function toggleDisplay(element) {
  if (element.classList.contains('hidden')) {
    element.classList.remove('hidden');
  } else {
    element.classList.add('hidden');
  }
}

// Note tree functions
function makeList(node, list) {
  var listItem = document.createElement("li");
  listItem.classList.add("list-item-relative");
  
  if (node.children != undefined) {
    // Store original children count before filtering
    node.originalChildrenCount = node.children.length;
    
    var index = node.children.filter(child => child.isIndex)[0];
    node.children = node.children.filter(child => !child.isIndex);

    // Create the main content container (left side)
    var contentContainer = document.createElement("span");
    contentContainer.classList.add("content-container");
    
    if (index != undefined) {
      listItem.id = index.category.join('-');

      var anchor = document.createElement("a");
      anchor.textContent = index.name;
      anchor.href = index.url;
      contentContainer.appendChild(anchor);
    } else {
      contentContainer.textContent = node.name;
    }
    
    listItem.appendChild(contentContainer);
    
    // Create the right-aligned container for count and toggle
    var rightContainer = document.createElement("span");
    rightContainer.classList.add("right-container");
    
    // Calculate total descendants 
    var totalDescendants = countAllDescendants(node);
    
    var childCount = document.createElement("span");
    childCount.className = "count-display";
    childCount.textContent = totalDescendants;
    rightContainer.appendChild(childCount);
    
    // Only add toggle text if node has children
    if (node.children && node.children.length > 0) {
      var toggleText = document.createElement("span");
      toggleText.classList.add("toggle-margin-left");

      // Create toggle icon element
      var toggleIcon = document.createElement("span");
      toggleIcon.className = "toggle-icon";
      toggleIcon.textContent = "▾";

      toggleText.appendChild(toggleIcon);
      rightContainer.appendChild(toggleText);
    }
    
    listItem.appendChild(rightContainer);
    list.appendChild(listItem);

    if (node.children.length > 0) {
      var childList = document.createElement("ul");
      childList.classList.add("hidden");
      for (var i = 0; i < node.children.length; i++) {
        makeList(node.children[i], childList);
      }
      listItem.appendChild(childList);

      // Make the entire right container clickable for toggling
      rightContainer.style.cursor = "pointer";
      rightContainer.addEventListener("click", function(e) {
        toggleChildList(e, childList, toggleText);
      });
      
      // Remove the click event from the whole list item
      listItem.removeEventListener("click", function(){});

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
    var anchor = document.createElement("a");
    anchor.textContent = node.name;
    anchor.href = node.url;
    listItem.appendChild(anchor);
    list.appendChild(listItem);
  }
}

// Helper function to toggle child list visibility
function toggleChildList(e, childList, toggleText) {
  e.stopPropagation(); // Prevent event from bubbling up
  if (childList.classList.contains("hidden")) {
    childList.classList.remove("hidden");
    toggleText.querySelector('.toggle-icon').classList.add('open');
  } else {
    childList.classList.add("hidden");
    toggleText.querySelector('.toggle-icon').classList.remove('open');
  }
}

// Count all descendants
function countAllDescendants(node) {
  // For leaf nodes
  if (!node.children) {
    return 1;
  }
  
  let count = 0;
  
  // Count all children including their descendants
  for (let child of node.children) {
    if (child.children) {
      // For nodes with children, recursively count their descendants
      count += countAllDescendants(child);
    } else {
      // For leaf nodes, add 1
      count += 1;
    }
  }
  
  return count;
}

// We need to preserve index pages during grouping to ensure accurate counts
function groupNode(node) {
  // Track original children count before any operation
  if (node.children) {
    node.originalChildrenCount = node.children.length;
  }
  
  var categories = Array.from(new Set(node.children.filter(child => child.children != undefined).map(child => child.name)));

  for (var i = 0; i < categories.length; i++) {
    var category = categories[i];
    var groupedNode = {
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
      groupNode(groupedNode);
    }
  }

  return node;
}

function groupNodes(nodes) {
  var root = { name: "root" };
  root.children = nodes;

  return groupNode(root);
}

function makeNodes(pages) {
  var nodes = pages.map(page => makeNode(page));
  return nodes;
}

function makeNode(page) {
  var leaf = {
    name: page.title,
    url: page.url,
    category: page.category,
    isIndex: page.name === "index"
  }
  return makeMultiDepthNode(page.category, leaf, 1);
}

function makeMultiDepthNode(category, child, indent) {
  var node = {
    name: category[category.length - indent],
    children: [child]
  };

  while (indent < category.length) {
    indent++;
    return makeMultiDepthNode(category, node, indent);
  }

  return node;
}

function getPages() {
  var pages = [];

  {% for notes in site.notes %}
  var path = "{{ notes.path }}".replace("_notes/", "").split("/");

  pages.push({
    category: path.slice(0, path.length - 1),
    name: path[path.length - 1].replace(".md", ""),
    title: "{{ notes.title }}",
    url: "{{ notes.url | relative_url }}",
  });
  {% endfor %}

  return pages;
}
