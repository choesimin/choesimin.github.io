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
        const url = item.getAttribute('data-url');
        
        // Apply subtle grayscale background to all items
        applySubtleColor(item);
        
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
    // Create random grayscale variations for all items
    // Random brightness between 245-255 for very subtle differences
    const brightness = 245 + Math.floor(Math.random() * 11); // 245-255 range
    const subtleColor = `rgb(${brightness}, ${brightness}, ${brightness})`;
    item.style.backgroundColor = subtleColor;
}
