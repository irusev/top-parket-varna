// Parquet Cycling Website JavaScript - Containers.bg inspired functionality with enhanced animations

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
    initParallaxEffects();
    initFloatingAnimations();
    initImageRevealAnimations();
    initBackgroundVisibility();
    initGallery();
    
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
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            if (nav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                nav.classList.remove('active');
                navToggle.classList.remove('active');
                
                // Reset hamburger animation
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
                nav.classList.remove('active');
                navToggle.classList.remove('active');
                
                // Reset hamburger animation
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

// FAQ Accordion with enhanced animations
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function(e) {
                e.preventDefault();
                const isActive = item.classList.contains('active');
                
                // Close all other items with animation
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = '0';
                        }
                    }
                });
                
                // Toggle current item with enhanced animation
                if (isActive) {
                    item.classList.remove('active');
                    answer.style.maxHeight = '0';
                } else {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    
                    // Add subtle bounce effect
                    setTimeout(() => {
                        answer.style.transform = 'scale(1.01)';
                        setTimeout(() => {
                            answer.style.transform = 'scale(1)';
                        }, 150);
                    }, 100);
                }
            });
        }
    });
}

// Contact Form Handling with enhanced validation
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
        
        // Add shake animation
        field.style.animation = 'shake 0.4s ease-in-out';
        setTimeout(() => {
            field.style.animation = '';
        }, 400);
        
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
        
        // Add success animation to form
        form.style.transform = 'scale(1.02)';
        setTimeout(() => {
            form.style.transform = 'scale(1)';
        }, 200);
    }, 2000);
}

// Enhanced notification system
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
    
    const icons = {
        error: '⚠️',
        success: '✅',
        info: 'ℹ️'
    };
    
    const bgColor = colors[type] || colors.info;
    const icon = icons[type] || icons.info;
    
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__icon">${icon}</span>
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
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
        backdrop-filter: blur(10px);
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
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
            .notification__content { 
                display: flex; 
                align-items: center; 
                gap: 12px; 
            }
            .notification__icon {
                font-size: 18px;
                flex-shrink: 0;
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
                margin-left: auto;
                flex-shrink: 0;
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
    
    // Set dynamic value for renovated floors counter
    const renovatedFloorsStat = document.querySelector('.stat__number[data-count="dynamic"]');
    if (renovatedFloorsStat) {
        const dynamicValue = calculateRenovatedFloors();
        renovatedFloorsStat.setAttribute('data-count', dynamicValue);
    }
    
    let hasAnimated = false; // Prevent multiple animations
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                
                // Animate stat containers first
                statContainers.forEach((stat, index) => {
                    setTimeout(() => {
                        stat.classList.add('animate');
                        stat.style.transform = 'translateY(0) scale(1.05)';
                        setTimeout(() => {
                            stat.style.transform = 'translateY(0) scale(1)';
                        }, 200);
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

// Enhanced Smooth Scrolling
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
                const rect = targetElement.getBoundingClientRect();
                const absoluteY = window.pageYOffset + rect.top;
                const top = Math.max(0, absoluteY - headerHeight - 20);
                window.scrollTo({ top, behavior: 'smooth' });
                if (history && history.pushState) {
                    history.pushState(null, '', targetId);
                }
            }
        });
    });
}

function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let currentTime = 0;
    const increment = 20;
    
    const stickyContact = document.getElementById('stickyContact');
    
    function animateScroll() {
        currentTime += increment;
        const val = easeInOutQuad(currentTime, start, distance, duration);
        window.scrollTo(0, val);
        
        // Removed excessive styling - CSS handles positioning
        
        if (currentTime < duration) {
            requestAnimationFrame(animateScroll);
        }
    }
    
    animateScroll();
}

function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}

// Scroll to section function (for buttons)
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 70;
        const rect = element.getBoundingClientRect();
        const absoluteY = window.pageYOffset + rect.top;
        const top = Math.max(0, absoluteY - headerHeight - 20);
        window.scrollTo({ top, behavior: 'smooth' });
    }
}

