/* ===== THEME SWITCHER ===== */
document.addEventListener('DOMContentLoaded', () => {
    const switcherInputs = document.querySelectorAll('.switcher__input');
    const storageKey = 'theme-preference';

    // Restore saved theme
    const savedTheme = localStorage.getItem(storageKey) || 'dark';
    const radio = document.querySelector(`input[value="${savedTheme}"]`);
    if (radio) {
        radio.checked = true;
    }

    // Handle theme changes
    switcherInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const selectedTheme = e.target.value;
            localStorage.setItem(storageKey, selectedTheme);
        });
    });
});

/* ===== LIQUID GLASS ADVANCED EFFECTS ===== */

// ===== NAVEGAÇÃO ATIVA =====
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    const updateActiveLink = () => {
        let currentSection = '';

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink);
});



// ===== SCROLL PARALLAX LÍQUIDO =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero::before, .hero::after');

    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + index * 0.1;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== ANIMAÇÃO DE NÚMEROS (CONTAGEM) =====
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px',
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.hasAttribute('data-animated')) {
                animateNumber(statNumber);
                statNumber.setAttribute('data-animated', 'true');
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-card').forEach((card) => observer.observe(card));

function animateNumber(element) {
    const finalText = element.textContent;
    const isPercentage = finalText.includes('%');
    const isPlus = finalText.includes('+');
    let finalValue = parseInt(finalText);

    let currentValue = 0;
    const duration = 1500;

    const startTime = Date.now();

    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        currentValue = Math.floor(finalValue * progress);

        let displayText = currentValue.toString();
        if (isPlus) displayText += '+';
        if (isPercentage) displayText += '%';

        element.textContent = displayText;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };

    animate();
}

// ===== EFEITO LIQUID BACKGROUND ANIMATION =====
function animateLiquidBackground() {
    const body = document.querySelector('body');
    let angle = 0;

    setInterval(() => {
        angle += 0.5;
        const x = 50 + 30 * Math.cos(angle * Math.PI / 180);
        const y = 50 + 30 * Math.sin(angle * Math.PI / 180);
        
        body.style.backgroundPosition = `${x}% ${y}%`;
    }, 50);
}

animateLiquidBackground();

// ===== SCROLL SUAVE (FALLBACK) =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});



// ===== DETECÇÃO DE PREFERÊNCIA DE CORES (DARK MODE) =====
const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)');

const applyDarkMode = (isDark) => {
    if (isDark.matches) {
        document.documentElement.style.setProperty('--bg-primary', '#0a0e27');
        document.documentElement.style.setProperty('--text-dark', '#e0e0e0');
    }
};

applyDarkMode(darkModePreference);
darkModePreference.addEventListener('change', applyDarkMode);

// ===== INTERSECTION OBSERVER PARA ANIMAÇÕES =====
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px' });

document.querySelectorAll('section').forEach((section) => {
    if (!section.hasAttribute('data-animated')) {
        section.style.opacity = '0.8';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 600ms cubic-bezier(0.34, 1.56, 0.64, 1)';
        section.setAttribute('data-animated', 'true');
        sectionObserver.observe(section);
    }
});

// ===== PERFORMANCE: DEBOUNCE PARA EVENTOS =====
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

const debouncedScroll = debounce(() => {
    updateActiveLink?.();
}, 50);

window.addEventListener('scroll', debouncedScroll);

// ===== INICIALIZAR TOOLTIPS =====
document.querySelectorAll('[title]').forEach((element) => {
    // Skip social icons
    if (element.classList.contains('social-icon')) return;

    element.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip-liquid';
        tooltip.textContent = e.target.title;
        tooltip.style.cssText = `
            position: fixed;
            background: rgba(94, 179, 255, 0.95);
            color: white;
            padding: 0.75rem 1.2rem;
            border-radius: 12px;
            font-size: 0.85rem;
            z-index: 10000;
            pointer-events: none;
            white-space: nowrap;
            backdrop-filter: blur(15px);
            box-shadow: 0 8px 24px rgba(30, 112, 193, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.2);
            animation: tooltipFade 300ms ease-out;
        `;

        document.body.appendChild(tooltip);

        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 12 + 'px';

        setTimeout(() => tooltip.remove(), 2000);
    });
});

// ===== TOOLTIP ANIMATION =====
const tooltipStyle = document.createElement('style');
tooltipStyle.textContent = `
    @keyframes tooltipFade {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(tooltipStyle);

// ===== RASTREAR SEÇÕES VISUALIZADAS =====
const sectionVisibility = {};

const trackSection = (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            sectionVisibility[sectionId] = sectionVisibility[sectionId] || 0;
            sectionVisibility[sectionId]++;
        }
    });
};

const sectionTracker = new IntersectionObserver(trackSection, { threshold: 0.5 });
document.querySelectorAll('section[id]').forEach((section) => sectionTracker.observe(section));

// ===== CONSOLE BRANDING =====
window.addEventListener('load', () => {
    console.log('%c🍎 Apple Liquid Glass Portfolio Loaded', 'color: #5eb3ff; font-size: 16px; font-weight: bold;');
    console.log('%cDesign: Liquid Glass Glassmorphism | Theme: Dark Mode Premium', 'color: #4da3f4; font-size: 12px;');
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Ripple effect removed
    }
});

// ===== SMOOTH PAGE TRANSITIONS =====
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        document.body.style.transition = 'opacity 300ms ease';
    }
});

