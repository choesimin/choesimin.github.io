document.addEventListener('DOMContentLoaded', function() {
  // Generate table of contents
  generateTOC();
  
  // Add scroll event listener to highlight current section
  window.addEventListener('scroll', highlightCurrentSection);
});

function generateTOC() {
  const toc = document.getElementById('toc');
  if (!toc) return;
  
  // Find all headings in the content
  const noteContent = document.querySelector('.note-content');
  const headings = noteContent.querySelectorAll('h2, h3, h4, h5, h6');
  
  if (headings.length === 0) {
    const tocContainer = document.querySelector('.toc-container');
    if (tocContainer) {
      tocContainer.style.display = 'none';
    }
    return;
  }
  
  // Create the TOC structure
  const tocStack = [{ level: 1, element: toc }];
  
  headings.forEach((heading, index) => {
    // Get heading level (h2 = 2, h3 = 3, etc.)
    const level = parseInt(heading.tagName.substring(1));
    
    // Add ID to the heading if it doesn't have one
    if (!heading.id) {
      heading.id = `heading-${index}`;
    }
    
    // Create link element
    const link = document.createElement('a');
    link.textContent = heading.textContent;
    link.href = `#${heading.id}`;
    link.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: heading.offsetTop - 20,
        behavior: 'smooth'
      });
      history.pushState(null, null, this.href);
    });
    
    // Create list item
    const listItem = document.createElement('li');
    listItem.appendChild(link);
    
    // Ensure the proper nesting of lists
    while (level > tocStack[tocStack.length - 1].level + 1) {
      const nestedList = document.createElement('ul');
      const nestedItem = document.createElement('li');
      nestedItem.appendChild(nestedList);
      tocStack[tocStack.length - 1].element.appendChild(nestedItem);
      tocStack.push({ level: tocStack[tocStack.length - 1].level + 1, element: nestedList });
    }
    
    while (level <= tocStack[tocStack.length - 1].level) {
      tocStack.pop();
    }
    
    tocStack[tocStack.length - 1].element.appendChild(listItem);
    
    if (level < 6) {
      const nestedList = document.createElement('ul');
      listItem.appendChild(nestedList);
      tocStack.push({ level: level, element: nestedList });
    }
  });
}

function highlightCurrentSection() {
  const headings = document.querySelectorAll('.note-content h2, .note-content h3, .note-content h4, .note-content h5, .note-content h6');
  if (headings.length === 0) return;
  
  const tocLinks = document.querySelectorAll('#toc a');
  
  // Get current scroll position with some offset
  const scrollPosition = window.scrollY + 100;
  
  // Find the current heading
  let currentHeading = headings[0];
  
  for (let i = 0; i < headings.length; i++) {
    if (headings[i].offsetTop <= scrollPosition) {
      currentHeading = headings[i];
    } else {
      break;
    }
  }
  
  // Remove active class from all links
  tocLinks.forEach(link => {
    link.classList.remove('active');
  });
  
  // Add active class to the current link
  const currentLink = document.querySelector(`#toc a[href="#${currentHeading.id}"]`);
  if (currentLink) {
    currentLink.classList.add('active');
  }
}
