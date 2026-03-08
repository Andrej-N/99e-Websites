document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Follower
    const follower = document.getElementById('follower');

    document.addEventListener('mousemove', (e) => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    });

    // Make interactive elements change cursor
    const interactiveElements = document.querySelectorAll('a, button, .toy-card, .category-card, .bestseller-card, .testimonial-card, input');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.classList.add('hover-active');
        });
        el.addEventListener('mouseleave', () => {
            follower.classList.remove('hover-active');
        });
    });

    // Magic Button changing background color randomly
    const magicBtn = document.getElementById('magicBtn');
    const colors = ['#fce38a', '#ff9ff3', '#48dbfb', '#1dd1a1', '#ff6b6b', '#feca57', '#5f27cd'];

    magicBtn.addEventListener('click', () => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.documentElement.style.setProperty('--bg-color', randomColor);
        document.body.style.backgroundColor = 'var(--bg-color)'; // Force application

        // Add wobble animation to button
        magicBtn.style.animation = 'none';
        setTimeout(() => magicBtn.style.animation = 'wobble 0.5s ease-in-out', 10);
    });

    // Add to cart buttons causing confetti and floating text
    const addToCartBtns = document.querySelectorAll('.add-to-cart');

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Get position of click
            const rect = btn.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top;

            createFloatingText("+1 in Cart!", x, y);
            createConfetti(x, y);

            // Button visual feedback
            const originalText = btn.textContent;
            btn.textContent = "Yay! 🎉";
            btn.style.backgroundColor = '#1dd1a1';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = 'var(--secondary)';
            }, 1500);
        });
    });

    function createFloatingText(text, x, y) {
        const floatEl = document.createElement('div');
        floatEl.classList.add('pop-text');
        floatEl.innerText = text;
        floatEl.style.left = x + 'px';
        floatEl.style.top = y + 'px';
        document.body.appendChild(floatEl);

        setTimeout(() => {
            floatEl.remove();
        }, 800);
    }

    function createConfetti(x, y) {
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');

            // Random properties
            confetti.style.left = (x + (Math.random() * 100 - 50)) + 'px';
            confetti.style.top = (y + (Math.random() * 50 - 25)) + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            // Random velocities via CSS variables or just animation adjustments
            const dur = Math.random() * 0.5 + 0.5;
            confetti.style.animationDuration = dur + 's';

            document.body.appendChild(confetti);

            // Cleanup
            setTimeout(() => {
                confetti.remove();
            }, dur * 1000);
        }
    }

    // Scroll reveal animations for new sections
    const revealElements = document.querySelectorAll('.feature-card, .category-card, .bestseller-card, .testimonial-card');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealElements.forEach(el => revealObserver.observe(el));

    // Newsletter form mock submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletterEmail');
            const content = document.querySelector('.newsletter-content');
            const successMsg = document.createElement('div');
            successMsg.className = 'newsletter-success';
            successMsg.textContent = 'You\'re in the Fun Club! 🎉🥳';
            newsletterForm.style.display = 'none';
            content.querySelector('.newsletter-note').style.display = 'none';
            content.appendChild(successMsg);
            // Confetti burst
            const rect = content.getBoundingClientRect();
            createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
        });
    }

    // Explore button scrolls to products
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            document.querySelector('.products').scrollIntoView({ behavior: 'smooth' });
        });
    }
});
