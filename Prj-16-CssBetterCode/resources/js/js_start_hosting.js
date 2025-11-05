const jsStartHosting = {
    selectors:{
        signupform: ".signup-form",
        inputs: "input, select",
        button: 'button[type="submit"]'
    },

    objects:{
        signupform: null,
        inputs: null,
        button: null
    },

    populateObjects(){
        this.objects.signupform = jsSiteCore.get(this.selectors.signupform);
        this.objects.inputs = jsSiteCore.getAll(this.selectors.inputs);
        this.objects.button = jsSiteCore.get(this.selectors.button);
    },

    initialize(){
        document.addEventListener('DOMContentLoaded', () => {
            this.populateObjects();
            jsFormValidator.setupRealtimeValidation(this.objects.inputs, this.objects.signupform, this.objects.button);
            jsFormValidator.removeInvalidOnLoad(this.objects.inputs);
            jsFormValidator.attachFormSubmitListener(this.objects.inputs, this.objects.signupform, this.objects.button)
        });
        
    }
};

jsStartHosting.initialize();