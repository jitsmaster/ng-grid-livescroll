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
var ColumnResizeService_1 = require("../services/ColumnResizeService");
var ResizerPlaceHolder = (function () {
    function ResizerPlaceHolder(ele, colResizeService) {
        this.ele = ele;
        this.colResizeService = colResizeService;
        this.columnDomNode = ele.nativeElement.parentElement;
    }
    ResizerPlaceHolder.prototype.startColumnResizing = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        this.colResizeService.onColumnResizeStart.emit({
            colDef: this.ColumnDef,
            columnDomNode: this.columnDomNode,
            mouseLeft: evt.pageX
        });
        this.colResizeService.resizingColumn = this.ColumnDef;
    };
    __decorate([
        core_1.Input('resizer'),
        __metadata("design:type", GridModels_1.GridColumnDef)
    ], ResizerPlaceHolder.prototype, "ColumnDef", void 0);
    ResizerPlaceHolder = __decorate([
        core_1.Directive({
            selector: "[resizer]",
            host: {
                '(mousedown)': "startColumnResizing($event)",
            }
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, ColumnResizeService_1.ColumnResizeService])
    ], ResizerPlaceHolder);
    return ResizerPlaceHolder;
}());
exports.ResizerPlaceHolder = ResizerPlaceHolder;
