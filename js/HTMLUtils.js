"use strict";

class HTMLUtils {

    static appendChangeAction(name, func, app) {
        console.debug("appendChangeAction for " + name);
        this.byId(name).addEventListener("change", func);
        this.byId(name).app = app;
    }

    static appendClickAction(name, func, app) {
        console.debug("appendClickAction for " + name);
        this.byId(name).addEventListener("click", func);
        this.byId(name).app = app;
    }

    static byId(name) {
        return document.getElementById(name);
    }

    static setNumericOptions(selectId, maxElements) {
        let selectElement = this.byId(selectId);
        selectElement.innerHTML = "";
        for(let i = 0; i < maxElements; i++) {
            let option = document.createElement("option");
            option.text = (i+1);
            selectElement.add(option, selectElement[i]);
        }
    }
}

export { HTMLUtils }