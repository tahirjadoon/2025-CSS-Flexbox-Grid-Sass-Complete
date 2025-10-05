const toggleNav = {
    selectors: {
        toggleButton: ".nav-toggle-button",
        mobileNav: ".mobile-nav",
        navLinks: ".mobile-nav__item a"
    },

    objects: {
        toggleButton: null,
        mobileNav: null,
        navLinks: []
    },

    initialize() {
        this.objects.toggleButton = jsSiteCore.get(this.selectors.toggleButton);
        this.objects.mobileNav = jsSiteCore.get(this.selectors.mobileNav);
        this.objects.navLinks = jsSiteCore.getAll(this.selectors.navLinks);

        jsSiteCore.registerBackdropTarget(this.objects.mobileNav);

        this.attachToggleButtonClick();
        this.attachNavLinkClicks();
    },

    attachToggleButtonClick() {
        const { toggleButton, mobileNav } = this.objects;
        const backdrop = jsSiteCore.objects.backdrop;

        if (!jsSiteCore.isElement(toggleButton) || !jsSiteCore.isElement(mobileNav)) return;

        toggleButton.addEventListener("click", () => {
        jsSiteCore.setDisplay(backdrop, jsSiteCore.display.block);
        jsSiteCore.setDisplay(mobileNav, jsSiteCore.display.block);
        });
    },

    attachNavLinkClicks() {
        const { navLinks, mobileNav } = this.objects;
        const backdrop = jsSiteCore.objects.backdrop;

        if (!jsSiteCore.isElements(navLinks) || !jsSiteCore.isElement(mobileNav)) return;

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                jsSiteCore.setDisplay(backdrop, jsSiteCore.display.none);
                jsSiteCore.setDisplay(mobileNav, jsSiteCore.display.none);
                // Redirect is preserved naturally
            });
        });
    }
};

toggleNav.initialize();
