// =============== UTILITY FUNCTIONS ===============

// Set current year in footer
function setCurrentYear() {
    document.getElementById('year').textContent = new Date().getFullYear();
}

// Theme Toggle functionality
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
    });
}

// Mobile Menu functionality
function setupMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobilePanel = document.getElementById('mobilePanel');
    const iconHamburger = document.getElementById('iconHamburger');
    const iconClose = document.getElementById('iconClose');

    mobileToggle.addEventListener('click', () => {
        const open = mobilePanel.classList.toggle('hidden') === false;
        iconHamburger.classList.toggle('hidden', open);
        iconClose.classList.toggle('hidden', !open);
    });

    // Smooth close mobile menu on link click
    mobilePanel.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            mobilePanel.classList.add('hidden');
            iconHamburger.classList.remove('hidden');
            iconClose.classList.add('hidden');
        });
    });
}

// Reveal on scroll animation
function setupRevealAnimation() {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('show');
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

// Smooth scroll for anchor links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Form validation and enhancement
function setupFormValidation() {
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('border-red-500');
                } else {
                    input.classList.remove('border-red-500');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                // Show error message
                const errorDiv = document.createElement('div');
                errorDiv.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4';
                errorDiv.textContent = 'Mohon isi semua field yang wajib diisi.';
                
                const existingError = this.querySelector('.bg-red-100');
                if (!existingError) {
                    this.insertBefore(errorDiv, this.firstChild);
                }
            }
        });
    }
}

// Image lazy loading
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Performance optimization - Debounce scroll events
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

// Initialize all functionality
function initPortfolio() {
    setCurrentYear();
    setupThemeToggle();
    setupMobileMenu();
    setupRevealAnimation();
    setupSmoothScroll();
    setupFormValidation();
    setupLazyLoading();
    
    console.log('Portfolio initialized successfully!');
}

// Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initPortfolio);

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setCurrentYear,
        setupThemeToggle,
        setupMobileMenu,
        setupRevealAnimation,
        setupSmoothScroll,
        setupFormValidation,
        setupLazyLoading,
        initPortfolio
    };
}
