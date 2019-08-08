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
var enums_1 = require("../models/enums");
var ColumnResizeService_1 = require("../services/ColumnResizeService");
var ColumnResizer = (function () {
    function ColumnResizer(ele, colResizeService) {
        var _this = this;
        this.ele = ele;
        this.colResizeService = colResizeService;
        this.onColumnResizing = new core_1.EventEmitter();
        this.columnToResize = null;
        colResizeService.onColumnResizeStart.subscribe(function (colDef) {
            _this.onColumnResizing.emit(colDef);
            _this.columnToResize = colDef;
            _this.lastMouseLeft = colDef.mouseLeft;
        });
    }
    ColumnResizer.prototype.onColumnHeadersMouseMove = function (evt) {
        if (!this.columnToResize)
            return;
        evt.stopPropagation();
        evt.preventDefault();
        var mouseLeft = evt.pageX;
        var widthDiff = mouseLeft - this.lastMouseLeft;
        this.lastMouseLeft = mouseLeft;
        if (!!this.columnToResize) {
            //use mouse position diffing to get the width
            this.columnToResize.colDef.width = Math.max(this.columnToResize.colDef.width + widthDiff, this.columnToResize.colDef.minWidth);
            this.columnToResize.colDef.widthUnit = enums_1.WidthUnitType.px;
        }
    };
    ColumnResizer.prototype.confirmColumnResizing = function (evt) {
        if (!this.columnToResize)
            return;
        evt.stopPropagation();
        evt.preventDefault();
        this.columnToResize = null;
        this.onColumnResizing.emit(null);
        this.colResizeService.onColumnResizeEnd.emit(true);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ColumnResizer.prototype, "onColumnResizing", void 0);
    ColumnResizer = __decorate([
        core_1.Directive({
            selector: "[column-resizer]",
            host: {
                '(document:mousemove)': "onColumnHeadersMouseMove($event)",
                '(document:mouseup)': "confirmColumnResizing($event)"
            }
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, ColumnResizeService_1.ColumnResizeService])
    ], ColumnResizer);
    return ColumnResizer;
}());
exports.ColumnResizer = ColumnResizer;
