(function () {
    "use strict";

    /* ------------------------------------------------------------
       1. UNIFIED NAVIGATION & SMOOTH SCROLLING
       (Handles Mobile Menu + Smooth Scroll + Offset in one place)
    ------------------------------------------------------------ */
    const navbar = document.querySelector("#mainNav");
    const toggler = document.querySelector(".nav-toggler");
    const menuWrapper = document.querySelector(".nav-menu-wrapper");

    // --- A. Mobile Menu Toggle (Button Click) ---
    if (toggler && menuWrapper) {
        toggler.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent this click from triggering the document listener below
            menuWrapper.classList.toggle("is-open");
            toggler.classList.toggle("active");
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (menuWrapper.classList.contains("is-open") && 
                !navbar.contains(e.target) && 
                !e.target.closest('.nav-toggler')) {
                
                menuWrapper.classList.remove("is-open");
                toggler.classList.remove("active");
            }
        });
    }

    // --- B. Master Click Listener (Links & Scrolling) ---
    // We use Event Delegation to catch clicks on ANY link (Nav or Buttons)
    document.addEventListener('click', function(e) {
        // 1. Check if the clicked element is a link pointing to an ID (starts with #)
        const anchor = e.target.closest('a[href^="#"]');

        // If it's not a link, or it's just "#", ignore it
        if (!anchor || anchor.getAttribute('href') === '#') return;

        // 2. STOP the browser's default jump
        e.preventDefault();

        // 3. Identify the target section
        const targetId = anchor.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // 4. Close Mobile Menu (if it's currently open)
            if (menuWrapper && menuWrapper.classList.contains("is-open")) {
                menuWrapper.classList.remove("is-open");
                if (toggler) toggler.classList.remove("active");
            }

            // 5. Calculate Position with Offset
            const headerOffset = 80; // Height of your fixed header
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            // 6. Execute Smooth Scroll
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });

    // --- C. Shrink Navbar on Scroll ---
    document.addEventListener("scroll", function () {
        if (!navbar) return;
        if (window.scrollY > 80) {
            navbar.classList.add("navbar-shrink");
        } else {
            navbar.classList.remove("navbar-shrink");
        }
    });


    /* ------------------------------------------------------------
       2. REVIEWS CAROUSEL (SWIPER JS)
    ------------------------------------------------------------ */
    if (document.querySelector('.reviews-swiper')) {
        new Swiper(".reviews-swiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            centeredSlides: true,
            loop: true,
            speed: 500,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                }
            }
        });
    }


    /* ------------------------------------------------------------
       3. BANNER CAROUSEL (Bootstrap 5 Native)
    ------------------------------------------------------------ */
    const heroCarousel = document.querySelector('#heroCarousel');
    if (heroCarousel && typeof bootstrap !== 'undefined') {
        new bootstrap.Carousel(heroCarousel, {
            interval: 3500,
            pause: 'hover',
            touch: true
        });
    }


    /* ------------------------------------------------------------
       4. SCROLL ANIMATIONS (Intersection Observer)
    ------------------------------------------------------------ */
    const treatmentCards = document.querySelectorAll(".treatment-card");

    if (treatmentCards.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        treatmentCards.forEach(card => observer.observe(card));
    }


    /* ------------------------------------------------------------
       5. FOOTER YEAR
    ------------------------------------------------------------ */
    document.addEventListener("DOMContentLoaded", function() {
        const yearSpan = document.getElementById("year");
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    });

})();