"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GridModels_1 = require("../models/GridModels");
var enums_1 = require("../models/enums");
var SelectService_1 = require("../services/SelectService");
var Cell = (function () {
    function Cell(selectService) {
        this.selectService = selectService;
    }
    Object.defineProperty(Cell.prototype, "minWidth", {
        get: function () {
            if (this.model.colDef.minWidth)
                return this.model.colDef.minWidth
                    + (this.model.colDef.widthUnit == enums_1.WidthUnitType.px ? "px" : "%");
            else
                return this.colWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "colWidth", {
        get: function () {
            if (this.model.colDef.width)
                return this.model.colDef.width
                    + (this.model.colDef.widthUnit == enums_1.WidthUnitType.px ? "px" : "%");
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
    Cell.prototype.onCellClick = function (cell, row, evt) {
        var evtModel = {
            cell: cell,
            row: row,
            domNode: evt.target
        };
        this.selectService.onClick.emit(evtModel);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", GridModels_1.GridCell)
    ], Cell.prototype, "model", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", GridModels_1.GridRow)
    ], Cell.prototype, "rowModel", void 0);
    Cell = __decorate([
        core_1.Component({
            template: "\n   <span [innerHTML]=\"value\">\n   </span>\n\t",
            selector: "[awgrid-td]",
            host: {
                '[style.width]': 'colWidth',
                '[style.minWidth]': 'colWidth',
                '[style.maxWidth]': 'colWidth',
                '(click)': 'onCellClick(model, rowModel, $event)',
            }
        }),
        __metadata("design:paramtypes", [SelectService_1.SelectService])
    ], Cell);
    return Cell;
}());
exports.Cell = Cell;
