// Mobile menu functionality
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar-content')) {
                navLinks.classList.remove('active');
        }
});
// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                });
        });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.9)';
        } else {
                navbar.style.background = 'white';
        }
});
