---
layout: none
---

// Note tree functionality
(function() {
  'use strict';
  
  // Helper functions
  function countAllDescendants(node) {
    if (!node.children) return 1;
    
    let count = 0;
    for (let child of node.children) {
      count += child.children ? countAllDescendants(child) : 1;
    }
    return count;
  }
  
  function toggleChildList(e, childList, toggleText) {
    e.stopPropagation();
    const isHidden = childList.classList.contains("hidden");
    const icon = toggleText.querySelector('.toggle-icon');
    
    if (isHidden) {
      childList.classList.remove("hidden");
      icon.classList.add('open');
    } else {
      childList.classList.add("hidden");
      icon.classList.remove('open');
    }
  }
  
  function makeList(node, list) {
    const listItem = document.createElement("li");
    listItem.classList.add("list-item-relative");
    
    if (node.children) {
      node.originalChildrenCount = node.children.length;
      
      const index = node.children.find(child => child.isIndex);
      node.children = node.children.filter(child => !child.isIndex);

      // Create content container
      const contentContainer = document.createElement("span");
      contentContainer.classList.add("content-container");
      
      if (index) {
        listItem.id = index.category.join('-');
        const anchor = document.createElement("a");
        anchor.textContent = index.name;
        anchor.href = index.url;
        contentContainer.appendChild(anchor);
      } else {
        contentContainer.textContent = node.name;
      }
      
      listItem.appendChild(contentContainer);
      
      // Create right container
      const rightContainer = document.createElement("span");
      rightContainer.classList.add("right-container");
      
      const totalDescendants = countAllDescendants(node);
      const childCount = document.createElement("span");
      childCount.className = "count-display";
      childCount.textContent = totalDescendants;
      rightContainer.appendChild(childCount);
      
      // Add toggle if node has children
      if (node.children.length > 0) {
        const toggleText = document.createElement("span");
        toggleText.classList.add("toggle-margin-left");

        const toggleIcon = document.createElement("span");
        toggleIcon.className = "toggle-icon";
        toggleIcon.textContent = "▾";

        toggleText.appendChild(toggleIcon);
        rightContainer.appendChild(toggleText);
      }
      
      listItem.appendChild(rightContainer);
      list.appendChild(listItem);

      if (node.children.length > 0) {
        const childList = document.createElement("ul");
        childList.classList.add("hidden");
        
        for (const child of node.children) {
          makeList(child, childList);
        }
        
        listItem.appendChild(childList);

        rightContainer.style.cursor = "pointer";
        rightContainer.addEventListener("click", function(e) {
          toggleChildList(e, childList, toggleText);
        });

        if (index) {
          contentContainer.addEventListener("click", function(e) {
            e.stopPropagation();
            window.location.href = index.url;
          });
        }
      }
    } else {
      // Leaf node
      const anchor = document.createElement("a");
      anchor.textContent = node.name;
      anchor.href = node.url;
      listItem.appendChild(anchor);
      list.appendChild(listItem);
    }
  }
  
  function groupNode(node) {
    if (node.children) {
      node.originalChildrenCount = node.children.length;
    }
    
    const categories = [...new Set(
      node.children
        .filter(child => child.children)
        .map(child => child.name)
    )];

    for (const category of categories) {
      const groupedNode = {
        name: category,
        children: node.children
          .filter(child => child.name === category)
          .map(child => child.children)
          .flat(Infinity)
      };
      
      if (groupedNode.children) {
        groupedNode.originalChildrenCount = groupedNode.children.length;
      }

      node.children = node.children.filter(child => child.name !== category);
      node.children.push(groupedNode);

      if (groupedNode.children) {
        groupNode(groupedNode);
      }
    }

    return node;
  }

  function groupNodes(nodes) {
    const root = { name: "root", children: nodes };
    return groupNode(root);
  }

  function makeNodes(pages) {
    return pages.map(page => makeNode(page));
  }

  function makeNode(page) {
    const leaf = {
      name: page.title,
      url: page.url,
      category: page.category,
      isIndex: page.name === "index"
    };
    return makeMultiDepthNode(page.category, leaf, 1);
  }

  function makeMultiDepthNode(category, child, indent) {
    const node = {
      name: category[category.length - indent],
      children: [child]
    };

    if (indent < category.length) {
      return makeMultiDepthNode(category, node, indent + 1);
    }

    return node;
  }

  function getNotes() {
    const notes = [];
    {% for note in site.notes %}
    const path = "{{ note.path }}".replace("_notes/", "").split("/");
    notes.push({
      category: path.slice(0, path.length - 1),
      name: path[path.length - 1].replace(".md", ""),
      title: "{{ note.title | escape }}",
      url: "{{ note.url | relative_url }}",
    });
    {% endfor %}
    return notes;
  }
  
  function initializeNoteTree() {
    const noteListElement = document.getElementById("noteList");
    if (!noteListElement) return;
    
    const pages = getNotes();
    const nodes = makeNodes(pages);
    const root = groupNodes(nodes);

    const list = document.createElement("ul");
    list.className = "root";

    if (root.children && root.children.length > 0) {
      for (const child of root.children) {
        makeList(child, list);
      }
    }

    noteListElement.appendChild(list);
  }
  
  // Export function
  window.initializeNoteTree = initializeNoteTree;
})();
