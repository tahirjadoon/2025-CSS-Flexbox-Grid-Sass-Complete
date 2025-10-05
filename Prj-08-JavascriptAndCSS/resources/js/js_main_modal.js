const jsModal = {

  selectors: {
    modal: ".modal",
    modalNoButton: ".modal__action--negative",
    modalYesButton: "a.modal__action",
    selectPlanButtons: ".plan button"
  },

  objects: {
    modal: null,
    modalNoButton: null,
    modalYesButton: null,
    selectPlanButtons: []
  },

  initialize() {
    this.objects.modal = jsSiteCore.get(this.selectors.modal);
    this.objects.modalNoButton = jsSiteCore.get(this.selectors.modalNoButton);
    this.objects.modalYesButton = jsSiteCore.get(this.selectors.modalYesButton);
    this.objects.selectPlanButtons = jsSiteCore.getAll(this.selectors.selectPlanButtons);

    jsSiteCore.registerBackdropTarget(this.objects.modal);
    this.attachShowModalEvents();
    this.attachHideModalEvents();
    this.attachRedirectAndHide();
  },

  attachShowModalEvents() {
    const { selectPlanButtons, modal } = this.objects;
    const backdrop = jsSiteCore.objects.backdrop;

    if (!jsSiteCore.isElements(selectPlanButtons) || !jsSiteCore.isElement(modal)) return;

    selectPlanButtons.forEach(button => {
      button.addEventListener("click", () => {
        //this.toggleModal(backdrop, modal, true, jsSiteCore.display.block);
        this.toggleModalWithClass(backdrop, modal, true);
      });
    });
  },

  attachHideModalEvents() {
    const { modalNoButton, modal } = this.objects;
    const backdrop = jsSiteCore.objects.backdrop;

    if (!jsSiteCore.isElement(modalNoButton) || !jsSiteCore.isElement(modal)) return;

    modalNoButton.addEventListener("click", () => {
      //this.toggleModal(backdrop, modal, false, jsSiteCore.display.none);
      this.toggleModalWithClass(backdrop, modal, false);
    });
  },

  attachRedirectAndHide() {
    const { modalYesButton, modal } = this.objects;
    const backdrop = jsSiteCore.objects.backdrop;

    if (!jsSiteCore.isElement(modalYesButton) || !jsSiteCore.isElement(modal)) return;

    modalYesButton.addEventListener("click", e => {
      e.preventDefault();

      //this.toggleModal(backdrop, modal, false, jsSiteCore.display.none);
      this.toggleModalWithClass(backdrop, modal, false);

      const url = jsSiteCore.getAttribute(modalYesButton, "href");
      if (url) {
        setTimeout(() => {
          window.location.href = url;
        }, 500);
      }
    });
  },

  toggleModal(backdrop, modal, show = true, type = jsSiteCore.display.block){
    if(!this.isBackDropAndModal(backdrop, modal)) return;
    const displayType = !show ? jsSiteCore.display.none : (jsSiteCore.display[type] ?? type);
    jsSiteCore.setDisplay(backdrop, displayType);
    jsSiteCore.setDisplay(modal, displayType);
  },

  toggleModalWithClass(backdrop, modal, show = true){
    if(!this.isBackDropAndModal(backdrop, modal)) return;
    if(show){
      jsSiteCore.addClass(backdrop, jsSiteCore.display.openClass);
      jsSiteCore.addClass(modal, jsSiteCore.display.openClass);
    }
    else{
      jsSiteCore.removeClass(backdrop, jsSiteCore.display.openClass);
      jsSiteCore.removeClass(modal, jsSiteCore.display.openClass);
    }
  },

  isBackDropAndModal(backdrop, modal){
    return jsSiteCore.isElement(backdrop) && jsSiteCore.isElement(modal);
  }
};

jsModal.initialize();

