
// Basic Interaction
document.addEventListener('DOMContentLoaded', () => {

    // Smooth Scrolling for navigation
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 60,
                behavior: 'smooth'
            });
        });
    });

    // Form Submission Alert (Mock)
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! This is a demo form.');
        form.reset();
    });

    // Simple Animation on Scroll (Optional Reveal)
    const reveal = () => {
        const reveals = document.querySelectorAll('.skill-card, .project-card');
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            } else {
                reveals[i].classList.remove('active');
            }
        }
    };

    window.addEventListener('scroll', reveal);
});
