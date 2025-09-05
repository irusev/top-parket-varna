// Parquet Cycling Website JavaScript - Containers.bg inspired functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileNavigation();
    initFAQ();
    initContactForm();
    initScrollAnimations();
    initStatsCounter();
    initSmoothScrolling();
    initHeaderScroll();
    initFormAnimations();
    initButtonAnimations();
    initStaggeredAnimations();
});

// Mobile Navigation
function initMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav__list a');

    if (navToggle && nav) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            nav.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                nav.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
                nav.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function(e) {
                e.preventDefault();
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = '0';
                        }
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    answer.style.maxHeight = '0';
                } else {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });
}

// Contact Form Handling
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous error states
            clearFormErrors();
            
            // Get form data
            const formData = new FormData(form);
            const name = formData.get('name')?.trim();
            const phone = formData.get('phone')?.trim();
            const email = formData.get('email')?.trim();
            const service = formData.get('service');
            const message = formData.get('message')?.trim();
            
            let hasErrors = false;
            
            // Validate fields
            if (!name) {
                showFieldError('name', 'Моля, въведете вашето име.');
                hasErrors = true;
            }
            
            if (!phone) {
                showFieldError('phone', 'Моля, въведете телефонен номер.');
                hasErrors = true;
            } else if (!isValidBulgarianPhone(phone)) {
                showFieldError('phone', 'Моля, въведете валиден български телефонен номер.');
                hasErrors = true;
            }
            
            if (email && !isValidEmail(email)) {
                showFieldError('email', 'Моля, въведете валиден имейл адрес.');
                hasErrors = true;
            }
            
            if (hasErrors) {
                showNotification('Моля, коригирайте грешките във формуляра.', 'error');
                return;
            }
            
            // Submit form
            submitForm(form);
        });
    }
}

// Form validation helpers
function isValidBulgarianPhone(phone) {
    const cleaned = phone.replace(/[\s\-]/g, '');
    const phoneRegex = /^(\+359|0)[0-9]{8,9}$/;
    return phoneRegex.test(cleaned);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function clearFormErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.remove());
    
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => control.classList.remove('error'));
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    if (field) {
        field.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        field.parentElement.appendChild(errorDiv);
    }
}

