const uiHelper = {
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

  toggleModel(backdrop, modal, show = true, type = this.display.block){
    if(!this.isBackDropAndModal(backdrop, modal)) return;
    const displayType = !show ? this.display.none : (this.display[type] ?? type);
    this.setDisplay(backdrop, displayType);
    this.setDisplay(modal, displayType);
  },

  addClass(el, className) {
    if (this.isElement(el)) el.classList.add(className);
  },
  
  removeClass(el, className) {
    if (this.isElement(el)) el.classList.remove(className);
  },

  isBackDropAndModal(backdrop, modal){
    return this.isElement(backdrop) && this.isElement(modal);
  },

  attachHideModal(el, backdrop, modal){
    if(!this.isElement(el) || !this.isBackDropAndModal(backdrop, modal)) return;
    
    el.addEventListener("click", () => {
        this.toggleModel(backdrop, modal, false, this.display.none);
    });
  },

  attachEventShowModal(el, backdrop, modal){
    if(!this.isElement(el) || !this.isBackDropAndModal(backdrop, modal)) return;

    el.addEventListener("click", () => {
        this.toggleModel(backdrop, modal, true, this.display.block);
    });
  },

  attachEventShowModalWhenPlansClicked(els, backdrop, modal){
    if(!this.isElements(els) || !this.isBackDropAndModal(backdrop, modal)) return;
    els.forEach(el => {
        this.attachEventShowModal(el, backdrop, modal);
    });
  },

  attachRedirectAndHide(el, backdrop, modal, url){
    if(!this.isElement(el) || !this.isBackDropAndModal(backdrop, modal)) return;

    el.addEventListener("click", (e) => {
        e.preventDefault();

        this.toggleModel(backdrop, modal, false, this.display.none);

        if(url){
            setTimeout(() => {
                window.location.href = url;
            }, 500);
        }
    });
  }
};

//const backdrop = document.getElementsByClassName("backdrop")[0];
const backdrop = uiHelper.get(".backdrop");
const modal = uiHelper.get(".modal");
const modalNoButton = uiHelper.get(".modal__action--negative");
const modalYesButton = uiHelper.get("a.modal__action");
const selectPlanButtons = uiHelper.getAll(".plan button")

//show modal
uiHelper.attachEventShowModalWhenPlansClicked(selectPlanButtons, backdrop, modal);

//hide modal when no is clicked or the back drop is clicked
uiHelper.attachHideModal(backdrop, backdrop, modal);
uiHelper.attachHideModal(modalNoButton, backdrop, modal);

//When yes is clicked then redirect and hide model
uiHelper.attachRedirectAndHide(modalYesButton, backdrop, modal, uiHelper.getAttribute(modalYesButton, "href"));

