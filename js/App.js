"use strict";

import { HTMLUtils } from "./HTMLUtils.js";

class App {

    constructor() {
        this.scheduler = HTMLUtils.byId('scheduler');

        this.gridTablesTemplate = "";
        this.divTables = "";
        this.tables = 15;
        this.gridCategoriesTemplate = "";
        this.divCategories = "";

        this.categoriesCounter = 0;


        this._appendActions();
        this._renderView();
    }

    _renderView() {
        console.log("Render view");

        this._setTablesOptionsForGeneralConfiguration();
        this._setTablesOptionsForCategories();
    }

    _appendActions() {
        HTMLUtils.appendChangeAction("tables", function(e) {
            console.log("Tables value is " + this.value);

            this.app.tables = this.value;
            this.app.divTables = "<div class=\"timer\" style=\"grid-area: timer1\">Event time:<br /><span id=\"schedulerDatetimeFrom\">00:00</span>-<span id=\"schedulerDatetimeTo\">00:00</span></div>";
            this.app.gridTablesTemplate = "timer1 ";

            for(let i = 1; i <= this.value; i++) {
                this.app.gridTablesTemplate += "table" + i + " ";
                this.app.divTables += "<div class=\"table" + i + " table\" style=\"grid-area: table" + i + "\">table<br />" + i + "</div>";
            }

            this.app._updateGridTemplate();
            this.app._updateHTMLTablesAndCategories();
            this.app._setTablesOptionsForCategories();

        }, this);

        /*

        TODO maybe below sections is not necessary

        HTMLUtils.appendChangeAction("categories", function(e) {
            console.log("Categories value is " + this.value);

            this.app.divCategories = "<div class=\"timer\" style=\"grid-area: timer2\">timer cat</div>";
            this.app.gridCategoriesTemplate = "timer2 ";

            for(let i = 1; i <= this.value; i++) {
                this.app.gridCategoriesTemplate += "category" + i + " ";
                this.app.divCategories += "<div class=\"category" + i + " category\" style=\"grid-area: category" + i + "\">category" + i + "</div>";
            }

            this.app._updateGridTemplate();
            this.app._updateHTMLTablesAndCategories();

        }, this);*/



        HTMLUtils.appendChangeAction("datetimeFrom", function(e) {
            console.log("Start event is " + this.value);

            this.app.schedulerDatetimeFrom.innerHTML = this.value;

        }, this);

        HTMLUtils.appendChangeAction("datetimeTo", function(e) {
            console.log("Event end is " + this.value);

            this.app.schedulerDatetimeTo.innerHTML = this.value;
        },this);

        HTMLUtils.appendClickAction("addCategory", function(e) {
            console.log("Added new category");

            var addCategoryButton = HTMLUtils.byId('addCategory');



            // TODO doesnt work - why JS, oh why? - addCategoryButton.after(this.app._getCategoryTemplate());
            this.app.categoriesCounter++;

            addCategoryButton.parentNode.insertBefore(this.app._getCategoryTemplate(this.app.categoriesCounter), addCategoryButton);

        },this);

    }

    _getCategoryTemplate(idCategories) {
        console.debug("_getCategoryTemplate for id " + idCategories);
        const html = String.raw;
        var categoryTemplate = html`

                                        <label for="name">Nazwa:</label>
                                        <input type="text" id="name" name="name"><br />
                                        <label for="description">Opis:</label>
                                        <input type="text" id="description" name="description"><br />
                                        <label for="color">Kolor:</label>
                                        <input type="color" id="color" name="color" value="#ff0000"><br />
                                        <label for="c1DatetimeFrom">Od</label>
                                        <input type="time" id="c1DatetimeFrom" name="c1DatetimeFrom" step="900">
                                        <label for="c1DatetimeTo">Do:</label>
                                        <input type="time" id="c1DatetimeTo" name="c1DatetimeTo" step="900">
                                        <br />
                                        <label for="c1Tables">Liczba stołów:</label>
                                        <!-- TODO -->
                                        <select id="c1Tables" name="tables">
                                        </select>
                                        <br />
                                        <!-- TODO id's to manage -->
                                        <button type="button" id="removeCategory">Usuń</button>
                                        <button type="button" id="appendCategory">Zapisz</button>
                                    `;
        var el = document.createElement('div');
        el.className = "form-category";
        el.id = "form-category" + idCategories;

        el.innerHTML = categoryTemplate;
        return el;

    }

    _setTablesOptionsForGeneralConfiguration() {
        HTMLUtils.setNumericOptions("tables", this.tables);
    }

    _setTablesOptionsForCategories() {
        /* TODO
        HTMLUtils.setNumericOptions("c1Tables", this.tables);
        */
    }

    _updateGridTemplate() {
        this.gridTemplate = "";
        if(this.gridTablesTemplate.length > 0) {
            this.gridTemplate = "'" + this.gridTablesTemplate + "'";
        }
        if(this.gridTemplate.length > 0) {
            this.gridTemplate += "\n";
        }
        if(this.gridCategoriesTemplate.length > 0) {
            this.gridTemplate += "'" + this.gridCategoriesTemplate +"'";
        }
        this.scheduler.style.gridTemplate = this.gridTemplate;
    }

    _updateHTMLTablesAndCategories() {
        this.scheduler.innerHTML = this.divTables + this.divCategories;

        this.schedulerDatetimeFrom = HTMLUtils.byId('schedulerDatetimeFrom');
        this.schedulerDatetimeTo = HTMLUtils.byId('schedulerDatetimeTo');
    }
}

export { App }