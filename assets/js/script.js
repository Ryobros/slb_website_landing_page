document.addEventListener("DOMContentLoaded", function () {

    const getSiteRoot = function () {
        const currentPath = window.location.pathname || "/";
        const nestedIndexes = [
            currentPath.indexOf("/pages/"),
            currentPath.indexOf("/system/"),
            currentPath.indexOf("/program/")
        ].filter(function (index) {
            return index !== -1;
        });

        if (nestedIndexes.length > 0) {
            const firstNestedIndex = Math.min.apply(null, nestedIndexes);

            if (firstNestedIndex === 0) {
                return "/";
            }

            return currentPath.slice(0, firstNestedIndex) + "/";
        }

        return currentPath.endsWith("/")
            ? currentPath
            : currentPath.replace(/\/[^/]*$/, "/");
    };

    const normalizeRelativeUrls = function (htmlString, basePath) {
        const fragment = document.createElement("div");
        fragment.innerHTML = htmlString;

        fragment.querySelectorAll("[src], [href]").forEach(function (element) {
            const attributeName = element.hasAttribute("src") ? "src" : "href";
            const value = element.getAttribute(attributeName);

            if (!value || /^(https?:|\/\/|mailto:|tel:|#|javascript:)/i.test(value)) {
                return;
            }

            const resolved = new URL(value, window.location.origin + basePath);
            const normalizedValue = resolved.pathname + resolved.search + resolved.hash;
            element.setAttribute(attributeName, normalizedValue);
        });

        return fragment.innerHTML;
    };

    /* Shared navbar */
    const navbarHost = document.getElementById("site-navbar");

    if (navbarHost) {
        const siteRoot = getSiteRoot();
        const navbarUrl = new URL("components/navbar.html", window.location.origin + siteRoot).href;

        fetch(navbarUrl, { cache: "no-store" })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Navbar not found");
                }
                return response.text();
            })
            .then(function (html) {
                navbarHost.innerHTML = normalizeRelativeUrls(html, siteRoot);

                if (window.lucide) {
                    lucide.createIcons();
                }

                const toggle = document.getElementById("menu-toggle");
                const menu = document.getElementById("mobile-menu");

                if (toggle && menu) {
                    toggle.addEventListener("click", function () {
                        const isOpening = menu.classList.contains("hidden");

                        menu.classList.toggle("hidden");
                        toggle.setAttribute("aria-expanded", String(isOpening));
                    });

                    menu.querySelectorAll("a").forEach(function (link) {
                        link.addEventListener("click", function () {
                            menu.classList.add("hidden");
                            toggle.setAttribute("aria-expanded", "false");
                        });
                    });
                }

                const profileButton = document.getElementById("profile-menu-button");
                const profileMenu = document.getElementById("profile-menu");

                if (profileButton && profileMenu) {
                    profileButton.addEventListener("click", function (event) {
                        const isOpen = profileButton.getAttribute("aria-expanded") === "true";
                        profileButton.setAttribute("aria-expanded", String(!isOpen));
                        profileMenu.classList.toggle("hidden");
                        event.stopPropagation();
                    });

                    document.addEventListener("click", function (event) {
                        if (!profileButton.contains(event.target) && !profileMenu.contains(event.target)) {
                            profileButton.setAttribute("aria-expanded", "false");
                            profileMenu.classList.add("hidden");
                        }
                    });

                    profileMenu.querySelectorAll("a").forEach(function (link) {
                        link.addEventListener("click", function () {
                            profileButton.setAttribute("aria-expanded", "false");
                            profileMenu.classList.add("hidden");
                        });
                    });
                }

                const programButton = document.getElementById("program-menu-button");
                const programMenu = document.getElementById("program-menu");

                if (programButton && programMenu) {
                    programButton.addEventListener("click", function (event) {
                        const isOpen = programButton.getAttribute("aria-expanded") === "true";
                        programButton.setAttribute("aria-expanded", String(!isOpen));
                        programMenu.classList.toggle("hidden");
                        event.stopPropagation();
                    });

                    document.addEventListener("click", function (event) {
                        if (!programButton.contains(event.target) && !programMenu.contains(event.target)) {
                            programButton.setAttribute("aria-expanded", "false");
                            programMenu.classList.add("hidden");
                        }
                    });

                    programMenu.querySelectorAll("a").forEach(function (link) {
                        link.addEventListener("click", function () {
                            programButton.setAttribute("aria-expanded", "false");
                            programMenu.classList.add("hidden");
                        });
                    });
                }

                const activityButton = document.getElementById("activity-menu-button");
                const activityMenu = document.getElementById("activity-menu");

                if (activityButton && activityMenu) {
                    activityButton.addEventListener("click", function (event) {
                        const isOpen = activityButton.getAttribute("aria-expanded") === "true";
                        activityButton.setAttribute("aria-expanded", String(!isOpen));
                        activityMenu.classList.toggle("hidden");
                        event.stopPropagation();
                    });

                    document.addEventListener("click", function (event) {
                        if (!activityButton.contains(event.target) && !activityMenu.contains(event.target)) {
                            activityButton.setAttribute("aria-expanded", "false");
                            activityMenu.classList.add("hidden");
                        }
                    });

                    activityMenu.querySelectorAll("a").forEach(function (link) {
                        link.addEventListener("click", function () {
                            activityButton.setAttribute("aria-expanded", "false");
                            activityMenu.classList.add("hidden");
                        });
                    });
                }

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
            })
            .catch(function () {
                navbarHost.innerHTML = "";
            });
    }

    /* Shared footer */
    const footerHost = document.getElementById("site-footer");

    if (footerHost) {
        const siteRoot = getSiteRoot();
        const footerUrl = new URL("components/footer.html", window.location.origin + siteRoot).href;

        fetch(footerUrl, { cache: "no-store" })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Footer not found");
                }
                return response.text();
            })
            .then(function (html) {
                footerHost.innerHTML = normalizeRelativeUrls(html, siteRoot);

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

    /* Hero auto carousel */
    const heroSection = document.querySelector(".hero-section");
    const heroSlider = document.querySelector(".hero-slider");
    const heroSlides = document.querySelectorAll(".hero-slide");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;

    if (heroSlider && heroSection && !prefersReducedMotion.matches && !isTouchDevice) {
        const clamp = function (value, min, max) {
            return Math.min(Math.max(value, min), max);
        };

        heroSection.addEventListener("pointermove", function (event) {
            const rect = heroSection.getBoundingClientRect();
            const relativeX = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
            const relativeY = ((event.clientY - rect.top) / rect.height - 0.5) * 14;

            const offsetX = clamp(relativeX, -8, 8);
            const offsetY = clamp(relativeY, -6, 6);

            heroSlider.style.setProperty("--hero-shift-x", `${offsetX}px`);
            heroSlider.style.setProperty("--hero-shift-y", `${offsetY}px`);
        });

        heroSection.addEventListener("pointerleave", function () {
            heroSlider.style.setProperty("--hero-shift-x", "0px");
            heroSlider.style.setProperty("--hero-shift-y", "0px");
        });
    }

    if (heroSlides.length > 1) {
        let heroActiveIndex = 0;

        const showHeroSlide = function (nextIndex) {
            heroSlides.forEach(function (slide, index) {
                slide.classList.toggle("is-active", index === nextIndex);
            });
            heroActiveIndex = nextIndex;
        };

        setInterval(function () {
            const nextIndex = (heroActiveIndex + 1) % heroSlides.length;
            showHeroSlide(nextIndex);
        }, 6000);
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
        let isTransitioning = false;

        const syncGalleryPreview = function () {
            galleryCards.forEach(function (card, index) {
                const isActive = index === activeIndex;
                card.classList.toggle("is-active", isActive);
                card.classList.toggle("is-hidden", !isActive);
                card.classList.remove("is-center", "is-side");
                card.style.opacity = isActive ? "1" : "0";
            });
        };

        const goToSlide = function (index) {
            if (!galleryCards.length || isTransitioning) {
                return;
            }

            isTransitioning = true;
            const previousIndex = activeIndex;
            activeIndex = (index + galleryCards.length) % galleryCards.length;

            galleryCards[previousIndex].style.opacity = "0";
            galleryCards[previousIndex].style.transform = "scale(1.02)";
            galleryCards[previousIndex].classList.remove("is-active");
            galleryCards[previousIndex].classList.add("is-hidden");

            galleryCards[activeIndex].classList.remove("is-hidden");
            galleryCards[activeIndex].classList.add("is-active");
            galleryCards[activeIndex].style.opacity = "0";
            galleryCards[activeIndex].style.transform = "scale(1.05)";

            requestAnimationFrame(function () {
                galleryCards[activeIndex].style.opacity = "1";
                galleryCards[activeIndex].style.transform = "scale(1)";
            });

            setTimeout(function () {
                galleryCards[previousIndex].style.opacity = "";
                galleryCards[previousIndex].style.transform = "";
                galleryCards[previousIndex].classList.remove("is-hidden");
                galleryCards[previousIndex].classList.remove("is-active");
                isTransitioning = false;
            }, 700);
        };

        galleryPrev.addEventListener("click", function () {
            goToSlide(activeIndex - 1);
        });

        galleryNext.addEventListener("click", function () {
            goToSlide(activeIndex + 1);
        });

        syncGalleryPreview();
    }

    const parseCsvLine = function (line) {
        const values = [];
        let current = "";
        let inQuotes = false;

        for (let index = 0; index < line.length; index += 1) {
            const char = line[index];

            if (char === '"') {
                if (inQuotes && line[index + 1] === '"') {
                    current += '"';
                    index += 1;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === "," && !inQuotes) {
                values.push(current.trim());
                current = "";
            } else {
                current += char;
            }
        }

        values.push(current.trim());
        return values;
    };

    const syncStudentCountFromCsv = async function () {
        const studentStatValue = document.querySelector('[data-stat="student-count"]');

        if (!studentStatValue) {
            return;
        }

        const siteRoot = getSiteRoot();
        const studentCsvVersion = `?v=${Date.now()}`;
        const csvUrl = new URL(`assets/data/students_2026_2027_filtered.csv${studentCsvVersion}`, window.location.origin + siteRoot).href;

        try {
            const response = await fetch(csvUrl, { cache: "no-store" });

            if (!response.ok) {
                throw new Error("CSV not found");
            }

            const csvText = await response.text();
            const rows = csvText.split(/\r?\n/).filter(Boolean);

            if (rows.length <= 1) {
                return;
            }

            const headers = parseCsvLine(rows[0]);
            let totalStudents = 0;

            rows.slice(1).forEach(function (line) {
                const values = parseCsvLine(line);
                const row = {};

                headers.forEach(function (header, index) {
                    row[header] = values[index] ?? "";
                });

                if ((row.name || "").trim()) {
                    totalStudents += 1;
                }
            });

            studentStatValue.dataset.count = String(totalStudents);
            studentStatValue.textContent = totalStudents;
        } catch (error) {
            console.warn("Gagal memuat jumlah siswa dari CSV:", error);
        }
    };

    const initializeStatCounterAnimations = function () {
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
    };

    if (document.readyState !== "loading") {
        syncStudentCountFromCsv().finally(function () {
            initializeStatCounterAnimations();
        });
    }

    /* FAQ accordion */
    const faqItems = document.querySelectorAll(".faq-item");

    if (faqItems.length > 0) {
        faqItems.forEach(function (item) {
            const button = item.querySelector(".faq-question");
            const answer = item.querySelector(".faq-answer");
            const icon = item.querySelector(".faq-icon");

            if (!button || !answer || !icon) {
                return;
            }

            const closeItem = function () {
                item.classList.remove("is-open");
                button.setAttribute("aria-expanded", "false");
                answer.style.maxHeight = "0px";
                icon.classList.remove("rotate-180");
            };

            const openItem = function () {
                item.classList.add("is-open");
                button.setAttribute("aria-expanded", "true");
                answer.style.maxHeight = `${answer.scrollHeight}px`;
                icon.classList.add("rotate-180");
            };

            closeItem();

            button.addEventListener("click", function () {
                const isOpen = item.classList.contains("is-open");

                faqItems.forEach(function (otherItem) {
                    const otherButton = otherItem.querySelector(".faq-question");
                    const otherAnswer = otherItem.querySelector(".faq-answer");
                    const otherIcon = otherItem.querySelector(".faq-icon");

                    if (!otherButton || !otherAnswer || !otherIcon) {
                        return;
                    }

                    otherItem.classList.remove("is-open");
                    otherButton.setAttribute("aria-expanded", "false");
                    otherAnswer.style.maxHeight = "0px";
                    otherIcon.classList.remove("rotate-180");
                });

                if (isOpen) {
                    closeItem();
                    return;
                }

                openItem();
            });
        });
    }

    /* Back to top button */
    let scrollTopButton = document.getElementById("scroll-to-top");

    if (!scrollTopButton) {
        scrollTopButton = document.createElement("button");
        scrollTopButton.id = "scroll-to-top";
        scrollTopButton.type = "button";
        scrollTopButton.className = "scroll-to-top";
        scrollTopButton.setAttribute("aria-label", "Kembali ke atas");
        scrollTopButton.innerHTML = '<i data-lucide="arrow-up" class="h-4 w-4"></i>';
        document.body.appendChild(scrollTopButton);
    }

    const toggleScrollTopButton = function () {
        if (!scrollTopButton) {
            return;
        }

        scrollTopButton.classList.toggle("visible", window.scrollY > 420);
    };

    toggleScrollTopButton();
    window.addEventListener("scroll", toggleScrollTopButton, { passive: true });

    scrollTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    if (window.lucide) {
        lucide.createIcons();
    }
});

