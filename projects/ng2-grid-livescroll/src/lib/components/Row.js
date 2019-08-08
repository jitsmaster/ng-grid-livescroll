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
var SelectService_1 = require("../services/SelectService");
var DndService_1 = require("../services/DndService");
var DndModels_1 = require("../models/DndModels");
var Row = (function () {
    function Row(ele, selectService, dndService) {
        this.ele = ele;
        this.selectService = selectService;
        this.dndService = dndService;
    }
    Row.prototype.ngAfterViewInit = function () {
        this.selectService.onRowCreate.emit({
            model: this.model,
            node: this.ele
        });
    };
    Row.prototype.ngOnDestroy = function () {
        this.selectService.onRowDestroy.emit({
            model: this.model,
            node: this.ele
        });
    };
    Row.prototype.onRowClick = function (row, evt) {
        if (evt.ctrlKey) {
            this.selectService.additionalSelect(row);
        }
        else if (evt.shiftKey) {
            this.selectService.endSelect(row);
        }
        else {
            this.selectService.select(row);
        }
    };
    Row.prototype.onDoubleClick = function (row, evt) {
        if (row)
            this.selectService.onDoubleClick.emit(row);
    };
    Row.prototype.onDragStart = function (evt) {
        if (this.dndService.dragDisabled) {
            evt.preventDefault();
            return;
        }
        var dragSourceModel = new DndModels_1.DragSourceModel(this.dndService.dragSourceType, evt, this.model);
        evt.dataTransfer.effectAllowed = "move";
        //bypass firefox not able to drag issue
        evt.dataTransfer.setData("Text", this.model.id);
        this.dndService.onDragStart.emit(dragSourceModel);
    };
    Row.prototype.onDragEnd = function (evt) {
        if (this.dndService.dragDisabled)
            return;
        var dragSourceModel = new DndModels_1.DragSourceModel(this.dndService.dragSourceType, evt, this.model);
        this.dndService.onDragEnd.emit(dragSourceModel);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", GridModels_1.GridRow)
    ], Row.prototype, "model", void 0);
    Row = __decorate([
        core_1.Component({
            template: "\n   <div class=\"td\" awgrid-td *ngFor=\"let cell of model.data\" [model]=\"cell\"\n   \t[rowModel]=\"model\">\n   </div>\n\t",
            selector: "[awgrid-tr]",
            host: {
                'class': 'tr',
                '[class.selected]': 'model.selected',
                '(click)': 'onRowClick(model, $event)',
                '(dblclick)': 'onDoubleClick(model, $event)',
                '[attr.draggable]': "model.draggable",
                '(dragstart)': "onDragStart($event)",
                '(dragEnd)': "onDragEnd($event)"
            }
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, SelectService_1.SelectService,
            DndService_1.DndService])
    ], Row);
    return Row;
}());
exports.Row = Row;
