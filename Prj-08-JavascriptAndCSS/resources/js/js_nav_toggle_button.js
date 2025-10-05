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
            //jsSiteCore.setDisplay(backdrop, jsSiteCore.display.block);
            //jsSiteCore.setDisplay(mobileNav, jsSiteCore.display.block);
            this.toggleModalWithClass(backdrop, mobileNav, true);
        });
    },

    attachNavLinkClicks() {
        const { navLinks, mobileNav } = this.objects;
        const backdrop = jsSiteCore.objects.backdrop;

        if (!jsSiteCore.isElements(navLinks) || !jsSiteCore.isElement(mobileNav)) return;

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                //jsSiteCore.setDisplay(backdrop, jsSiteCore.display.none);
                //jsSiteCore.setDisplay(mobileNav, jsSiteCore.display.none);
                this.toggleModalWithClass(backdrop, mobileNav, false);
                // Redirect is preserved naturally
            });
        });
    }, 

    toggleModalWithClass(backdrop, mobileNav, show = true){
        if(!this.isBackDropAndMobileNav(backdrop, mobileNav)) return;
        if(show){
            jsSiteCore.addClass(backdrop, jsSiteCore.display.openClass);
            jsSiteCore.addClass(mobileNav, jsSiteCore.display.openClass);
        }
        else{
            jsSiteCore.removeClass(backdrop, jsSiteCore.display.openClass);
            jsSiteCore.removeClass(mobileNav, jsSiteCore.display.openClass);
        }
    },

    isBackDropAndMobileNav(backdrop, mobileNav){
        return jsSiteCore.isElement(backdrop) && jsSiteCore.isElement(mobileNav);
    }
};

toggleNav.initialize();
