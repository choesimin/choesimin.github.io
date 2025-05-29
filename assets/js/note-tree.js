---
layout: none
---

// Note tree functionality - DISABLED for simplified sidebar
(function() {
  'use strict';
  
  function initializeNoteTree() {
    // Note tree functionality disabled - sidebar now only contains navigation links
    return;
  }
  
  // Export function
  window.initializeNoteTree = initializeNoteTree;
})();
    
    if (node.children) {
      node.originalChildrenCount = node.children.length;
      
      const index = node.children.find(child => child.isIndex);
      node.children = node.children.filter(child => !child.isIndex);

      // Create content container with toggle and count
      const contentContainer = document.createElement("span");
      contentContainer.classList.add("content-container");
      
      // Add toggle if node has children (before text)
      if (node.children.length > 0) {
        const toggleText = document.createElement("span");
        toggleText.classList.add("tree-toggle-icon");
        toggleText.textContent = "▾";
        toggleText.style.cursor = "pointer";
        contentContainer.appendChild(toggleText);
      }
      
      // Add the main text/link
      const textSpan = document.createElement("span");
      textSpan.classList.add("tree-text");
      
      if (index) {
        listItem.id = index.category.join('-');
        const anchor = document.createElement("a");
        anchor.textContent = index.name;
        anchor.href = index.url;
        textSpan.appendChild(anchor);
      } else {
        textSpan.textContent = node.name;
      }
      
      contentContainer.appendChild(textSpan);
      
      // Add count (after text)
      const totalDescendants = countAllDescendants(node);
      const childCount = document.createElement("span");
      childCount.className = "count-display tree-count";
      childCount.textContent = totalDescendants;
      contentContainer.appendChild(childCount);
      
      listItem.appendChild(contentContainer);
      list.appendChild(listItem);

      if (node.children.length > 0) {
        const childList = document.createElement("ul");
        childList.classList.add("hidden");
        
        for (const child of node.children) {
          makeList(child, childList);
        }
        
        listItem.appendChild(childList);

        // Add click handler to toggle icon
        const toggleIcon = contentContainer.querySelector('.tree-toggle-icon');
        if (toggleIcon) {
          toggleIcon.addEventListener("click", function(e) {
            e.stopPropagation();
            const isHidden = childList.classList.contains("hidden");
            
            if (isHidden) {
              childList.classList.remove("hidden");
              toggleIcon.classList.add('open');
            } else {
              childList.classList.add("hidden");
              toggleIcon.classList.remove('open');
            }
          });
        }

        if (index) {
          const textSpan = contentContainer.querySelector('.tree-text');
          if (textSpan) {
            textSpan.addEventListener("click", function(e) {
              e.stopPropagation();
              window.location.href = index.url;
            });
          }
        }
      }
    } else {
      // Leaf node
      const contentContainer = document.createElement("span");
      contentContainer.classList.add("content-container");
      
      // Add space for toggle alignment (but don't show toggle)
      const toggleSpace = document.createElement("span");
      toggleSpace.classList.add("tree-toggle-icon");
      toggleSpace.style.visibility = "hidden";
      toggleSpace.textContent = "▾";
      contentContainer.appendChild(toggleSpace);
      
      // Add the main text/link
      const textSpan = document.createElement("span");
      textSpan.classList.add("tree-text");
      
      const anchor = document.createElement("a");
      anchor.textContent = node.name;
      anchor.href = node.url;
      textSpan.appendChild(anchor);
      
      contentContainer.appendChild(textSpan);
      
      // No count needed for leaf nodes, but add space for alignment
      
      listItem.appendChild(contentContainer);
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
    notes.push({
      category: "{{ note.path }}".replace("_notes/", "").split("/").slice(0, -1),
      name: "{{ note.path }}".replace("_notes/", "").split("/").pop().replace(".md", ""),
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
