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
var GridReactiveServices_1 = require("../services/GridReactiveServices");
var SortingService_1 = require("../services/SortingService");
var HeaderColumn = (function () {
    function HeaderColumn(gridReactiveService, sortingService) {
        this.gridReactiveService = gridReactiveService;
        this.sortingService = sortingService;
    }
    Object.defineProperty(HeaderColumn.prototype, "minWidth", {
        get: function () {
            if (this.model.minWidth)
                this.model.minWidth
                    + (this.model.widthUnit == enums_1.WidthUnitType.px ? "px" : "%");
            else
                return this.colWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderColumn.prototype, "colWidth", {
        get: function () {
            if (this.model.width)
                return this.model.width
                    + (this.model.widthUnit == enums_1.WidthUnitType.px ? "px" : "%");
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
    HeaderColumn.prototype.sort = function (evt) {
        if (!this.model.sortable) {
            return;
        }
        this.sortingService.sort(this.model);
        this.gridReactiveService.requestData(this.model.field, this.sortingService.sortState.currentState.descending);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", GridModels_1.GridColumnDef)
    ], HeaderColumn.prototype, "model", void 0);
    HeaderColumn = __decorate([
        core_1.Component({
            template: "\n   <span>\n   \t{{label}}\n   </span>\n   <span \n   \tclass=\"sortingSymbol\"\n   \t[class.sort]=\"(sortingService.sortState.model | async).column == model \n   \t\t&& (sortingService.sortState.model | async).sorting\"\n   \t[class.desc]=\"(sortingService.sortState.model | async).column == model \n   \t\t&& (sortingService.sortState.model | async).descending\">\n   \t\t&#10148;\n   </span>\n   <span class=\"resizer\" [resizer]=\"model\"></span>\n\t",
            selector: "[aw-grid-head-col]",
            host: {
                '[style.width]': 'colWidth',
                '[style.minWidth]': 'colWidth',
                '[style.maxWidth]': 'colWidth',
                '(mousedown)': 'sort($event)'
            }
        }),
        __metadata("design:paramtypes", [GridReactiveServices_1.ReactiveGridService,
            SortingService_1.SortingService])
    ], HeaderColumn);
    return HeaderColumn;
}());
exports.HeaderColumn = HeaderColumn;
