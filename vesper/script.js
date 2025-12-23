// // ============================================
// // UTILITY FUNCTIONS
// // ============================================
// const utils = {
//     // Debounce function untuk performance
//     debounce(func, wait = 100) {
//         let timeout;
//         return function executedFunction(...args) {
//             const later = () => {
//                 clearTimeout(timeout);
//                 func(...args);
//             };
//             clearTimeout(timeout);
//             timeout = setTimeout(later, wait);
//         };
//     },

//     // Throttle function untuk scroll events
//     throttle(func, limit = 100) {
//         let inThrottle;
//         return function(...args) {
//             if (!inThrottle) {
//                 func.apply(this, args);
//                 inThrottle = true;
//                 setTimeout(() => inThrottle = false, limit);
//             }
//         };
//     },

//     // Check if element is in viewport
//     isInViewport(element, offset = 0) {
//         const rect = element.getBoundingClientRect();
//         return (
//             rect.top >= -offset &&
//             rect.left >= 0 &&
//             rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
//             rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//         );
//     },

//     // Check if mobile device
//     isMobile() {
//         return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
//     },

//     // Check if touch device
//     isTouchDevice() {
//         return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
//     }
// };

// // ============================================
// // NAVBAR FUNCTIONALITY
// // ============================================
// class Navbar {
//     constructor() {
//         this.navbar = document.querySelector('.navbar');
//         this.navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
//         this.lastScroll = 0;
//         this.init();
//     }

//     init() {
//         this.setupSmoothScroll();
//         this.setupScrollEffects();
//         this.setupActiveHighlight();
//     }

//     setupSmoothScroll() {
//         this.navLinks.forEach(link => {
//             link.addEventListener('click', (e) => {
//                 const href = link.getAttribute('href');
//                 if (href.startsWith('#')) {
//                     e.preventDefault();
//                     const targetId = href.substring(1);
//                     const targetElement = document.getElementById(targetId);
                    
//                     if (targetElement) {
//                         const offsetTop = targetElement.offsetTop - 80;
//                         window.scrollTo({
//                             top: offsetTop,
//                             behavior: 'smooth'
//                         });
//                     }
//                 }
//             });
//         });
//     }

//     setupScrollEffects() {
//         const handleScroll = utils.throttle(() => {
//             const currentScroll = window.pageYOffset;
            
//             // Add/remove shadow
//             if (currentScroll > 50) {
//                 this.navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
//             } else {
//                 this.navbar.style.boxShadow = 'none';
//             }
            
//             this.lastScroll = currentScroll;
//         }, 100);

//         window.addEventListener('scroll', handleScroll, { passive: true });
//     }

//     setupActiveHighlight() {
//         const sections = document.querySelectorAll('section[id]');
        
//         const highlightActive = utils.throttle(() => {
//             const scrollPos = window.scrollY + 200;
            
//             sections.forEach(section => {
//                 const sectionTop = section.offsetTop;
//                 const sectionHeight = section.offsetHeight;
//                 const sectionId = section.id;
                
//                 if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
//                     this.navLinks.forEach(link => {
//                         link.style.opacity = '0.7';
//                         if (link.getAttribute('href') === `#${sectionId}`) {
//                             link.style.opacity = '1';
//                         }
//                     });
//                 }
//             });
//         }, 150);

//         window.addEventListener('scroll', highlightActive, { passive: true });
//     }
// }

// // ============================================
// // CARD INTERACTIONS
// // ============================================
// class CardEffects {
//     constructor() {
//         this.cards = document.querySelectorAll('.card');
//         this.isTouchDevice = utils.isTouchDevice();
//         this.init();
//     }

//     init() {
//         if (!this.isTouchDevice) {
//             this.setupParallaxEffect();
//         }
//         this.setupHoverEffects();
//     }

//     setupParallaxEffect() {
//         this.cards.forEach(card => {
//             card.addEventListener('mousemove', (e) => {
//                 const rect = card.getBoundingClientRect();
//                 const x = e.clientX - rect.left;
//                 const y = e.clientY - rect.top;
                
//                 const centerX = rect.width / 2;
//                 const centerY = rect.height / 2;
                
//                 const rotateX = (y - centerY) / 20;
//                 const rotateY = (centerX - x) / 20;
                
//                 requestAnimationFrame(() => {
//                     card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
//                 });
//             });
            
//             card.addEventListener('mouseleave', () => {
//                 requestAnimationFrame(() => {
//                     card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
//                 });
//             });
//         });
//     }

//     setupHoverEffects() {
//         const iconItems = document.querySelectorAll(
//             '.icon-features-item, .icon-support-item-book, .icon-collaboration-item-forum'
//         );

//         iconItems.forEach(icon => {
//             icon.addEventListener('mouseenter', function() {
//                 this.style.transform = 'scale(1.15) rotate(5deg)';
//             });
            
//             icon.addEventListener('mouseleave', function() {
//                 this.style.transform = 'scale(1) rotate(0deg)';
//             });

//             // Touch support for mobile
//             if (utils.isTouchDevice()) {
//                 icon.addEventListener('touchstart', function() {
//                     this.style.transform = 'scale(1.1)';
//                 }, { passive: true });
                
//                 icon.addEventListener('touchend', function() {
//                     setTimeout(() => {
//                         this.style.transform = 'scale(1)';
//                     }, 200);
//                 }, { passive: true });
//             }
//         });
//     }
// }

