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

// Contact form handling (frontend only for now)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Simulate form submission
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.textContent;

        button.textContent = 'Odesílám...';
        button.disabled = true;

        // Simulate a delay
        setTimeout(() => {
            button.textContent = 'Odesláno!';
            button.style.background = '#10b981';

            // Create mailto link as fallback
            const mailtoLink = `mailto:jan@jadelab.cz?subject=Kontakt z webu - ${name}&body=${message}%0D%0A%0D%0AEmail: ${email}`;

            // Show success message
            const formNote = this.querySelector('.form-note');
            formNote.textContent = 'Backend zatím není implementovaný. Otevírám email klienta...';
            formNote.style.color = '#10b981';

            // Open email client
            setTimeout(() => {
                window.location.href = mailtoLink;

                // Reset form after a delay
                setTimeout(() => {
                    this.reset();
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = '';
                    formNote.textContent = 'Zatím funkční jen frontend, backend doplním později';
                    formNote.style.color = '';
                }, 2000);
            }, 1000);
        }, 1000);
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