// Enhanced header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = 0;
    let ticking = false;
    
    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            header.style.background = 'rgba(44, 85, 48, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
            header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        } else {
            header.style.background = '#2c5530';
            header.style.backdropFilter = 'none';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.borderBottom = 'none';
        }
        
        // Keep header always visible (removed hide/show logic that breaks on programmatic scroll)
        //header.style.transform = 'translateY(0)';
        
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

// Enhanced scroll animations for elements
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.contact-item, .service__image-placeholder'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
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
        element.style.transform = 'translateY(40px) scale(0.95)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(element);
    });
}

// Enhanced form animations and interactions
function initFormAnimations() {
    const formControls = document.querySelectorAll('.form-control');
    
    formControls.forEach(control => {
        // Focus animations
        control.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'all 0.2s ease-out';
            this.style.boxShadow = '0 0 0 3px rgba(249, 194, 60, 0.2)';
        });
        
        control.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
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
        
        // Real-time validation with animations
        control.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                // Remove error state if user starts typing
                this.classList.remove('error');
                const errorMessage = this.parentElement.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.style.animation = 'fadeOut 0.3s ease-out';
                    setTimeout(() => {
                        errorMessage.remove();
                    }, 300);
                }
            }
        });
        
        // Check if field has value on load
        if (control.value.trim()) {
            control.parentElement.classList.add('focused');
        }
    });
}

// Enhanced button interactions with ripple effect
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Add ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
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
    
    // Add ripple animation to stylesheet
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            @keyframes fadeOut {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced intersection Observer for staggered animations
function initStaggeredAnimations() {
    const featureGroups = document.querySelectorAll('.features-grid .feature');
    const serviceGroups = document.querySelectorAll('.services-grid .service');
    const stepGroups = document.querySelectorAll('.process-steps .step');
    const serviceCards = document.querySelectorAll('.service-card');
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 150;
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    
                    // Add extra bounce for service cards
                    if (entry.target.classList.contains('service-card') || 
                        entry.target.classList.contains('pricing-card')) {
                        setTimeout(() => {
                            entry.target.style.transform = 'translateY(0) scale(1.05)';
                            setTimeout(() => {
                                entry.target.style.transform = 'translateY(0) scale(1)';
                            }, 150);
                        }, 200);
                    }
                }, delay);
                
                staggerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px'
    });
    
    [...featureGroups, ...serviceGroups, ...stepGroups, ...serviceCards, ...pricingCards].forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px) scale(0.95)';
        staggerObserver.observe(element);
    });
}

// Parallax effects for background images - DISABLED to fix background visibility
function initParallaxEffects() {
    // Disabled parallax effects to ensure backgrounds are always visible
    // The backgrounds now use CSS gradients which work better without transforms
    return;
}

// Ensure backgrounds are always visible
function initBackgroundVisibility() {
    const backgroundElements = document.querySelectorAll(
        '.hero__background, .why-choose__background, .services__background, .pricing__background, .process__background, .stats__background, .faq__background, .contact__background'
    );
    
    // Special check for hero background
    const heroBackground = document.querySelector('.hero__background');
    const heroSection = document.querySelector('.hero');
    
    if (heroBackground) {
        const computed = getComputedStyle(heroBackground);
        const heroComputed = getComputedStyle(heroSection);
    }
    
    backgroundElements.forEach((element, index) => {
        const computed = getComputedStyle(element);
        
        // Reset any transforms that might hide the background
        element.style.transform = 'none';
        element.style.display = 'block';
        element.style.visibility = 'visible';
        element.style.opacity = '1';
        
        // Force background for hero element
        if (element.classList.contains('hero__background')) {
            // Set background with !important to override any CSS
            element.setAttribute('style', `
                transform: none !important;
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                background: #2c5530 !important;
                background-color: #2c5530 !important;
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                z-index: -2 !important;
            `);
            
            // Also set background on the hero section itself
            const heroSection = element.parentElement;
            if (heroSection && heroSection.classList.contains('hero')) {
                heroSection.style.setProperty('background', '#2c5530', 'important');
                heroSection.style.setProperty('background-color', '#2c5530', 'important');
            }
        }
    });
    
    // Final check after applying fixes
    if (heroBackground) {
        const computed = getComputedStyle(heroBackground);
    }
    
}

