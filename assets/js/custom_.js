(function ($) {

    "use strict";

    /* ------------------------------------------------------------
       NAVBAR COLLAPSE ON LINK CLICK
    ------------------------------------------------------------ */
    document.querySelectorAll('.navbar-nav .nav-link')
        .forEach(link => link.addEventListener('click', () => {
            $(".navbar-collapse").collapse('hide');
        }));

    /* ------------------------------------------------------------
       NAVBAR SHRINK ON SCROLL (debounced)
    ------------------------------------------------------------ */
    const debounce = (fn, delay = 50) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    };

    const nav = document.getElementById("mainNav");

    const handleNavShrink = () => {
        if (!nav) return;
        if (window.scrollY > 80) nav.classList.add("navbar-shrink");
        else nav.classList.remove("navbar-shrink");
    };

    document.addEventListener("scroll", debounce(handleNavShrink, 25));


    /* ------------------------------------------------------------
       LAZY LOAD: REVIEWS CAROUSEL (only when visible)
    ------------------------------------------------------------ */
    const reviewsSection = document.querySelector('.reviews-carousel');

    if (reviewsSection) {
        const loadOwlCarousel = () => {
            $('.reviews-carousel').owlCarousel({
                center: true,
                loop: true,
                nav: true,
                dots: false,
                autoplay: true,
                autoplaySpeed: 300,
                smartSpeed: 500,
                responsive: {
                    0: { nav: true, items: 1 },
                    768: { items: 2, margin: 50 },
                    1280: { items: 3, margin: 60 }
                },
                onInitialized: resizeReviewsNav,
                onResized: resizeReviewsNav,
                onTranslated: resizeReviewsNav
            });
        };

        const resizeReviewsNav = () => {
            const centerWidth = $('.reviews-carousel .owl-item.active.center').width();
            if (centerWidth && window.innerWidth > 480) {
                $('.reviews-carousel .owl-nav').css({ width: centerWidth + 'px' });
            } else {
                $('.reviews-carousel .owl-nav').css({ width: '100%' });
            }
        };

        // Lazy load via intersection observer
        new IntersectionObserver((entries, observer) => {
            if (entries[0].isIntersecting) {
                loadOwlCarousel();
                observer.disconnect();
            }
        }, { threshold: 0.2 }).observe(reviewsSection);
    }


    /* ------------------------------------------------------------
       BANNER CAROUSEL (Bootstrap)
    ------------------------------------------------------------ */
    const heroCarousel = document.querySelector('#myCarousel');
    if (heroCarousel) {
        new bootstrap.Carousel(heroCarousel, { interval: 1500 });
    }


    /* ------------------------------------------------------------
       TREATMENT CARDS ANIMATION (lazy)
    ------------------------------------------------------------ */
    const treatmentCards = document.querySelectorAll(".treatment-card");

    if (treatmentCards.length) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add("reveal");
            });
        }, { threshold: 0.2 });

        treatmentCards.forEach(card => cardObserver.observe(card));
    }


    /* ------------------------------------------------------------
       SMOOTH SCROLL (with -74 offset)
    ------------------------------------------------------------ */
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', (event) => {

            const samePage =
                location.pathname.replace(/^\//, '') === anchor.pathname.replace(/^\//, '')
                && location.hostname === anchor.hostname;

            if (!samePage) return;

            const target = document.querySelector(anchor.hash);
            if (!target) return;

            event.preventDefault();

            const top = target.getBoundingClientRect().top + window.scrollY - 74;

            window.scrollTo({
                top,
                behavior: 'smooth'
            });
        });
    });

})(window.jQuery);
