/**
 * Graphics List JavaScript
 * Simple grid with subtle background colors
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeGraphicsList();
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
    
    console.log(`Initialized ${listItems.length} graphics items`);
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
