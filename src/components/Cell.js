import { Component, Input } from '@angular/core';
import { WidthUnitType } from '../models/enums';
export var Cell = (function () {
    function Cell() {
    }
    Object.defineProperty(Cell.prototype, "colWidth", {
        get: function () {
            return this.model.colDef.width
                + (this.model.colDef.widthUnit == WidthUnitType.px ? "px" : "%");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "value", {
        get: function () {
            return this.model.value;
        },
        enumerable: true,
        configurable: true
    });
    Cell.decorators = [
        { type: Component, args: [{
                    templateUrl: "./templates/awgrid_cell.html",
                    selector: "[awgrid-td]",
                    host: {
                        '[style.width]': 'colWidth'
                    }
                },] },
    ];
    /** @nocollapse */
    Cell.ctorParameters = [];
    Cell.propDecorators = {
        'model': [{ type: Input },],
    };
    return Cell;
}());
