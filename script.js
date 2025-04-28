document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
            // Close mobile menu on link click
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // Animate sections on scroll
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Scroll arrow functionality
    const scrollArrow = document.getElementById('scroll-arrow');

    function updateArrow() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= docHeight - 10) {
            // At bottom
            scrollArrow.classList.remove('down');
            scrollArrow.classList.add('up');
        } else if (scrollTop <= 10) {
            // At top
            scrollArrow.classList.remove('up');
            scrollArrow.classList.add('down');
        } else {
            // In middle, show up arrow
            scrollArrow.classList.remove('down');
            scrollArrow.classList.add('up');
        }
    }

    scrollArrow.addEventListener('click', () => {
        if (scrollArrow.classList.contains('down')) {
            // Scroll down to bottom
            window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
        } else {
            // Scroll up to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    window.addEventListener('scroll', updateArrow);
    updateArrow();

    // Navbar collapse on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});
