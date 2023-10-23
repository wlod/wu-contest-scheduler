"use strict";

class HTMLUtils {

    static appendChangeAction(name, func, app) {
        this.byId(name).addEventListener("change", func);
        this.byId(name).app = app;
    }

    static byId(name) {
        return document.getElementById(name);
    }

    static setTablesToOptions(selectId, numberOfTables) {
        let selectElement = this.byId(selectId);
        selectElement.innerHTML = "";
        for(let i = 0; i < numberOfTables; i++) {
            let option = document.createElement("option");
            option.text = (i+1);
            selectElement.add(option, selectElement[i]);
        }
    }
}

export { HTMLUtils }