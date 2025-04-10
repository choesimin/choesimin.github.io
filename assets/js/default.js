---
layout: none
---

// Initialize Simple Jekyll Search
SimpleJekyllSearch({
  searchInput: document.querySelector('#noteSearch input'),
  resultsContainer: document.getElementById('searchResult'),
  json: '/assets/json/note-search.json',
  searchResultTemplate: `<li><a href="{{ site.url }}{url}">{title}</a></li>`,
  // Only search through titles
  keys: ['title']
});

// Add event listeners to hide/show note list based on search state
document.querySelector('#noteSearch input').addEventListener('input', function(e) {
  var noteList = document.getElementById('noteList');
  var searchResults = document.getElementById('searchResult');
  
  if (this.value.trim() !== '') {
    // When search input has text, hide note list and show search results
    noteList.classList.add('hidden');
    searchResults.classList.remove('hidden');
  } else {
    // When search input is empty, show note list and hide search results
    noteList.classList.remove('hidden');
    searchResults.classList.add('hidden');
  }
});

// Clear search and show note list when clicking outside search area
document.addEventListener('click', function(e) {
  var searchInput = document.querySelector('#noteSearch input');
  var searchResults = document.getElementById('searchResult');
  var noteList = document.getElementById('noteList');
  
  // If click is outside search area and search is active
  if (!searchInput.contains(e.target) && !searchResults.contains(e.target) && searchInput.value.trim() !== '') {
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

// Group algorithm items by category
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
    problemList.classList.add('hidden', 'list-unstyled');
    
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

// Count items in each category
function updateCounts() {
  // Count notes
  var notesCount = countAllDescendants(root);
  document.getElementById("noteCount").textContent = notesCount;
  
  // Count algorithms
  var algorithmsCount = 
    {% assign count = site.problems | size %}
    {{ count }}
  ;
  document.getElementById("algorithmCount").textContent = algorithmsCount;
  
  // Count graphics
  var graphicsCount = document.querySelectorAll('#graphicList li').length;
  document.getElementById("graphicCount").textContent = graphicsCount;
  
  // Count stories (fixed at 2 for Brunch and Instagram)
  document.getElementById("storyCount").textContent = "2";
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
  updateCounts();
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

      // Update event handling - only toggle on the toggleText element
      toggleText.addEventListener("click", function (e) {
        e.stopPropagation(); // Prevent event from bubbling up
        if (childList.classList.contains("hidden")) {
          childList.classList.remove("hidden");
          toggleText.querySelector('.toggle-icon').classList.add('open');
        } else {
          childList.classList.add("hidden");
          toggleText.querySelector('.toggle-icon').classList.remove('open');
        }
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

// Count all descendants
function countAllDescendants(node) {
  if (!node.children) {
    return 1; // Leaf node counts as 1
  }
  
  let count = 0;
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

function groupNodes(nodes) {
  var root = { name: "root" };
  root.children = nodes;

  return groupNode(root);
}

function groupNode(node) {
  var categories = Array.from(new Set(node.children.filter(child => child.children != undefined).map(child => child.name)));

  for (var i = 0; i < categories.length; i++) {
    var category = categories[i];
    var groupedNode = {
name: category,
children: node.children.filter(child => child.name === category).map(child => child.children).flat(Infinity)
    };

    node.children = node.children.filter(child => child.name != category);
    node.children.push(groupedNode);

    if (groupedNode.children != undefined) {
groupNode(groupedNode);
    }
  }

  return node;
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
