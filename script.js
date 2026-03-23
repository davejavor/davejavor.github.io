// Mobile menu functionality
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar-content')) {
            navLinks.classList.remove('active');
        }
    });

    // Close menu when clicking a nav link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
        }
    }
});

// Contact form handling — Formspree
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const button = this.querySelector('button[type="submit"]');
        const formNote = this.querySelector('.form-note');
        const originalText = button.textContent;

        button.textContent = 'Odesílám...';
        button.disabled = true;

        const formData = new FormData(this);

        try {
            const response = await fetch('https://formspree.io/f/xjgangby', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Úspěch
                button.textContent = 'Odesláno ✓';
                button.style.background = 'var(--success)';
                formNote.textContent = 'Zpráva odeslána. Ozvu se do 3 pracovních dnů.';
                formNote.style.color = 'var(--success)';
                this.reset();

                // Reset tlačítka po 4 sekundách
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = '';
                    formNote.textContent = '';
                }, 4000);

            } else {
                // Chyba serveru
                const data = await response.json();
                throw new Error(data?.errors?.[0]?.message || 'Chyba při odesílání');
            }

        } catch (error) {
            button.textContent = 'Chyba při odesílání';
            button.style.background = 'var(--error)';
            formNote.innerHTML = `Nepodařilo se odeslat. Napište přímo na <a href="mailto:davejavor@gmail.com">davejavor@gmail.com</a>`;
            formNote.style.color = 'var(--error)';

            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
            }, 4000);
        }
    });
}

// Add animation on scroll for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-card, .tech-category');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
