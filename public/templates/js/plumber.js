// FlowFix Plumbing - Modern Minimalistic JS

// Language toggle (EN/SR)
let currentLang = 'en';
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'sr' : 'en';
    const btn = document.getElementById('langToggle');
    btn.textContent = currentLang === 'en' ? 'SR \u{1F1F7}\u{1F1F8}' : 'EN \u{1F1EC}\u{1F1E7}';
    const navCta = document.getElementById('navCta');
    if (navCta) navCta.textContent = currentLang === 'en' ? 'Get a Quote' : 'Zatražite Ponudu';
    document.querySelectorAll('[data-' + currentLang + ']').forEach(el => {
        const val = el.getAttribute('data-' + currentLang);
        if (val) el.textContent = val;
    });
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Scroll fade-in animation
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
fadeEls.forEach(el => observer.observe(el));

// Counter animation for hero stats
function animateCounter(el, target, suffix = '', duration = 1500) {
    const isDecimal = target % 1 !== 0;
    const start = performance.now();
    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;
        el.textContent = isDecimal ? current.toFixed(1) + suffix : Math.floor(current) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(document.getElementById('statYears'), 12, '+');
            animateCounter(document.getElementById('statJobs'), 2400, '+');
            animateCounter(document.getElementById('statRating'), 4.9, '');
            heroObserver.disconnect();
        }
    });
}, { threshold: 0.3 });
heroObserver.observe(document.querySelector('.hero-visual'));

// Form submission
const quoteForm = document.getElementById('quoteForm');
quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    quoteForm.style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
});
