// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.overlay');

    function toggleMenu() {
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
});

// Store all anime cards for searching
const animeCards = document.querySelectorAll('.anime-card');
const popularPosts = document.querySelectorAll('.popular-list li');
const contentContainer = document.querySelector('.content-container');
const noResultsMessage = document.createElement('div');
noResultsMessage.className = 'no-results';
noResultsMessage.innerHTML = '<h3>No results found</h3><p>Try different keywords or check the spelling</p>';

// Search functionality
function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.trim().toLowerCase();
    let hasResults = false;

    // Remove existing no-results message if it exists
    const existingMessage = document.querySelector('.no-results');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Search through anime cards
    animeCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(query) || description.includes(query)) {
            card.style.display = 'block';
            hasResults = true;
        } else {
            card.style.display = 'none';
        }
    });

    // Search through popular posts
    popularPosts.forEach(post => {
        const text = post.textContent.toLowerCase();
        
        if (text.includes(query)) {
            post.style.display = 'block';
            hasResults = true;
        } else {
            post.style.display = 'none';
        }
    });

    // Show no results message if nothing found
    if (!hasResults && query !== '') {
        contentContainer.appendChild(noResultsMessage);
    }
}

// Debounce function to limit how often the search is performed
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');

    // Perform search with debounce while typing
    searchInput.addEventListener('input', debounce(() => {
        performSearch();
    }, 300));

    // Perform search on button click
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        performSearch();
    });

    // Perform search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });
});

// Doraemon Movies Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to movie cards
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Load More Functionality for all pages
    const loadMoreButtons = document.querySelectorAll('.load-more .view-all-btn');
    
    loadMoreButtons.forEach(button => {
        // Track shown cards to enable collapse functionality
        button.shownCards = [];
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if we're in "show more" mode or "show less" mode
            if (!this.classList.contains('show-less')) {
                // Find the closest grid container
                const grid = this.closest('.load-more').previousElementSibling;
                const hiddenCards = grid.querySelectorAll('.card-link.hidden');
                
                // Show the next set of hidden cards (up to 4)
                let cardsToShow = Math.min(hiddenCards.length, 4);
                
                // Store references to the cards we're showing
                let currentBatch = [];
                
                for (let i = 0; i < cardsToShow; i++) {
                    hiddenCards[i].classList.remove('hidden');
                    // Add animation class to make the appearance smooth
                    hiddenCards[i].classList.add('card-fadeIn');
                    currentBatch.push(hiddenCards[i]);
                }
                
                // Add the current batch to our tracking array
                this.shownCards.push(currentBatch);
                
                // If no more hidden cards, change to "show less" mode
                if (hiddenCards.length <= cardsToShow) {
                    this.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
                    this.classList.add('show-less');
                }
                
                // Add a counter to the button if needed
                if (hiddenCards.length > cardsToShow) {
                    // Update the count of remaining items
                    const remaining = hiddenCards.length - cardsToShow;
                    if (this.querySelector('.remaining-count')) {
                        this.querySelector('.remaining-count').textContent = remaining;
                    }
                }
            } else {
                // We're in "show less" mode - hide all cards that were loaded
                while (this.shownCards.length > 0) {
                    const batch = this.shownCards.pop();
                    batch.forEach(card => {
                        card.classList.add('hidden');
                        card.classList.remove('card-fadeIn');
                    });
                }
                
                // Change back to "show more" mode
                const contentType = this.getAttribute('data-content-type') || '';
                if (contentType === 'anime') {
                    this.innerHTML = 'Load More Anime <i class="fas fa-chevron-down"></i>';
                } else if (contentType === 'cartoons') {
                    this.innerHTML = 'Load More Cartoons <i class="fas fa-chevron-down"></i>';
                } else if (contentType === 'episodes') {
                    this.innerHTML = 'Load More Episodes <i class="fas fa-chevron-down"></i>';
                } else {
                    this.innerHTML = 'Load More <i class="fas fa-chevron-down"></i>';
                }
                this.classList.remove('show-less');
            }
            
            // Store original text and icon if this is the first click
            if (!this.dataset.originalText && !this.classList.contains('show-less')) {
                const icon = this.querySelector('i');
                this.dataset.originalText = this.textContent.replace(icon ? icon.outerHTML : '', '').trim();
                this.dataset.originalIcon = icon ? icon.outerHTML : '';
            }
        });
    });
});  