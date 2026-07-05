document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. SMART HEADER NAVIGATION
    // ==========================================================================
    const header = document.querySelector('.site-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // ==========================================================================
    // 2. MOBILE MENU HAMBURGER
    // ==========================================================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            // Prevent background scrolling when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // ==========================================================================
    // 3. CUSTOM CURSOR (Desktop Only)
    // ==========================================================================
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');

    if (cursor && cursorDot && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
        });

        // Hover Effect on Interactive Elements
        const interactiveElements = document.querySelectorAll('a, button, .interactive-card, .btn');
        interactiveElements.forEach(elem => {
            elem.addEventListener('mouseenter', () => {
                document.body.classList.add('hover-active');
            });
            elem.addEventListener('mouseleave', () => {
                document.body.classList.remove('hover-active');
            });
        });
    } else {
        // Hide cursor elements on mobile
        if (cursor) cursor.style.display = 'none';
        if (cursorDot) cursorDot.style.display = 'none';
    }

    // ==========================================================================
    // 4. SCROLL REVEAL (Intersection Observer)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Optional: Unobserve after revealing once
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(elem => {
            revealObserver.observe(elem);
        });
    }

    // ==========================================================================
    // 5. PRODUCT TABS FILTER (Only on product catalog page)
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterButtons.length > 0 && productCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Set active class on button
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                productCards.forEach(card => {
                    // Fade out
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, 50);
                        } else {
                            card.style.display = 'none';
                        }
                    }, 300);
                });
            });
        });
    }

    // ==========================================================================
    // 6. PRODUCT DETAIL DRAWER (Only on product catalog page)
    // ==========================================================================
    const drawer = document.getElementById('product-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const drawerCloseBtn = document.getElementById('drawer-close');
    
    if (drawer && drawerOverlay && drawerCloseBtn) {
        // Open Drawer
        productCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Prevent trigger if clicking directly on internal link (if any)
                if (e.target.tagName.toLowerCase() === 'a') return;

                const id = card.getAttribute('data-id');
                const title = card.querySelector('.product-title').textContent;
                const desc = card.getAttribute('data-description');
                const imageSrc = card.querySelector('img').src;
                const category = card.getAttribute('data-category-name');
                const specSizes = card.getAttribute('data-sizes');
                const usage = card.getAttribute('data-usage');

                // Populate drawer content
                document.getElementById('drawer-product-title').textContent = title;
                document.getElementById('drawer-product-desc').textContent = desc;
                document.getElementById('drawer-product-image').src = imageSrc;
                document.getElementById('drawer-product-category').textContent = category;
                document.getElementById('drawer-product-usage').textContent = usage;

                // Populate sizes
                const sizesContainer = document.getElementById('drawer-product-sizes');
                sizesContainer.innerHTML = '';
                if (specSizes) {
                    specSizes.split(',').forEach(size => {
                        const badge = document.createElement('span');
                        badge.className = 'size-badge';
                        badge.textContent = size.trim();
                        sizesContainer.appendChild(badge);
                    });
                }

                // Show drawer
                drawer.classList.add('active');
                drawerOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close Drawer Functions
        const closeDrawer = () => {
            drawer.classList.remove('active');
            drawerOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        drawerCloseBtn.addEventListener('click', closeDrawer);
        drawerOverlay.addEventListener('click', closeDrawer);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && drawer.classList.contains('active')) {
                closeDrawer();
            }
        });
    }
});
