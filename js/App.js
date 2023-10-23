"use strict";

import { HTMLUtils } from "./HTMLUtils.js";

class App {

    constructor() {
        this.scheduler = document.getElementById('scheduler');

        this.gridTablesTemplate = "";
        this.divTables = "";
        this.tables = 15;
        this.gridCategoriesTemplate = "";
        this.divCategories = "";



        this._appendActions();
        this._renderView();
    }

    _renderView() {
        console.log("Render view");

        HTMLUtils.setTablesToOptions("tables", this.tables);
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
            this.app._setTablesOptionsForCategories();
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

    }

    _setTablesOptionsForCategories() {
        HTMLUtils.setTablesToOptions("c1Tables", this.tables);
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

        this.schedulerDatetimeFrom = document.getElementById('schedulerDatetimeFrom');
        this.schedulerDatetimeTo = document.getElementById('schedulerDatetimeTo');

    }

}

export { App }