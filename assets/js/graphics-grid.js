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
    
    let lastBrightness = null;
    
    // Apply subtle background colors and click functionality
    listItems.forEach(item => {
        const url = item.getAttribute('data-url');
        
        // Apply subtle grayscale background with contrast from previous item
        lastBrightness = applySubtleColor(item, lastBrightness);
        
        // Add click functionality
        if (url) {
            item.addEventListener('click', function() {
                window.open(url, '_blank');
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

function applySubtleColor(item, lastBrightness) {
    let brightness;
    
    if (lastBrightness === null) {
        // First item: random brightness in the range
        brightness = Math.floor(Math.random() * 31) + 220; // 220-250
    } else {
        // Ensure contrast with previous item
        const minDifference = 15; // Minimum brightness difference
        const maxAttempts = 10;
        let attempts = 0;
        
        do {
            brightness = Math.floor(Math.random() * 31) + 220; // 220-250
            attempts++;
        } while (attempts < maxAttempts && Math.abs(brightness - lastBrightness) < minDifference);
        
        // If we couldn't find a good contrast, force it
        if (Math.abs(brightness - lastBrightness) < minDifference) {
            if (lastBrightness > 235) {
                brightness = Math.max(220, lastBrightness - minDifference);
            } else {
                brightness = Math.min(250, lastBrightness + minDifference);
            }
        }
    }
    
    const grayscaleColor = `rgb(${brightness}, ${brightness}, ${brightness})`;
    item.style.backgroundColor = grayscaleColor;
    
    return brightness; // Return the brightness for the next item
}
