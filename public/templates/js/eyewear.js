// Language toggle (EN/SR)
let currentLang = 'en';
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'sr' : 'en';
    const btn = document.getElementById('langToggle');
    btn.textContent = currentLang === 'en' ? 'SR \u{1F1F7}\u{1F1F8}' : 'EN \u{1F1EC}\u{1F1E7}';
    document.querySelectorAll('[data-' + currentLang + ']').forEach(el => {
        const val = el.getAttribute('data-' + currentLang);
        if (val) {
            if (val.includes('<br>')) {
                el.innerHTML = val;
            } else {
                el.textContent = val;
            }
        }
    });
    // Handle hero button arrow separately
    const heroBtn = document.querySelector('.hero-btn');
    if (heroBtn) {
        const arrow = heroBtn.querySelector('.arrow');
        const text = currentLang === 'en' ? 'Explore Collection ' : 'Istražite Kolekciju ';
        heroBtn.innerHTML = text;
        if (arrow) heroBtn.appendChild(arrow);
        else {
            const span = document.createElement('span');
            span.className = 'arrow';
            span.innerHTML = '&rarr;';
            heroBtn.appendChild(span);
        }
    }
}

// LOOQ Eyewear - Fun Interactive JS

// Custom cursor
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
});

function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
    requestAnimationFrame(animateRing);
}
animateRing();

// Scale cursor on hover over interactive elements
document.querySelectorAll('a, button, .product-card, .visit-card, .filter-tab').forEach(el => {
    el.addEventListener('mouseenter', () => {
        dot.style.transform += ' scale(2)';
        ring.style.width = '60px';
        ring.style.height = '60px';
    });
    el.addEventListener('mouseleave', () => {
        ring.style.width = '40px';
        ring.style.height = '40px';
    });
});

// Hide cursor on touch devices
if ('ontouchstart' in window) {
    dot.style.display = 'none';
    ring.style.display = 'none';
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

// Product filter tabs
const tabs = document.querySelectorAll('.filter-tab');
const cards = document.querySelectorAll('.product-card');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.filter;

        cards.forEach(card => {
            const match = filter === 'all' || card.dataset.category === filter;
            card.style.transition = 'opacity 0.3s, transform 0.3s';
            if (match) {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
                card.style.display = '';
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => { card.style.display = 'none'; }, 300);
            }
        });
    });
});

// Counter animation for feature numbers
function animateNum(el, target, duration = 1800) {
    const start = performance.now();
    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

const featureNums = document.querySelectorAll('.feature-num');
const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            featureNums.forEach(el => {
                animateNum(el, parseInt(el.dataset.target));
            });
            featureObserver.disconnect();
        }
    });
}, { threshold: 0.3 });
featureObserver.observe(document.querySelector('.features-grid'));

// Tilt effect on product cards
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-8px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateY(0) rotateX(0)';
    });
});
