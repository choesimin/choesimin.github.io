/**
 * Graphics List JavaScript
 * Simple grid with subtle background colors
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeGraphicsList();
    
    // Recalculate empty items on window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Remove existing empty items
            const container = document.getElementById('graphicsList');
            const emptyItems = container.querySelectorAll('.graphics-empty');
            emptyItems.forEach(item => item.remove());
            
            // Add new empty items based on new layout
            setTimeout(() => {
                addEmptyPlaceholders();
            }, 100);
        }, 250);
    });
});

function initializeGraphicsList() {
    const listItems = document.querySelectorAll('.graphics-item');
    
    if (listItems.length === 0) {
        console.log('No graphics items found');
        return;
    }
    
    // Apply subtle background colors and click functionality
    listItems.forEach(item => {
        const color = item.getAttribute('data-color');
        const url = item.getAttribute('data-url');
        
        // Apply subtle background color based on color attribute
        if (color) {
            applySubtleColor(item, color);
        }
        
        // Add click functionality
        if (url) {
            item.addEventListener('click', function() {
                window.location.href = url;
            });
            
            // Add keyboard accessibility
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
            item.setAttribute('aria-label', `Navigate to ${item.querySelector('.graphics-title')?.textContent || 'graphics item'}`);
            
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        }
    });
    
    // Add empty placeholder items to fill the grid
    setTimeout(() => {
        addEmptyPlaceholders();
    }, 100);
    
    console.log(`Initialized ${listItems.length} graphics items`);
}

function addEmptyPlaceholders() {
    const container = document.getElementById('graphicsList');
    const existingItems = container.querySelectorAll('.graphics-item:not(.graphics-empty)').length;
    
    // Calculate grid dimensions based on container width
    const containerWidth = container.offsetWidth;
    const itemMinWidth = 200; // From CSS minmax(200px, 1fr)
    const gap = 1; // From CSS gap: 1px
    
    const itemsPerRow = Math.floor((containerWidth + gap) / (itemMinWidth + gap));
    
    // Only fill the current row if it's not complete
    const currentRowItems = existingItems % itemsPerRow;
    const itemsToAdd = currentRowItems === 0 ? 0 : itemsPerRow - currentRowItems;
    
    for (let i = 0; i < itemsToAdd; i++) {
        const emptyItem = document.createElement('div');
        emptyItem.className = 'graphics-item graphics-empty';
        emptyItem.innerHTML = '<div class="graphics-title"></div>';
        container.appendChild(emptyItem);
    }
    
    console.log(`Added ${itemsToAdd} empty placeholder items (${itemsPerRow} items per row)`);
}

function applySubtleColor(item, color) {
    // Create very subtle tinted backgrounds based on the color
    const colorMap = {
        'red': '#fefafa',
        'blue': '#fafcff', 
        'green': '#fafffa',
        'yellow': '#fffffe',
        'purple': '#fcfaff',
        'orange': '#fffcfa',
        'pink': '#fffafc',
        'black': '#fbfbfb',
        'white': '#ffffff',
        'gray': '#fafafa',
        'grey': '#fafafa'
    };
    
    const subtleColor = colorMap[color.toLowerCase()] || '#fafafa';
    item.style.backgroundColor = subtleColor;
}
