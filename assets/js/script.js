document.addEventListener("DOMContentLoaded", function () {

    /* Lucide */
    if (window.lucide) {
        lucide.createIcons();
    }

    /* Mobile menu */
    const toggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("mobile-menu");

    if (toggle && menu) {
        toggle.addEventListener("click", function () {
            const isOpening = menu.classList.contains("hidden");

            menu.classList.toggle("hidden");

            toggle.setAttribute(
                "aria-expanded",
                String(isOpening)
            );
        });

        menu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                menu.classList.add("hidden");

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });
        });
    }

    /* Navbar shadow */
    const navbar = document.getElementById("navbar");

    if (navbar) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 10) {
                navbar.classList.add("nav-shadow");
            } else {
                navbar.classList.remove("nav-shadow");
            }
        });
    }

    /* Scroll reveal */
    const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

    if (revealElements.length > 0) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {
            observer.observe(element);
        });
    }
});

