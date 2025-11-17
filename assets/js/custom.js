(function ($) {

    "use strict";

    /* ------------------------------------------------------------
       NAVBAR COLLAPSE ON LINK CLICK
    ------------------------------------------------------------ */
    $('.navbar-nav .nav-link').on('click', function () {
        $(".navbar-collapse").collapse('hide');
    });


    /* ------------------------------------------------------------
       NAVBAR SHRINK ON SCROLL
    ------------------------------------------------------------ */
    document.addEventListener("scroll", function () {
        const nav = document.getElementById("mainNav");
        if (!nav) return;

        if (window.scrollY > 80) {
            nav.classList.add("navbar-shrink");
        } else {
            nav.classList.remove("navbar-shrink");
        }
    });


    /* ------------------------------------------------------------
       REVIEWS CAROUSEL
    ------------------------------------------------------------ */
    if ($('.reviews-carousel').length) {

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
            onInitialized: reviewsNavResize,
            onResized: reviewsNavResize,
            onTranslated: reviewsNavResize
        });

        function reviewsNavResize() {
            const centerWidth = $('.reviews-carousel .owl-item.active.center').width();

            if (centerWidth && $(window).width() > 480) {
                $('.reviews-carousel .owl-nav').css({ width: centerWidth + 'px' });
            } else {
                $('.reviews-carousel .owl-nav').css({ width: '100%' });
            }
        }

        $(window).on("resize", reviewsNavResize);
        $(document).on("ready", reviewsNavResize);
    }


    /* ------------------------------------------------------------
       BANNER CAROUSEL
    ------------------------------------------------------------ */
    const myCarousel = document.querySelector('#myCarousel');
    if (myCarousel) {
        new bootstrap.Carousel(myCarousel, { interval: 1500 });
    }


    /* ------------------------------------------------------------
       TREATMENT CARDS REVEAL ANIMATION
    ------------------------------------------------------------ */
    const treatmentCards = document.querySelectorAll(".treatment-card");

    if (treatmentCards.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal");
                }
            });
        }, { threshold: 0.2 });

        treatmentCards.forEach(card => observer.observe(card));
    }


    /* ------------------------------------------------------------
       SMOOTH SCROLL FOR INTERNAL ANCHOR LINKS
    ------------------------------------------------------------ */
    $('a[href*="#"]').on('click', function (event) {

        const pathMatch = location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '');
        const hostMatch = location.hostname === this.hostname;

        if (!pathMatch || !hostMatch) return;

        const target = $(this.hash);
        if (!target.length) return;

        event.preventDefault();

        $('html, body').animate({
            scrollTop: target.offset().top - 74
        }, 800);
    });


})(window.jQuery);
