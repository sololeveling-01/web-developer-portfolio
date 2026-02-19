
// Basic Interaction & Enhanced Backend Simulation
console.log('Script loaded! If you see this, JS is working.');

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
    const form = document.querySelector('form'); // Changed selector to be more robust
    const backendDemo = document.getElementById('backend-demo');
    const messagesList = document.getElementById('messages-list');
    const clearBtn = document.getElementById('clear-db');

    // Helper: Load existing messages from "Database" (LocalStorage)
    function loadMessages() {
        const stored = localStorage.getItem('portfolioMessages');
        const messages = stored ? JSON.parse(stored) : [];

        console.log('Loading messages:', messages); // Debug log

        if (messages.length > 0) {
            backendDemo.style.display = 'block';
            messagesList.innerHTML = messages.map(msg => `
                <li style="background: #fff; padding: 10px; margin-bottom: 5px; border-radius: 5px; border-left: 4px solid #fca311; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <strong>${msg.name}</strong> <span style="font-size: 0.8em; color: gray;">(${msg.email})</span> said:<br>
                    <span style="color: #333; display: block; margin-top: 5px;">${msg.message}</span> 
                    <small style="color: #aaa; display: block; margin-top: 5px;">Sent: ${msg.timestamp}</small>
                </li>
            `).join('');
        } else {
            backendDemo.style.display = 'none';
        }
    }

    // Run on page load
    loadMessages();

    // Handle Form Submit
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Form submitted!'); // Debug log

            const nameInput = document.getElementById('name') || form.querySelector('input[type="text"]');
            const emailInput = document.getElementById('email') || form.querySelector('input[type="email"]');
            const messageInput = document.getElementById('message') || form.querySelector('textarea');
            const sendBtn = form.querySelector('button');

            const name = nameInput.value;
            const email = emailInput.value;
            const message = messageInput.value;

            // UI Feedback: Button changes state
            const originalText = sendBtn ? sendBtn.innerText : "Send";
            if (sendBtn) {
                sendBtn.innerText = "Processing...";
                sendBtn.style.opacity = "0.7";
                sendBtn.disabled = true;
            }

            // Simulate API Network Delay (1 second)
            setTimeout(() => {
                // 1. Create Data Object
                const newMessage = {
                    name: name,
                    email: email,
                    message: message,
                    timestamp: new Date().toLocaleString()
                };

                // 2. Save to "Database" (LocalStorage)
                const stored = localStorage.getItem('portfolioMessages');
                const existing = stored ? JSON.parse(stored) : [];
                existing.unshift(newMessage); // Add new item to TOP of list
                localStorage.setItem('portfolioMessages', JSON.stringify(existing));

                console.log('Saved to DB:', newMessage);

                // 3. Update UI
                alert(`Success! Message saved to backend database.\n\nFrom: ${name}\nTo: Admin Dashboard`);
                form.reset();

                if (sendBtn) {
                    sendBtn.innerText = originalText;
                    sendBtn.style.opacity = "1";
                    sendBtn.disabled = false;
                }

                // 4. Refresh Backend View
                loadMessages();

                // 5. Scroll to show proof
                backendDemo.scrollIntoView({ behavior: 'smooth', block: 'start' });

            }, 1000);
        });
    } else {
        console.error('Form not found!');
    }

    // Clear Database Button
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete all records from the database?')) {
                localStorage.removeItem('portfolioMessages');
                loadMessages();
                alert('Database cleared successfully.');
            }
        });
    }

    // --- Simple Scroll Animations ---
    const reveal = () => {
        const reveals = document.querySelectorAll('.skill-card, .project-card');
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 50; // trigger earlier

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
                reveals[i].style.opacity = "1";
                reveals[i].style.transform = "translateY(0)";
            }
        }
    };

    // Inject animation styles dynamically
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
    reveal(); // Trigger once on load to show initial items
});
