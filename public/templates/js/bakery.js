// Meel Bakery - Warm Elegant JS

// Language toggle (EN/SR)
let currentLang = 'en';
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'sr' : 'en';
    const btn = document.getElementById('langToggle');
    btn.textContent = currentLang === 'en' ? 'SR \u{1F1F7}\u{1F1F8}' : 'EN \u{1F1EC}\u{1F1E7}';
    const navOrder = document.querySelector('.nav-order');
    if (navOrder) navOrder.textContent = currentLang === 'en' ? 'Order Now' : 'Poručite';
    document.querySelectorAll('[data-' + currentLang + ']').forEach(el => {
        const val = el.getAttribute('data-' + currentLang);
        if (val) el.textContent = val;
    });
    // Re-check open status in new language
    updateOpenStatus();
}

// Mobile nav toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
mobileToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Open/Closed status
function updateOpenStatus() {
    const badge = document.getElementById('openStatus');
    const now = new Date();
    const day = now.getDay();
    const h = now.getHours();
    const m = now.getMinutes();
    const time = h + m / 60;

    let isOpen = false;
    if (day >= 1 && day <= 5) isOpen = time >= 6.5 && time < 18;
    else if (day === 6) isOpen = time >= 7 && time < 16;
    else if (day === 0) isOpen = time >= 8 && time < 14;

    badge.textContent = isOpen
        ? (currentLang === 'sr' ? 'Otvoreno' : 'Open Now')
        : (currentLang === 'sr' ? 'Trenutno Zatvoreno' : 'Currently Closed');
    badge.style.background = isOpen ? '#dcfce7' : '#fee2e2';
    badge.style.color = isOpen ? '#166534' : '#991b1b';
}
updateOpenStatus();
setInterval(updateOpenStatus, 60000);

// Menu tabs
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCats = document.querySelectorAll('.menu-category');

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        menuTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.tab;
        menuCats.forEach(cat => {
            cat.classList.remove('active');
            if (cat.id === 'tab-' + target) cat.classList.add('active');
        });
        // Re-trigger animations for newly visible items
        document.querySelectorAll('.menu-category.active .anim').forEach((el, i) => {
            el.classList.remove('show');
            setTimeout(() => el.classList.add('show'), i * 80);
        });
    });
});

// Review carousel
const track = document.getElementById('reviewTrack');
const slides = track.querySelectorAll('.review-slide');
const dotsContainer = document.getElementById('carouselDots');
let currentSlide = 0;

// Create dots
slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
});

function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === index);
    });
}

document.getElementById('prevBtn').addEventListener('click', () => {
    goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
});
document.getElementById('nextBtn').addEventListener('click', () => {
    goToSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
});

// Auto-advance carousel
let autoPlay = setInterval(() => {
    goToSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
}, 5000);

// Pause on hover
track.parentElement.addEventListener('mouseenter', () => clearInterval(autoPlay));
track.parentElement.addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => {
        goToSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
    }, 5000);
});

// Scroll animations
const animEls = document.querySelectorAll('.anim');
const animObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('show'), i * 80);
            animObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
animEls.forEach(el => animObserver.observe(el));

// Order form
const orderForm = document.getElementById('orderForm');
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    orderForm.style.display = 'none';
    document.getElementById('orderSuccess').style.display = 'block';
});
