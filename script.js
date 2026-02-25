// ===== NAVIGATION TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

const navBrand = document.querySelector('.nav-brand h2');
let brandCollapsed = false;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Nav brand: collapse to "RJ" on scroll down, expand to "Ruth Jama" on scroll up
    if (currentScroll > lastScroll && currentScroll > 80 && !brandCollapsed) {
        // Scrolling down - animate to "RJ"
        navBrand.classList.add('shrink');
        setTimeout(() => {
            navBrand.textContent = 'RJ';
            navBrand.classList.remove('shrink');
            navBrand.classList.add('expand');
        }, 200);
        brandCollapsed = true;
    } else if (currentScroll < lastScroll && currentScroll < 80 && brandCollapsed) {
        // Scrolling up near top - animate back to "Ruth Jama"
        navBrand.classList.add('shrink');
        setTimeout(() => {
            navBrand.textContent = 'Ruth Jama';
            navBrand.classList.remove('shrink');
            navBrand.classList.add('expand');
        }, 200);
        brandCollapsed = false;
    }
    
    lastScroll = currentScroll;
});

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe timeline items, contact cards, and other elements
document.querySelectorAll('.timeline-item, .contact-card, .education-card, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== PROGRESS BAR ANIMATION =====
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-bar');
            progressBars.forEach((bar, index) => {
                setTimeout(() => {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = progress + '%';
                }, index * 200); // Stagger animation
            });
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

// Observe all skill categories
document.querySelectorAll('.skill-category').forEach(category => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(20px)';
    category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    // Use main observer for fade in
    observer.observe(category);
    // Use progress observer for bars
    progressObserver.observe(category);
});

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offset = 80; // Offset for fixed navbar
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== TYPING EFFECT FOR HERO SUBTITLE =====
const heroSubtitle = document.querySelector('.hero-subtitle');
const originalText = heroSubtitle.textContent;
let charIndex = 0;

function typeWriter() {
    if (charIndex === 0) {
        heroSubtitle.textContent = '';
    }
    
    if (charIndex < originalText.length) {
        heroSubtitle.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect after page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// ===== SKILL CATEGORY HOVER EFFECT =====
const skillCategories = document.querySelectorAll('.skill-category');

skillCategories.forEach(category => {
    category.addEventListener('mouseenter', function() {
        const progressBars = this.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            bar.style.filter = 'brightness(1.1)';
        });
    });
    
    category.addEventListener('mouseleave', function() {
        const progressBars = this.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            bar.style.filter = 'brightness(1)';
        });
    });
});

// ===== PARALLAX EFFECT FOR HERO SECTION =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===== ADD ANIMATION DELAY TO TIMELINE ITEMS =====
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});


// ===== PREVENT SCROLL RESTORATION ON PAGE RELOAD =====
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// ===== PRELOADER (OPTIONAL) =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== CONTACT CARDS CLICK TO COPY =====
const contactCards = document.querySelectorAll('.contact-card');

contactCards.forEach(card => {
    const link = card.querySelector('a');
    if (link) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'A') {
                link.click();
            }
        });
    }
});

// ===== DYNAMIC YEAR IN FOOTER =====
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer p');
if (footerText) {
    footerText.textContent = `© ${currentYear} Ruth Jama. All rights reserved.`;
}

console.log('Portfolio website loaded successfully! 🚀');

