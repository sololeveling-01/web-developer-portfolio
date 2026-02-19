
// Basic Interaction & Enhanced Backend Simulation
document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling ---
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Backend Simulation Logic ---
    const form = document.getElementById('contact-form');
    const backendDemo = document.getElementById('backend-demo');
    const messagesList = document.getElementById('messages-list');
    const clearBtn = document.getElementById('clear-db');

    // Load existing messages from "Database" (LocalStorage)
    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem('portfolioMessages')) || [];
        if (messages.length > 0) {
            backendDemo.style.display = 'block';
            messagesList.innerHTML = messages.map(msg => `
                <li style="background: #fff; padding: 10px; margin-bottom: 5px; border-radius: 5px; border-left: 4px solid #fca311;">
                    <strong>${msg.name}</strong> (${msg.email}): <br>
                    <span style="color: #555;">${msg.message}</span> <br>
                    <small style="color: #aaa;">Sent: ${msg.timestamp}</small>
                </li>
            `).join('');
        } else {
            backendDemo.style.display = 'none';
        }
    }

    loadMessages(); // Run on page load

    // Handle Form Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Simulate API Saving...
        const sendBtn = form.querySelector('button');
        const originalText = sendBtn.innerText;
        sendBtn.innerText = "Sending to Server...";
        sendBtn.disabled = true;

        setTimeout(() => {
            // Save to "Database"
            const newMessage = {
                name,
                email,
                message,
                timestamp: new Date().toLocaleString()
            };

            const existing = JSON.parse(localStorage.getItem('portfolioMessages')) || [];
            existing.unshift(newMessage); // Add to top
            localStorage.setItem('portfolioMessages', JSON.stringify(existing));

            // UI Feedback
            alert(`Thanks ${name}! Your message has been saved to the database.`);
            form.reset();
            sendBtn.innerText = originalText;
            sendBtn.disabled = false;

            // Update Backend View
            loadMessages();

            // Scroll to backend view to show proof
            backendDemo.scrollIntoView({ behavior: 'smooth' });

        }, 1500); // 1.5s delay to simulate network
    });

    // Clear Database Button
    clearBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear the database?')) {
            localStorage.removeItem('portfolioMessages');
            loadMessages();
            alert('Database cleared!');
        }
    });

    // --- Scroll Animations ---
    const reveal = () => {
        const reveals = document.querySelectorAll('.skill-card, .project-card');
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active'); // Needs CSS keyframe if specific animation desired
                reveals[i].style.opacity = "1";
                reveals[i].style.transform = "translateY(0)";
            }
        }
    };

    // Initial style for animation
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .skill-card, .project-card {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease-out;
        }
    `;
    document.head.appendChild(styleSheet);

    window.addEventListener('scroll', reveal);
    reveal(); // Trigger once on load
});
