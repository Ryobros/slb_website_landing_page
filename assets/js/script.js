document.addEventListener("DOMContentLoaded", function () {

    /* Shared footer */
    const footerHost = document.getElementById("site-footer");

    if (footerHost) {
        const currentPath = window.location.pathname || "/";
        const siteRoot = currentPath.includes("/pages/")
            ? currentPath.slice(0, currentPath.indexOf("/pages/") + 1)
            : currentPath.endsWith("/")
                ? currentPath
                : currentPath.replace(/\/[^/]*$/, "/");

        const footerUrl = new URL("components/footer.html", window.location.origin + siteRoot).href;

        const normalizeFooterUrls = function (htmlString) {
            const fragment = document.createElement("div");
            fragment.innerHTML = htmlString;

            fragment.querySelectorAll("[src], [href]").forEach(function (element) {
                const attributeName = element.hasAttribute("src") ? "src" : "href";
                const value = element.getAttribute(attributeName);

                if (!value || /^(https?:|\/\/|mailto:|tel:|#|javascript:)/i.test(value)) {
                    return;
                }

                const resolved = new URL(value, window.location.origin + siteRoot);
                const normalizedValue = resolved.pathname + resolved.search + resolved.hash;
                element.setAttribute(attributeName, normalizedValue);
            });

            return fragment.innerHTML;
        };

        fetch(footerUrl, { cache: "no-store" })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Footer not found");
                }
                return response.text();
            })
            .then(function (html) {
                footerHost.innerHTML = normalizeFooterUrls(html);

                if (window.lucide) {
                    lucide.createIcons();
                }
            })
            .catch(function () {
                footerHost.innerHTML = "";
            });
    }

    /* Portal Akademik routing */
    const portalConfig = {
        productionUrl: "",
        maintenancePage: "system/maintenance.html",
        maintenancePageInPages: "../system/maintenance.html"
    };

    const portalLinks = document.querySelectorAll(
        'a[href*="portal/index.html"], a[href*="system/maintenance.html"]'
    );

    const isLocalEnv = ["localhost", "127.0.0.1"].includes(window.location.hostname);
    const currentPath = window.location.pathname || "";
    const isInPagesFolder = currentPath.includes("/pages/");
    const maintenanceHref = isInPagesFolder
        ? portalConfig.maintenancePageInPages
        : portalConfig.maintenancePage;

    portalLinks.forEach(function (link) {
        const targetHref = (
            portalConfig.productionUrl &&
            !portalConfig.productionUrl.includes("app.website.com")
        )
            ? portalConfig.productionUrl
            : maintenanceHref;

        link.setAttribute(
            "href",
            isLocalEnv ? maintenanceHref : targetHref
        );
    });

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

    /* Theme toggle */
    const body = document.body;
    const themeToggle = document.getElementById("theme-toggle");
    const themeLabel = document.getElementById("theme-label");

    const applyTheme = function (isDark) {
        body.classList.toggle("dark", isDark);
        themeToggle && themeToggle.setAttribute("aria-pressed", String(isDark));

        if (themeLabel) {
            themeLabel.textContent = isDark ? "Light" : "Dark";
        }
    };

    if (themeToggle) {
        const savedTheme = localStorage.getItem("slb-theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initialDark = savedTheme ? savedTheme === "dark" : prefersDark;

        applyTheme(initialDark);

        themeToggle.addEventListener("click", function () {
            const nextDark = !body.classList.contains("dark");
            localStorage.setItem("slb-theme", nextDark ? "dark" : "light");
            applyTheme(nextDark);
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

    /* Smooth anchor scroll without leaving # in the URL */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            const url = new URL(window.location.href);
            url.hash = "";
            history.replaceState(null, "", url.toString());
        });
    });

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

    /* Gallery slider */
    const galleryTrack = document.getElementById("gallery-track");
    const galleryPrev = document.querySelector(".gallery-prev");
    const galleryNext = document.querySelector(".gallery-next");

    if (galleryTrack && galleryPrev && galleryNext) {
        const galleryCards = Array.from(galleryTrack.querySelectorAll(".gallery-card"));
        let activeIndex = 0;

        const getGalleryStep = function () {
            const firstCard = galleryCards[0];

            if (!firstCard) {
                return 0;
            }

            const gap = parseFloat(window.getComputedStyle(galleryTrack).gap || "18");
            return firstCard.getBoundingClientRect().width + gap;
        };

        const syncGalleryPreview = function () {
            galleryCards.forEach(function (card, index) {
                const isCenter = index === activeIndex;
                const isSide = Math.abs(index - activeIndex) === 1;

                card.classList.toggle("is-center", isCenter);
                card.classList.toggle("is-side", isSide);
            });
        };

        const goToSlide = function (index) {
            if (!galleryCards.length) {
                return;
            }

            activeIndex = Math.max(0, Math.min(index, galleryCards.length - 1));
            const targetCard = galleryCards[activeIndex];
            const gap = parseFloat(window.getComputedStyle(galleryTrack).gap || "18");
            const trackPadding = 0;
            const targetLeft = targetCard.offsetLeft - trackPadding - (galleryTrack.clientWidth - targetCard.offsetWidth) / 2 + gap / 2;

            syncGalleryPreview();

            galleryTrack.scrollTo({
                left: targetLeft,
                behavior: "smooth"
            });
        };

        galleryPrev.addEventListener("click", function () {
            goToSlide(activeIndex - 1);
        });

        galleryNext.addEventListener("click", function () {
            goToSlide(activeIndex + 1);
        });

        window.addEventListener("resize", function () {
            goToSlide(activeIndex);
        });

        syncGalleryPreview();
    }

    /* Statistik count-up */
    const statValues = document.querySelectorAll(".stat-value[data-count]");

    if (statValues.length > 0 && "IntersectionObserver" in window) {
        const statsObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    const statsContainer = entry.target;
                    const counters = statsContainer.querySelectorAll(".stat-value[data-count]");

                    counters.forEach(function (counter) {
                        const target = parseInt(counter.dataset.count, 10) || 0;
                        const duration = 1200;
                        const startTime = performance.now();

                        function animate(now) {
                            const progress = Math.min((now - startTime) / duration, 1);
                            const eased = 1 - Math.pow(1 - progress, 3);
                            counter.textContent = Math.floor(target * eased);

                            if (progress < 1) {
                                requestAnimationFrame(animate);
                            } else {
                                counter.textContent = target;
                            }
                        }

                        requestAnimationFrame(animate);
                    });

                    observer.disconnect();
                });
            },
            {
                threshold: 0.35
            }
        );

        const statsContainer = document.querySelector(".stats-container");

        if (statsContainer) {
            statsObserver.observe(statsContainer);
        }
    } else if (statValues.length > 0) {
        statValues.forEach(function (counter) {
            counter.textContent = counter.dataset.count || "0";
        });
    }
});