// Floating animations for icons and illustrations
function initFloatingAnimations() {
    const floatingElements = document.querySelectorAll(
        '.service__icon, .step__illustration, .pricing-card__illustration'
    );
    
    floatingElements.forEach((element, index) => {
        // Stagger the animation start
        element.style.animationDelay = `${index * 0.2}s`;
        element.style.animation = 'float 3s ease-in-out infinite';
    });
    
    // Add floating animation to stylesheet
    if (!document.getElementById('floating-styles')) {
        const style = document.createElement('style');
        style.id = 'floating-styles';
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Image reveal animations
function initImageRevealAnimations() {
    const imageElements = document.querySelectorAll('.service__image-placeholder');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
                entry.target.style.animation = 'imageReveal 0.8s ease-out forwards';
                
                imageObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    imageElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        element.style.transition = 'all 0.8s ease-out';
        imageObserver.observe(element);
    });
    
    // Add image reveal animation
    if (!document.getElementById('image-reveal-styles')) {
        const style = document.createElement('style');
        style.id = 'image-reveal-styles';
        style.textContent = `
            @keyframes imageReveal {
                from { 
                    opacity: 0; 
                    transform: scale(0.8) rotate(-2deg); 
                }
                to { 
                    opacity: 1; 
                    transform: scale(1) rotate(0deg); 
                }
            }
        `;
        document.head.appendChild(style);
    }
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
            
            // Reset hamburger animation
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
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
            // Don't reset transforms on background elements or important animated elements
            if (!element.closest('.stat') && 
                !element.closest('.service-card') && 
                !element.classList.contains('hero__background') &&
                !element.classList.contains('services__background') &&
                !element.classList.contains('stats__background') &&
                !element.classList.contains('why-choose__background') &&
                !element.classList.contains('pricing__background') &&
                !element.classList.contains('process__background') &&
                !element.classList.contains('faq__background') &&
                !element.classList.contains('contact__background')) {
                element.style.transform = '';
            }
        });
        
        // Ensure backgrounds stay visible on resize
        initBackgroundVisibility();
    }, 250);
});

// Touch/swipe support for mobile enhancements
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
        // Removed body transform - it breaks position: fixed elements
        // Could add mobile-specific scroll interactions here without transforms
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

