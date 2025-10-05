const jsSiteCore = {
    display: {
        block: "block",
        none: "none",
        flex: "flex",
        grid: "grid",
        inline: "inline",
        inlineBlock: "inline-block",
        contents: "contents"
    },

    get(selector) {
        const el = document.querySelector(selector);
        if(!el) console.error(`Element not found: ${selector}`);
        return el;
    },

    getAll(selector){
        const els = document.querySelectorAll(selector);
        if(!this.isElements(els)) console.error(`Element not found: ${selector}`);
        return els;
    },

    getAttribute(el, attribute){
        if(!this.isElement(el)) return;
        return el.getAttribute(attribute);
    },

    isElement(el) {
        return el instanceof HTMLElement; //can also do !!el
    },

    isElements(els){
        return els && els.length > 0;
    },

    setDisplay(el, type) {
        if (!this.isElement(el)) return;
        el.style.display = this.display[type] ?? type;
    },

    addClass(el, className) {
        if (this.isElement(el)) el.classList.add(className);
    },
    
    removeClass(el, className) {
        if (this.isElement(el)) el.classList.remove(className);
    },

    backdropTargets: [],

    objects: {
        backdrop: null
    },

    registerBackdropTarget(el) {
        if (this.isElement(el) && !this.backdropTargets.includes(el)) {
            this.backdropTargets.push(el);
        }
    },

    unregisterBackdropTarget(el) {
        this.backdropTargets = this.backdropTargets.filter(t => t !== el);
    },

    attachBackdropClick() {
        if (!this.isElement(this.objects.backdrop)) return;

        this.objects.backdrop.addEventListener("click", () => {
            if(this.backdropTargets && this.backdropTargets.length > 0){
                this.backdropTargets.forEach(target => {
                    this.setDisplay(target, this.display.none);
                });
            }
            this.setDisplay(this.objects.backdrop, this.display.none);
        });
    },

    initialize(){
        this.objects.backdrop = this.get(".backdrop");
        this.attachBackdropClick();
    }
};

jsSiteCore.initialize();