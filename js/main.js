(function () {
    "use strict";

    // Loader
    function loader() {
        setTimeout(function () {
            const load = document.getElementById('loader');
            if (load) {
                load.classList.remove('show');
            }
        }, 1);
    }
    loader();

    // WOW.js
    new WOW().init();

    // Back to top button
    window.addEventListener("scroll", function () {
        const btn = document.querySelector(".back-to-top");
        if (window.scrollY > 200) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }
    });

    document.querySelector(".back-to-top").addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Sticky Navbar
    window.addEventListener("scroll", function () {
        const nav = document.querySelector(".navbar");
        if (window.scrollY > 0) {
            nav.classList.add("nav-sticky");
        } else {
            nav.classList.remove("nav-sticky");
        }
    });

    // Smooth scrolling on navbar links
    document.querySelectorAll(".navbar-nav a").forEach(function (link) {
        link.addEventListener("click", function (event) {
            if (link.hash !== "") {
                event.preventDefault();
                const target = document.querySelector(link.hash);
                window.scrollTo({
                    top: target.offsetTop - 45,
                    behavior: "smooth"
                });

                document.querySelectorAll(".navbar-nav .active").forEach(function (active) {
                    active.classList.remove("active");
                });

                link.classList.add("active");
            }
        });
    });

    // Typed.js
    if (document.querySelector('.hero .hero-text h2')) {
        const typed_strings = document.querySelector('.typed-text').textContent;
        const stringsArray = typed_strings.split(", ");
        new Typed('.hero .hero-text h2', {
            strings: stringsArray,
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }

    // Skills animation
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const observer = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) {
                document.querySelectorAll('.progress .progress-bar').forEach(function (bar) {
                    bar.style.width = bar.getAttribute('aria-valuenow') + '%';
                });
            }
        }, { threshold: 0.2 });

        observer.observe(skillsSection);
    }

    // Testimonials carousel (OwlCarousel requires jQuery → cannot convert)
    // NOTE: OwlCarousel works ONLY with jQuery. Vanilla JS version needs Swiper.js or Glide.js

    // Portfolio Filter (Isotope requires jQuery → using vanilla workaround)
    const filterItems = document.querySelectorAll('#portfolio-filter li');
    const portfolioContainer = document.querySelector('.portfolio-container');

    if (filterItems && portfolioContainer) {
        filterItems.forEach(function (item) {
            item.addEventListener('click', function () {
                document.querySelector('#portfolio-filter .filter-active')?.classList.remove('filter-active');
                item.classList.add('filter-active');

                const filter = item.dataset.filter;
                document.querySelectorAll('.portfolio-item').forEach(function (box) {
                    if (filter === "*" || box.classList.contains(filter.substring(1))) {
                        box.style.display = "block";
                    } else {
                        box.style.display = "none";
                    }
                });
            });
        });
    }

})();
