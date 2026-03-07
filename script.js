// ============================================
// Vidyarthi Studio - Main JavaScript
// Modern Educational Website Interactions
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initSmoothScroll();
    initCounters();
    initMobileMenu();
    initFAQ();
});

// ============================================
// Navigation Scroll Effect
// ============================================
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// Mobile Menu Toggle
// ============================================
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navCta = document.querySelector('.nav-cta');
    
    if (mobileMenuBtn) {
        // Create mobile menu overlay
        const mobileMenuOverlay = document.createElement('div');
        mobileMenuOverlay.className = 'mobile-menu-overlay';
        document.body.appendChild(mobileMenuOverlay);
        
        // Clone nav menu for mobile
        const mobileNavContainer = document.createElement('div');
        mobileNavContainer.className = 'mobile-nav-container';
        
        const mobileNavMenu = navMenu.cloneNode(true);
        mobileNavMenu.classList.add('mobile-nav-menu');
        
        const mobileNavCta = navCta.cloneNode(true);
        mobileNavCta.classList.add('mobile-nav-cta');
        
        mobileNavContainer.appendChild(mobileNavMenu);
        mobileNavContainer.appendChild(mobileNavCta);
        document.body.appendChild(mobileNavContainer);
        
        // Add mobile styles
        const mobileStyles = document.createElement('style');
        mobileStyles.textContent = `
            .mobile-menu-overlay {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.5);
                z-index: 998;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .mobile-menu-overlay.active {
                opacity: 1;
                visibility: visible;
            }
            
            .mobile-nav-container {
                position: fixed;
                top: 0;
                right: -100%;
                width: 80%;
                max-width: 350px;
                height: 100vh;
                background: white;
                z-index: 999;
                padding: 100px 30px 30px;
                transition: right 0.3s ease;
                box-shadow: -5px 0 30px rgba(0, 0, 0, 0.1);
            }
            
            .mobile-nav-container.active {
                right: 0;
            }
            
            .mobile-nav-menu {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-bottom: 30px;
            }
            
            .mobile-nav-menu .nav-link {
                padding: 15px 20px;
                border-radius: 12px;
                font-size: 1.125rem;
                font-weight: 600;
            }
            
            .mobile-nav-menu .nav-link:hover,
            .mobile-nav-menu .nav-link.active {
                background: rgba(37, 99, 235, 0.1);
                color: #2563eb;
            }
            
            .mobile-nav-menu .nav-link::after {
                display: none;
            }
            
            .mobile-nav-cta {
                display: flex;
                justify-content: center;
                width: 100%;
            }
            
            .mobile-menu-btn.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-btn.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-btn.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        `;
        document.head.appendChild(mobileStyles);
        
        // Toggle menu
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            mobileNavContainer.classList.toggle('active');
            document.body.style.overflow = mobileNavContainer.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu on overlay click
        mobileMenuOverlay.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            mobileNavContainer.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close menu on link click
        mobileNavContainer.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                mobileNavContainer.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Mobile dropdown toggle
        mobileNavContainer.querySelectorAll('.nav-dropdown').forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle) {
                toggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                });
            }
        });
    }
}

// ============================================
// Scroll Animations
// ============================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .course-card, .testimonial-card, .founder-card, .contact-card'
    );
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for cards in same row
                const delay = index * 100;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Counter Animation for Stats
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = counter.textContent;
                
                // Extract number and suffix
                const numericValue = parseInt(target.replace(/\D/g, ''));
                const suffix = target.replace(/[0-9]/g, '');
                
                animateCounter(counter, 0, numericValue, 2000, suffix);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, start, end, duration, suffix) {
    const range = end - start;
    const minTimer = 50;
    let stepTime = Math.abs(Math.floor(duration / range));
    stepTime = Math.max(stepTime, minTimer);
    
    let startTime = new Date().getTime();
    let endTime = startTime + duration;
    let timer;
    
    function run() {
        let now = new Date().getTime();
        let remaining = Math.max((endTime - now) / duration, 0);
        let value = Math.round(end - (remaining * range));
        element.textContent = value + suffix;
        
        if (value == end) {
            clearInterval(timer);
        }
    }
    
    timer = setInterval(run, stepTime);
    run();
}

// ============================================
// Parallax Effect for Hero Shapes
// ============================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.2);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// ============================================
// Button Click Feedback
// ============================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframes
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// ============================================
// Form Validation (if forms are added later)
// ============================================
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                isValid = false;
                input.classList.add('error');
            }
        }
    });
    
    return isValid;
}

// ============================================
// Lazy Loading Images (if images are added)
// ============================================
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ============================================
// Performance: Debounce Scroll Events
// ============================================
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

// Apply debouncing to scroll events
const debouncedScroll = debounce(function() {
    // Scroll-based animations can be added here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ============================================
// FAQ Accordion
// ============================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// ============================================
// Console Welcome Message
// ============================================
console.log('%c Welcome to Vidyarthi Studio! ', 'background: linear-gradient(135deg, #2563eb, #f97316); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 10px;');
console.log('%c Empowering students with the power of mathematics ', 'color: #64748b; font-size: 14px;');
