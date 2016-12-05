import { Component } from '@angular/core';
import { WidthUnitType } from '../src/models/enums';
import { GridDataServiceBase } from '../src/services/GridDataService';
import { TestGridDataService } from './TestGridDataService';
export var TestApp = (function () {
    function TestApp() {
        this.colsDef = Array.from({ length: 5 }, function (v, k) {
            return {
                field: k + "",
                label: "Column " + k,
                sortable: true,
                width: 200,
                widthUnit: WidthUnitType.px
            };
        });
    }
    TestApp.decorators = [
        { type: Component, args: [{
                    template: "\n\t<aw-grid [idField]=\"'1'\" [columnsDef]=\"colsDef\" [pageSize]=\"10\"\n\t\t[height]=\"'400px'\">\n\t</aw-grid>\n\t",
                    selector: "test-app",
                    providers: [
                        {
                            provide: GridDataServiceBase,
                            useClass: TestGridDataService
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    TestApp.ctorParameters = [];
    return TestApp;
}());