// Add loading animation for the entire page
window.addEventListener('load', function() {
    // Check backgrounds again after everything is loaded
    initBackgroundVisibility();
    
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Gallery functionality - simplified for before/after only
function initGallery() {
    // Build preview from available before/after pairs
    const availablePairs = buildBeforeAfterPairs();
    const previewPairs = availablePairs.slice(0, 5);
    
    renderPreviewGrid(previewPairs);
    renderMobileCarousel(previewPairs);
}

// Shuffle gallery images for random display
function shuffleGalleryImages() {
    const galleryGrid = document.querySelector('.gallery-grid');
    
    if (galleryGrid) {
        const items = Array.from(galleryGrid.children);
        
        // Fisher-Yates shuffle algorithm
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            galleryGrid.appendChild(items[j]);
        }
    }
}

// Build before/after pairs from gallery_images folder naming
function buildBeforeAfterPairs() {
    // Hardcode indices by scanning known range; filenames are N-Преди.jpg and N-След.jpg
    const maxIndex = 100;
    const pairs = [];
    for (let i = 1; i <= maxIndex; i++) {
        const before = `gallery_images/${i}-Преди.jpg`;
        const after = `gallery_images/${i}-След.jpg`;
        // We cannot check file existence from client; optimistically add first chunk
        // Rely on <img> error handling to hide broken ones (CSS object-fit keeps layout)
        pairs.push({ before, after, index: i });
    }
    // Prefer the first contiguous block that actually exists visually; still fine as preview
    return pairs;
}

function renderPreviewGrid(pairs) {
    const grid = document.getElementById('galleryPreviewGrid');
    if (!grid) return;
    grid.innerHTML = '';
    pairs.forEach(pair => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <div class="before-after-container">
                <div class="before-after-image">
                    <img src="${pair.before}" alt="Преди - проект ${pair.index}" onerror="this.parentElement.parentElement.parentElement.remove()" onclick="openGalleryModal(this)" />
                    <div class="before-after-label">Преди</div>
                </div>
                <div class="before-after-image">
                    <img src="${pair.after}" alt="След - проект ${pair.index}" onerror="this.parentElement.parentElement.parentElement.remove()" onclick="openGalleryModal(this)" />
                    <div class="before-after-label">След</div>
                </div>
            </div>
        `;
        grid.appendChild(item);
    });
}

function renderMobileCarousel(pairs) {
    const track = document.getElementById('carouselTrack');
    const indicatorsWrap = document.getElementById('carouselIndicators');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (!track || !indicatorsWrap || !prevBtn || !nextBtn) return;
    
    track.innerHTML = '';
    indicatorsWrap.innerHTML = '';
    
    pairs.forEach((pair, idx) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `
            <div class="before-after-container">
                <div class="before-after-image">
                    <img src="${pair.before}" alt="Преди - проект ${pair.index}" onerror="this.closest('.carousel-slide').remove()" onclick="openGalleryModal(this)" />
                    <div class="before-after-label">Преди</div>
                </div>
                <div class="before-after-image">
                    <img src="${pair.after}" alt="След - проект ${pair.index}" onerror="this.closest('.carousel-slide').remove()" onclick="openGalleryModal(this)" />
                    <div class="before-after-label">След</div>
                </div>
            </div>
        `;
        track.appendChild(slide);
        const dot = document.createElement('span');
        dot.className = `indicator${idx === 0 ? ' active' : ''}`;
        dot.dataset.slide = String(idx);
        indicatorsWrap.appendChild(dot);
    });
    
    // Initialize carousel behavior now that slides exist
    initDynamicCarousel();
}

function initDynamicCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = Array.from(document.querySelectorAll('#carouselIndicators .indicator'));
    if (!carouselTrack || !prevBtn || !nextBtn) return;
    
    let currentSlide = 0;
    let totalSlides = carouselTrack.children.length;
    
    function updateCarousel() {
        totalSlides = carouselTrack.children.length;
        if (totalSlides === 0) return;
        currentSlide = Math.max(0, Math.min(currentSlide, totalSlides - 1));
        const translateX = -currentSlide * 100;
        carouselTrack.style.transform = `translateX(${translateX}%)`;
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    function nextSlide() {
        totalSlides = carouselTrack.children.length;
        if (totalSlides === 0) return;
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    function prevSlide() {
        totalSlides = carouselTrack.children.length;
        if (totalSlides === 0) return;
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarousel();
    }
    
    nextBtn.onclick = nextSlide;
    prevBtn.onclick = prevSlide;
    indicators.forEach((indicator, index) => {
        indicator.onclick = () => goToSlide(index);
    });
    
    // Touch/swipe
    let startX = 0;
    let endX = 0;
    carouselTrack.addEventListener('touchstart', (e) => {
        if (!e.touches || e.touches.length === 0) return;
        startX = e.touches[0].clientX;
    });
    carouselTrack.addEventListener('touchend', (e) => {
        if (!e.changedTouches || e.changedTouches.length === 0) return;
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide(); else prevSlide();
        }
    });
    
    setInterval(nextSlide, 5000);
    updateCarousel();
}

// Gallery Modal functionality
function openGalleryModal(imgElement) {
    console.log('openGalleryModal called with:', imgElement);
    
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('galleryModalImage');
    const modalCaption = document.getElementById('galleryModalCaption');
    
    console.log('Modal elements found:', { modal, modalImage, modalCaption });
    
    if (!modal || !modalImage || !modalCaption) {
        console.error('Gallery modal elements not found!');
        return;
    }
    
    // Set image source and alt text
    modalImage.src = imgElement.src;
    modalImage.alt = imgElement.alt;
    
    // Set caption based on alt text
    modalCaption.textContent = imgElement.alt;
    
    console.log('Setting modal image src:', imgElement.src);
    console.log('Setting modal caption:', imgElement.alt);
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    console.log('Modal should now be visible');
}

function closeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeGalleryModal();
    }
});

// Calculate days since 2010 and divide by 10 for dynamic counter
function calculateRenovatedFloors() {
    const startDate = new Date('2010-01-01');
    const currentDate = new Date();
    const timeDifference = currentDate - startDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return Math.floor(daysDifference / 10);
}

// Initialize page transitions
function initPageTransitions() {
    const links = document.querySelectorAll('a[href^="#"]');
    const mainEl = document.querySelector('main');
    links.forEach(link => {
        link.addEventListener('click', function() {
            // Subtle effect without transforming the root; avoids breaking position: fixed
            if (!mainEl) return;
            mainEl.style.opacity = '0.98';
            setTimeout(() => {
                mainEl.style.opacity = '1';
            }, 150);
        });
    });
}

// Blog modal functionality
function initBlogModal() {
    // Blog articles data
    window.blogArticles = {
        'winter-care': {
            category: 'Съвети',
            title: 'Как да поддържаме паркета през зимата',
            date: '15 Декември 2024',
            readTime: '5 мин четене',
            content: `
                <p>Зимата е най-трудният сезон за дървените подови настилки във Варна. Високата влажност, температурните промени и солта от обувките могат да навредят на паркета. Ето как да го предпазите и поддържате в отлично състояние през студените месеци.</p>
                
                <h3>Основни проблеми през зимата</h3>
                <p>През зимата паркетът е изложен на няколко основни фактора, които могат да го повредят:</p>
                <ul>
                    <li><strong>Висока влажност</strong> - отоплението в дома създава сух въздух, но външната влажност може да проникне</li>
                    <li><strong>Температурни промени</strong> - разширяване и свиване на дървесината</li>
                    <li><strong>Сол и химикали</strong> - от обувките и почистващите средства</li>
                    <li><strong>Прах и мръсотия</strong> - по-често натрупване поради затворените прозорци</li>
                </ul>

                <h3>Съвети за поддръжка</h3>
                <h4>1. Регулярно почистване</h4>
                <p>Почиствайте паркета поне веднъж седмично с подходящи средства. Използвайте само специализирани почистващи препарати за дървени подове. Избягвайте агресивни химикали и абразивни материали.</p>

                <h4>2. Контрол на влажността</h4>
                <p>Поддържайте стабилна влажност в дома между 40-60%. Използвайте овлажнители или осушители според нуждите. Това ще предотврати разпукване и деформация на паркета.</p>

                <h4>3. Защита от солта</h4>
                <p>Поставете килими пред входовете за улавяне на солта и сняг от обувките. Регулярно почиствайте тези зони, за да предотвратите натрупване на агресивни вещества.</p>

                <h4>4. Температурен режим</h4>
                <p>Избягвайте рязки температурни промени. Не включвайте отоплението на пълна мощност веднага - постепенно увеличавайте температурата.</p>

                <h3>Кога да се обърнете към професионалисти</h3>
                <p>Ако забележите сериозни проблеми като разпукване, деформация или значително влошаване на лака, не се колебайте да се свържете с нас. ТОП ПАРКЕТ ВАРНА предлага професионални услуги за циклене и ремонт на паркет през цялата година.</p>

                <p><strong>Свържете се с нас за безплатен оглед и консултация по телефона 0887726236 или чрез нашата контактна форма.</strong></p>
            `
        },
        'lacquer-trends': {
            category: 'Тенденции',
            title: 'Най-новите тенденции в паркетните лакове',
            date: '10 Декември 2024',
            readTime: '7 мин четене',
            content: `
                <p>Паркетните лакове се развиват постоянно, като новите технологии предлагат по-добра издръжливост, по-бързо съхнене и по-добри екологични характеристики. Като ексклузивен представител на немските лакове Forbo Bonding GmbH за североизточна България, винаги сме в крак с най-новите тенденции.</p>

                <h3>Екологични лакове на водна основа</h3>
                <p>Тенденцията към екологично чисти продукти се засилва и в паркетната индустрия. Новите лакове на водна основа са:</p>
                <ul>
                    <li><strong>Без токсични изпарения</strong> - безопасни за деца и домашни любимци</li>
                    <li><strong>Бързо съхнене</strong> - намалява времето за завършване на проекта</li>
                    <li><strong>Лесно почистване</strong> - не се нуждаят от агресивни разтворители</li>
                    <li><strong>Дълготрайност</strong> - същата издръжливост като традиционните лакове</li>
                </ul>

                <h3>Нови технологии в лакирането</h3>
                <h4>UV-лакове</h4>
                <p>Ултравиолетовите лакове са революция в паркетната индустрия. Те се съхнят мигновено под UV лампи и осигуряват изключителна твърдост и издръжливост.</p>

                <h4>Нано-технологии</h4>
                <p>Новите лакове с нано-частици създават невидима защитна обвивка, която отблъсква водата, мръсотията и UV лъчите. Това значително удължава живота на паркета.</p>

                <h4>Антибактериални свойства</h4>
                <p>Съвременните лакове включват антибактериални добавки, които предотвратяват размножаването на бактерии и гъбички на повърхността на паркета.</p>

                <h3>Цветови тенденции</h3>
                <p>В модерния дизайн се наблюдава завръщане към естествените тонове на дървесината:</p>
                <ul>
                    <li><strong>Матов финиш</strong> - по-естествен и модерен вид</li>
                    <li><strong>Тъмни тонове</strong> - дъб, орех, вишна в по-тъмни нюанси</li>
                    <li><strong>Бели тонове</strong> - бял дъб и ясен за светли интериори</li>
                    <li><strong>Градиентни ефекти</strong> - комбинация от различни тонове</li>
                </ul>

                <h3>Нашите препоръки</h3>
                <p>В ТОП ПАРКЕТ ВАРНА използваме най-новите технологии и материали. Нашите основни продукти включват:</p>
                <ul>
                    <li><strong>DYO полиуретанов лак</strong> - традиционен, но модернизиран</li>
                    <li><strong>Chemiver италиански лак</strong> - най-новите технологии</li>
                    <li><strong>Forbo специализирани продукти</strong> - ексклузивни за региона</li>
                </ul>

                <p><strong>За консултация и избор на най-подходящия лак за вашия паркет, свържете се с нас на 0887726236.</strong></p>
            `
        },
        'parquet-selection': {
            category: 'Ръководство',
            title: 'Съвети за избор на паркет',
            date: '5 Декември 2024',
            readTime: '10 мин четене',
            content: `
                <p>Изборът на правилния паркет е ключов за дълготрайността и красотата на вашия дом. От дървесния вид до начина на полагане - всичко има значение. Ето пълното ръководство за избор на паркет във Варна.</p>

                <h3>Видове паркет</h3>
                <h4>1. Масивен паркет</h4>
                <p>Най-традиционният и качествен тип паркет. Изработен е от една дървесна дъска с дебелина 15-22мм. Подходящ за:</p>
                <ul>
                    <li>Класически интериори</li>
                    <li>Дълготрайност (може да се циклене многократно)</li>
                    <li>Висококачествени проекти</li>
                </ul>

                <h4>2. Паркетна дъска (дюшеме)</h4>
                <p>Състои се от горен слой от масивна дървесина и долни слоеве от иглолистна дървесина. Предимства:</p>
                <ul>
                    <li>По-достъпна цена</li>
                    <li>Стабилност при температурни промени</li>
                    <li>Лесно полагане</li>
                </ul>

                <h4>3. Ламиниран паркет</h4>
                <p>Имитация на дървесина с HDF основа. Подходящ за:</p>
                <ul>
                    <li>Бюджетни проекти</li>
                    <li>Високо натоварени помещения</li>
                    <li>Лесно поддържане</li>
                </ul>

                <h3>Дървесни видове</h3>
                <h4>Дъб</h4>
                <p>Най-популярният избор заради твърдостта и красотата. Подходящ за всички помещения.</p>

                <h4>Ясен</h4>
                <p>Светъл с красива текстура. Идеален за модерни интериори.</p>

                <h4>Орех</h4>
                <p>Тъмен и елегантен. Създава луксозен вид.</p>

                <h4>Екзотични видове</h4>
                <p>Тик, бамбук, дуссия - за уникален вид, но изискват специална грижа.</p>

                <h3>Фактори за избор</h3>
                <h4>Натоварване</h4>
                <p>За високо натоварени помещения изберете по-твърди дървесни видове като дъб или ясен.</p>

                <h4>Влажност</h4>
                <p>За кухни и бани използвайте водоустойчиви варианти или добре обработени с подходящи лакове.</p>

                <h4>Стил на интериора</h4>
                <p>Класически интериори - масивен паркет, модерни - паркетна дъска с матов финиш.</p>

                <h4>Бюджет</h4>
                <p>Масивен паркет е най-скъп, но най-дълготраен. Ламинираният е най-евтин, но с по-кратък живот.</p>

                <h3>Начини на полагане</h3>
                <h4>Класически (елохка)</h4>
                <p>Традиционен начин с дъски под ъгъл 90°. Подходящ за малки помещения.</p>

                <h4>Диагонално</h4>
                <p>Дъските се полагат под ъгъл 45°. Визуално разширява пространството.</p>

                <h4>Херрингбон</h4>
                <p>Класически шаблон с дъски в зигзаг. Създава елегантен вид.</p>

                <h3>Нашите услуги</h3>
                <p>ТОП ПАРКЕТ ВАРНА предлага пълен спектър от услуги:</p>
                <ul>
                    <li>Безплатен оглед и консултация</li>
                    <li>Професионално полагане</li>
                    <li>Циклене и реставрация</li>
                    <li>Лакиране с най-новите технологии</li>
                    <li>2 години гаранция</li>
                </ul>

                <p><strong>За професионална консултация и безплатен оглед, свържете се с нас на 0887726236 или попълнете нашата контактна форма.</strong></p>
            `
        }
    };
}

function openBlogModal(articleId) {
    const modal = document.getElementById('blogModal');
    const article = window.blogArticles[articleId];
    
    if (!article) return;
    
    // Update modal content
    document.getElementById('modalCategory').textContent = article.category;
    document.getElementById('modalTitle').textContent = article.title;
    document.getElementById('modalDate').textContent = article.date;
    document.getElementById('modalReadTime').textContent = article.readTime;
    document.getElementById('modalBody').innerHTML = article.content;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBlogModal() {
    const modal = document.getElementById('blogModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Removed complex forceRepaint functions - root causes are now fixed

// Sticky Contact Button functionality - Clean CSS-only approach
function initStickyContact() {
    const stickyContact = document.getElementById('stickyContact');
    
    if (!stickyContact) {
        console.error('Sticky contact element not found!');
        return;
    }
    
    // Simple initialization - CSS handles the rest
    stickyContact.classList.add('visible');
}

// Call on load
document.addEventListener('DOMContentLoaded', function() {
    initPageTransitions();
    initBlogModal(); // Initialize blog modal functionality
    initStickyContact(); // Initialize sticky contact button
    
    // Removed excessive navigation handling - root causes are now fixed
    
    // Removed excessive reflow spam - the root causes are now fixed
});