function submitForm(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Изпращане...';
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Благодарим за заявката! Ще се свържем с вас в рамките на 24 часа.', 'success');
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
    }, 2000);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    const colors = {
        error: '#ef4444',
        success: '#10b981',
        info: '#3b82f6'
    };
    
    const bgColor = colors[type] || colors.info;
    
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
    `;
    
    // Ensure animation styles exist
    ensureNotificationStyles();
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function ensureNotificationStyles() {
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification__content { 
                display: flex; 
                align-items: center; 
                justify-content: space-between; 
                gap: 12px; 
            }
            .notification__close { 
                background: none; 
                border: none; 
                color: white; 
                font-size: 20px; 
                font-weight: bold;
                cursor: pointer; 
                padding: 0;
                line-height: 1;
                min-width: 24px;
                opacity: 0.8;
                transition: opacity 0.2s;
            }
            .notification__close:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
}

// Statistics Counter Animation - enhanced for containers.bg style with proper triggering
function initStatsCounter() {
    const statsSection = document.querySelector('.stats');
    const stats = document.querySelectorAll('.stat__number[data-count]');
    const statContainers = document.querySelectorAll('.stat');
    
    if (!statsSection || stats.length === 0) return;
    
    let hasAnimated = false; // Prevent multiple animations
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                
                // Animate stat containers first
                statContainers.forEach((stat, index) => {
                    setTimeout(() => {
                        stat.classList.add('animate');
                    }, index * 150);
                });
                
                // Then animate counters
                setTimeout(() => {
                    stats.forEach((stat, index) => {
                        setTimeout(() => {
                            animateCounter(stat);
                        }, index * 200);
                    });
                }, 300);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -10% 0px'
    });
    
    observer.observe(statsSection);
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2500; // Slightly longer for more dramatic effect
    const start = Date.now();
    
    function update() {
        const now = Date.now();
        const progress = Math.min((now - start) / duration, 1);
        
        // Use easing function for smoother animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * target);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
            // Add pulse effect when animation completes
            element.classList.add('pulse');
            setTimeout(() => {
                element.classList.remove('pulse');
            }, 800);
        }
    }
    
    update();
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 70;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll to section function (for buttons)
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 70;
        const targetPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
        });
    }
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = 0;
    let ticking = false;
    
    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            header.style.background = 'rgba(44, 62, 80, 0.98)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = '#2c3e50';
            header.style.backdropFilter = 'none';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Scroll animations for elements
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.contact-item'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Set initial state
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(element);
    });
}

// Form animations and interactions
function initFormAnimations() {
    const formControls = document.querySelectorAll('.form-control');
    
    formControls.forEach(control => {
        // Focus animations
        control.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'all 0.2s ease-out';
        });
        
        control.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
            if (!this.value.trim()) {
                this.parentElement.classList.remove('focused');
            }
            
            // Remove error state on blur if field now has valid value
            if (this.classList.contains('error') && this.value.trim()) {
                this.classList.remove('error');
                const errorMessage = this.parentElement.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            }
        });
        
        // Real-time validation
        control.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                // Remove error state if user starts typing
                this.classList.remove('error');
                const errorMessage = this.parentElement.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            }
        });
        
        // Check if field has value on load
        if (control.value.trim()) {
            control.parentElement.classList.add('focused');
        }
    });
}

// Enhanced button interactions
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.disabled && !this.closest('.service-card')) {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.disabled && !this.closest('.service-card')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            }
        });
        
        button.addEventListener('mousedown', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(0) scale(0.98)';
            }
        });
        
        button.addEventListener('mouseup', function() {
            if (!this.disabled) {
                if (this.closest('.service-card')) {
                    this.style.transform = 'translateY(-2px) scale(1)';
                } else {
                    this.style.transform = 'translateY(-2px) scale(1)';
                }
            }
        });
    });
}

// Intersection Observer for staggered animations
function initStaggeredAnimations() {
    const featureGroups = document.querySelectorAll('.features-grid .feature');
    const serviceGroups = document.querySelectorAll('.services-grid .service');
    const stepGroups = document.querySelectorAll('.process-steps .step');
    const serviceCards = document.querySelectorAll('.service-card');
    
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 150;
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }, delay);
                
                staggerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px'
    });
    
    [...featureGroups, ...serviceGroups, ...stepGroups, ...serviceCards].forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        staggerObserver.observe(element);
    });
}

// Keyboard navigation improvements
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape
    if (e.key === 'Escape') {
        const nav = document.getElementById('nav');
        const navToggle = document.getElementById('nav-toggle');
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            navToggle.classList.remove('active');
        }
        
        // Close notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => notification.remove());
    }
    
    // Navigation with arrow keys for FAQ
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.classList.contains('faq-question')) {
            e.preventDefault();
            const faqQuestions = document.querySelectorAll('.faq-question');
            const currentIndex = Array.from(faqQuestions).indexOf(activeElement);
            
            let nextIndex;
            if (e.key === 'ArrowDown') {
                nextIndex = (currentIndex + 1) % faqQuestions.length;
            } else {
                nextIndex = (currentIndex - 1 + faqQuestions.length) % faqQuestions.length;
            }
            
            faqQuestions[nextIndex].focus();
        }
    }
});

// Performance optimization: Debounced resize handler
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Reset any transforms that might be broken on resize
        const animatedElements = document.querySelectorAll('[style*="transform"]');
        animatedElements.forEach(element => {
            if (!element.closest('.stat') && !element.closest('.service-card')) {
                element.style.transform = '';
            }
        });
    }, 250);
});

// Touch/swipe support for mobile FAQ
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleVerticalSwipe();
}, { passive: true });

function handleVerticalSwipe() {
    const swipeDistance = touchStartY - touchEndY;
    const threshold = 50;
    
    // Add subtle scroll-based interactions for mobile
    if (Math.abs(swipeDistance) > threshold) {
        // Could add mobile-specific scroll interactions here
    }
}

// Service worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment if you want to add service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Export functions for global use
window.scrollToSection = scrollToSection;

// Analytics and performance monitoring
function trackEvent(eventName, eventData) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, eventData);
}

// Track form submissions
document.addEventListener('submit', function(e) {
    if (e.target.id === 'contact-form') {
        trackEvent('form_submission', { form: 'contact' });
    }
});

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        trackEvent('button_click', { 
            button: e.target.textContent,
            section: e.target.closest('section')?.id || 'unknown'
        });
    }
});

// Enhanced scroll performance
let isScrolling = false;
window.addEventListener('scroll', function() {
    if (!isScrolling) {
        window.requestAnimationFrame(function() {
            // Any scroll-based calculations go here
            isScrolling = false;
        });
        isScrolling = true;
    }
});

console.log('🚀 Parquet Cycling website loaded successfully!');