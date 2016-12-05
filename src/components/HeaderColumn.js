import { Component, Input } from '@angular/core';
import { WidthUnitType } from '../models/enums';
export var HeaderColumn = (function () {
    function HeaderColumn() {
    }
    Object.defineProperty(HeaderColumn.prototype, "colWidth", {
        get: function () {
            return this.model.width
                + (this.model.widthUnit == WidthUnitType.px ? "px" : "%");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderColumn.prototype, "label", {
        get: function () {
            return this.model.label;
        },
        enumerable: true,
        configurable: true
    });
    HeaderColumn.decorators = [
        { type: Component, args: [{
                    templateUrl: "./templates/awgrid_column.html",
                    selector: "[aw-grid-head-col]",
                    host: {
                        '[style.width]': 'colWidth'
                    }
                },] },
    ];
    /** @nocollapse */
    HeaderColumn.ctorParameters = [];
    HeaderColumn.propDecorators = {
        'model': [{ type: Input },],
    };
    return HeaderColumn;
}());
