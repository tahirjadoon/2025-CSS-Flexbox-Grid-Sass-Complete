const jsFormValidator = {
    selectors: {
        invalidClass: "invalid",
        ariaInvalid: "aria-invalid",
        disabled: "disabled"
    },

    removeInvalidOnLoad(els){
        if(!jsSiteCore.isElements(els)) return;
        els.forEach(el => el.classList.remove(this.selectors.invalidClass));
    },

    validateForm(els) {
        let hasError = false;
        if (!jsSiteCore.isElements(els)) return hasError;

        els.forEach(el => {
        const type = el.type;
        const value = el.value.trim();
        const required = jsSiteCore.hasAttribute(el, 'required');

        jsSiteCore.removeClass(el, this.selectors.invalidClass);
        jsSiteCore.removeAttribute(el, this.selectors.ariaInvalid);

        if (el.disabled) return;

        if (required && type !== 'checkbox' && value === '') {
            jsSiteCore.addClass(el, this.selectors.invalidClass);
            jsSiteCore.setAttribute(el, this.selectors.ariaInvalid, 'true');
            hasError = true;
        }

        if (required && type === 'checkbox' && !el.checked) {
            jsSiteCore.addClass(el, this.selectors.invalidClass);
            jsSiteCore.setAttribute(el, this.selectors.ariaInvalid, 'true');
            hasError = true;
        }

        if (type === 'email' && value !== '' && (!value.includes('@') || !value.includes('.'))) {
            jsSiteCore.addClass(el, this.selectors.invalidClass);
            jsSiteCore.setAttribute(el, this.selectors.ariaInvalid, 'true');
            hasError = true;
        }
        });

        return hasError;
    },

    setupRealtimeValidation(els, form, submitButton){
        
        if (!jsSiteCore.isElements(els) || !form || !submitButton) return;

        const validateAndToggleButton = () => {
            const isValid = form.checkValidity();
            if (isValid) {
                jsSiteCore.removeAttribute(submitButton, this.selectors.disabled);
            } else {
                jsSiteCore.setAttribute(submitButton, this.selectors.disabled, this.selectors.disabled);
            }
        };

        els.forEach(el => {
            el.addEventListener('input', validateAndToggleButton);
            el.addEventListener('change', validateAndToggleButton);
        });

        // Initial check on load
        validateAndToggleButton();

    },

    attachFormSubmitListener(els, form, submitButton){
        if(!jsSiteCore.isElement(form)) return;

        form.addEventListener('submit', event => {
            jsSiteCore.removeAttribute(submitButton, this.selectors.disabled);
            
            if (!form.checkValidity()) {
                jsSiteCore.setAttribute(submitButton, this.selectors.disabled, this.selectors.disabled);
                event.preventDefault(); // block native error popup
            }
            
            const hasError = this.validateForm(els);
            if(hasError){
                jsSiteCore.setAttribute(submitButton, this.selectors.disabled, this.selectors.disabled);
                event.preventDefault();
            }
        });
    }
};
