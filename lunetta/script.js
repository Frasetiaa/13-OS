
// Parallax Effect for Feature Cards
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.feature-card');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    cards.forEach((card, i) => {
        const speed = (i + 1) * 2;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        card.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('.nav-menu a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(12, 16, 22, 0.95)';
        navbar.style.boxShadow = '0 5px 30px rgba(255, 179, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(12, 16, 22, 0.8)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Nav CTA Button Handler
document.querySelector('.nav-cta').addEventListener('click', () => {
    document.querySelector('#home').scrollIntoView({
        behavior: 'smooth'
    });
});