/* Apple Liquid Glass - JavaScript Interactions */

(function() {
    'use strict';

    // ============================================
    // THEME SWITCHER - Store & Restore Theme
    // ============================================
    
    class ThemeSwitcher {
        constructor() {
            this.radios = document.querySelectorAll('.switcher__input');
            this.body = document.documentElement;
            this.storageKey = 'apple-glass-theme';
            
            this.init();
        }

        init() {
            this.restoreTheme();
            this.attachListeners();
        }

        restoreTheme() {
            const saved = localStorage.getItem(this.storageKey);
            const preferred = this.getSystemPreference();
            const theme = saved || preferred || 'dark';
            
            this.setTheme(theme);
        }

        getSystemPreference() {
            if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                return 'light';
            }
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
            return 'dark';
        }

        setTheme(theme) {
            const themeMap = {
                'light': '1',
                'dark': '2',
                'dim': '3'
            };
            
            const option = themeMap[theme] || '2';
            this.body.setAttribute('c-option', option);
            
            // Update radio button
            const radio = document.querySelector(`input[value="${theme}"]`);
            if (radio) {
                radio.checked = true;
            }
            
            localStorage.setItem(this.storageKey, theme);
        }

        attachListeners() {
            this.radios.forEach(radio => {
                radio.addEventListener('change', (e) => {
                    this.setTheme(e.target.value);
                    this.triggerTransitionEffect();
                });
            });
        }

        triggerTransitionEffect() {
            // Add transition effect on theme change
            this.body.style.transition = 'background-color 600ms cubic-bezier(1, 0, 0.4, 1)';
            
            setTimeout(() => {
                this.body.style.transition = '';
            }, 600);
        }
    }

    // ============================================
    // PARALLAX SCROLL EFFECT
    // ============================================

    class ParallaxScroll {
        constructor() {
            this.parallaxLayers = document.querySelectorAll('.parallax-layer');
            this.lastScrollY = 0;
            this.init();
        }

        init() {
            window.addEventListener('scroll', () => this.update());
        }

        update() {
            const scrollY = window.scrollY;
            const delta = scrollY - this.lastScrollY;
            
            this.parallaxLayers.forEach((layer, index) => {
                const speed = 0.5 + (index * 0.1);
                const offset = scrollY * speed;
                layer.style.transform = `translateY(${offset}px)`;
            });
            
            this.lastScrollY = scrollY;
        }
    }

    // ============================================
    // INTERACTIVE HOVER EFFECTS
    // ============================================

    class InteractiveElements {
        constructor() {
            this.badges = document.querySelectorAll('.interactive-badge');
            this.cards = document.querySelectorAll('.glass-card');
            this.init();
        }

        init() {
            this.attachBadgeListeners();
            this.attachCardListeners();
        }

        attachBadgeListeners() {
            this.badges.forEach(badge => {
                badge.addEventListener('mouseenter', (e) => {
                    this.createRipple(e);
                });
            });
        }

        attachCardListeners() {
            this.cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    this.handleCardHover(e, card);
                });
                
                card.addEventListener('mouseleave', (e) => {
                    this.resetCardHover(card);
                });
            });
        }

        createRipple(event) {
            const badge = event.target;
            const ripple = document.createElement('span');
            
            const rect = badge.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            // Remove previous ripples
            const oldRipples = badge.querySelectorAll('.ripple');
            oldRipples.forEach(r => r.remove());
            
            badge.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        }

        handleCardHover(event, card) {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            // Subtle light tracking effect
            const moveX = (x - rect.width / 2) * 0.1;
            const moveY = (y - rect.height / 2) * 0.1;
            
            card.style.setProperty('--hover-x', moveX + 'px');
            card.style.setProperty('--hover-y', moveY + 'px');
        }

        resetCardHover(card) {
            card.style.setProperty('--hover-x', '0px');
            card.style.setProperty('--hover-y', '0px');
        }
    }

    // ============================================
    // INTERSECTION OBSERVER - LAZY ANIMATIONS
    // ============================================

    class LazyAnimations {
        constructor() {
            this.containers = document.querySelectorAll('.glass-container');
            this.init();
        }

        init() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            });

            this.containers.forEach(container => {
                container.style.opacity = '0';
                container.style.transform = 'translateY(20px)';
                observer.observe(container);
            });
        }
    }

    // ============================================
    // BUTTON INTERACTIONS
    // ============================================

    class ButtonInteractions {
        constructor() {
            this.buttons = document.querySelectorAll('.glass-button');
            this.init();
        }

        init() {
            this.buttons.forEach(button => {
                button.addEventListener('click', (e) => {
                    this.createPulse(e, button);
                });
            });
        }

        createPulse(event, button) {
            const pulse = document.createElement('span');
            const rect = button.getBoundingClientRect();
            
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            pulse.style.position = 'absolute';
            pulse.style.left = x + 'px';
            pulse.style.top = y + 'px';
            pulse.style.width = '10px';
            pulse.style.height = '10px';
            pulse.style.background = 'currentColor';
            pulse.style.borderRadius = '50%';
            pulse.style.pointerEvents = 'none';
            pulse.style.opacity = '0.6';
            
            pulse.animate([
                {
                    transform: 'scale(1)',
                    opacity: 0.6
                },
                {
                    transform: 'scale(40)',
                    opacity: 0
                }
            ], {
                duration: 600,
                easing: 'cubic-bezier(0.4, 0, 0.6, 1)',
                fill: 'forwards'
            });
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(pulse);
            
            setTimeout(() => pulse.remove(), 600);
        }
    }

    // ============================================
    // MOUSE GLOW EFFECT - Subtle Light Tracking
    // ============================================

    class MouseGlow {
        constructor() {
            this.glow = this.createGlowElement();
            this.active = false;
            this.x = 0;
            this.y = 0;
            this.init();
        }

        createGlowElement() {
            const glow = document.createElement('div');
            glow.style.cssText = `
                position: fixed;
                width: 400px;
                height: 400px;
                pointer-events: none;
                z-index: 1;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(7, 122, 255, 0.15) 0%, transparent 70%);
                filter: blur(40px);
                opacity: 0;
                transition: opacity 600ms cubic-bezier(0.4, 0, 0.2, 1);
            `;
            document.body.appendChild(glow);
            return glow;
        }

        init() {
            // Only show on non-touch devices
            if (!this.isTouchDevice()) {
                document.addEventListener('mousemove', (e) => this.update(e));
                document.addEventListener('mouseenter', () => this.show());
                document.addEventListener('mouseleave', () => this.hide());
            }
        }

        isTouchDevice() {
            return (('ontouchstart' in window) ||
                    (navigator.maxTouchPoints > 0) ||
                    (navigator.msMaxTouchPoints > 0));
        }

        update(event) {
            if (!this.active) return;

            this.x = event.clientX;
            this.y = event.clientY;

            this.glow.style.left = (this.x - 200) + 'px';
            this.glow.style.top = (this.y - 200) + 'px';
        }

        show() {
            this.active = true;
            this.glow.style.opacity = '1';
        }

        hide() {
            this.active = false;
            this.glow.style.opacity = '0';
        }
    }

    // ============================================
    // SCROLL PROGRESS INDICATOR
    // ============================================

    class ScrollProgress {
        constructor() {
            this.init();
        }

        init() {
            window.addEventListener('scroll', () => this.updateProgress());
        }

        updateProgress() {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            
            // This could be used to update a progress bar
            document.documentElement.style.setProperty('--scroll-progress', scrolled + '%');
        }
    }

    // ============================================
    // INTERSECTION OBSERVER - COUNTER ANIMATION
    // ============================================

    class CounterAnimation {
        constructor() {
            this.counters = document.querySelectorAll('[data-count]');
            this.init();
        }

        init() {
            if (this.counters.length === 0) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                        this.animateCounter(entry.target);
                        entry.target.classList.add('counted');
                    }
                });
            }, { threshold: 0.5 });

            this.counters.forEach(counter => observer.observe(counter));
        }

        animateCounter(element) {
            const target = parseInt(element.getAttribute('data-count'));
            const duration = 2000;
            const start = 0;
            const startTime = Date.now();

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const eased = this.easeOutQuad(progress);
                const current = Math.floor(start + (target - start) * eased);
                
                element.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            animate();
        }

        easeOutQuad(t) {
            return t * (2 - t);
        }
    }

    // ============================================
    // FORM INTERACTIONS
    // ============================================

    class FormInteractions {
        constructor() {
            this.form = document.querySelector('form');
            if (this.form) {
                this.init();
            }
        }

        init() {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }

        handleSubmit() {
            const formData = new FormData(this.form);
            // Simulate submission
            const button = this.form.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            button.textContent = 'Enviando...';
            button.disabled = true;

            setTimeout(() => {
                button.textContent = '✓ Enviado!';
                button.style.backgroundColor = 'rgba(52, 199, 89, 0.3)';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.backgroundColor = '';
                    this.form.reset();
                }, 2000);
            }, 1000);
        }
    }

    // ============================================
    // INITIALIZE ALL SYSTEMS
    // ============================================

    function initializeApp() {
        // Initialize theme switcher (MUST be first)
        new ThemeSwitcher();
        
        // Initialize other systems
        new ParallaxScroll();
        new InteractiveElements();
        new LazyAnimations();
        new ButtonInteractions();
        new MouseGlow();
        new ScrollProgress();
        new CounterAnimation();
        new FormInteractions();

        // Add any additional initialization here
        console.log('✓ Apple Liquid Glass design system initialized');
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }

})();