// // ============================================
// // SCROLL REVEAL ANIMATIONS
// // ============================================
// class ScrollReveal {
//     constructor() {
//         this.elements = document.querySelectorAll(
//             '.about-section, .features-card, .support-card, .collaboration-card'
//         );
//         this.init();
//     }

//     init() {
//         // Set initial state
//         this.elements.forEach(element => {
//             element.style.opacity = '0';
//             element.style.transform = 'translateY(30px)';
//             element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
//         });

//         // Use Intersection Observer for better performance
//         const observerOptions = {
//             threshold: 0.1,
//             rootMargin: '0px 0px -50px 0px'
//         };

//         const observer = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     entry.target.style.opacity = '1';
//                     entry.target.style.transform = 'translateY(0)';
//                     // Stop observing once animated
//                     observer.unobserve(entry.target);
//                 }
//             });
//         }, observerOptions);

//         this.elements.forEach(element => observer.observe(element));
//     }
// }

// // ============================================
// // RIPPLE EFFECT
// // ============================================
// class RippleEffect {
//     constructor() {
//         this.buttons = document.querySelectorAll('.main-image a, .icon-features-item');
//         this.init();
//     }

//     init() {
//         this.injectStyles();
//         this.setupRipple();
//     }

//     injectStyles() {
//         if (!document.getElementById('ripple-styles')) {
//             const style = document.createElement('style');
//             style.id = 'ripple-styles';
//             style.textContent = `
//                 .ripple {
//                     position: absolute;
//                     border-radius: 50%;
//                     background: rgba(255, 255, 255, 0.6);
//                     transform: scale(0);
//                     animation: ripple-animation 0.6s ease-out;
//                     pointer-events: none;
//                 }
                
//                 @keyframes ripple-animation {
//                     to {
//                         transform: scale(4);
//                         opacity: 0;
//                     }
//                 }
//             `;
//             document.head.appendChild(style);
//         }
//     }

//     setupRipple() {
//         this.buttons.forEach(button => {
//             button.addEventListener('click', (e) => {
//                 const ripple = document.createElement('span');
//                 const rect = button.getBoundingClientRect();
//                 const size = Math.max(rect.width, rect.height);
//                 const x = e.clientX - rect.left - size / 2;
//                 const y = e.clientY - rect.top - size / 2;
                
//                 ripple.style.cssText = `
//                     width: ${size}px;
//                     height: ${size}px;
//                     left: ${x}px;
//                     top: ${y}px;
//                 `;
//                 ripple.className = 'ripple';
                
//                 button.style.position = 'relative';
//                 button.appendChild(ripple);
                
//                 setTimeout(() => ripple.remove(), 600);
//             });
//         });
//     }
// }

// // ============================================
// // PERFORMANCE OPTIMIZATIONS
// // ============================================
// class PerformanceOptimizer {
//     constructor() {
//         this.init();
//     }

//     init() {
//         this.lazyLoadImages();
//         this.optimizeAnimations();
//         this.handleVisibilityChange();
//     }

//     lazyLoadImages() {
//         const images = document.querySelectorAll('img[data-src]');
        
//         if ('IntersectionObserver' in window) {
//             const imageObserver = new IntersectionObserver((entries) => {
//                 entries.forEach(entry => {
//                     if (entry.isIntersecting) {
//                         const img = entry.target;
//                         img.src = img.dataset.src;
//                         img.removeAttribute('data-src');
//                         imageObserver.unobserve(img);
//                     }
//                 });
//             });

//             images.forEach(img => imageObserver.observe(img));
//         } else {
//             // Fallback for older browsers
//             images.forEach(img => {
//                 img.src = img.dataset.src;
//             });
//         }
//     }

//     optimizeAnimations() {
//         // Respect user's motion preferences
//         const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
//         if (prefersReducedMotion.matches) {
//             document.body.style.setProperty('--transition-fast', '0.01ms');
//             document.body.style.setProperty('--transition-base', '0.01ms');
//             document.body.style.setProperty('--transition-slow', '0.01ms');
//         }
//     }

//     handleVisibilityChange() {
//         // Pause animations when tab is not visible
//         document.addEventListener('visibilitychange', () => {
//             if (document.hidden) {
//                 document.body.classList.add('page-hidden');
//             } else {
//                 document.body.classList.remove('page-hidden');
//             }
//         });
//     }
// }

// // ============================================
// // INITIALIZE APP
// // ============================================
// class VesperApp {
//     constructor() {
//         this.init();
//     }

//     init() {
//         // Wait for DOM to be fully loaded
//         if (document.readyState === 'loading') {
//             document.addEventListener('DOMContentLoaded', () => this.setup());
//         } else {
//             this.setup();
//         }
//     }

//     setup() {
//         // Initialize Feather Icons
//         if (typeof feather !== 'undefined') {
//             feather.replace();
//         }

//         // Initialize all modules
//         new Navbar();
//         new CardEffects();
//         new ScrollReveal();
//         new RippleEffect();
//         new PerformanceOptimizer();

//         // Log success
//         console.log('✨ Vesper App initialized successfully!');
//         console.log(`📱 Device: ${utils.isMobile() ? 'Mobile' : 'Desktop'}`);
//         console.log(`👆 Touch: ${utils.isTouchDevice() ? 'Enabled' : 'Disabled'}`);
//     }
// }

// // Start the application
// new VesperApp();