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
var DndModels_1 = require("../models/DndModels");
var GridReactiveServices_1 = require("../services/GridReactiveServices");
var DndService_1 = require("../services/DndService");
var GridDropTarget = (function () {
    function GridDropTarget(ele, render, dataService, dndService) {
        this.ele = ele;
        this.render = render;
        this.dataService = dataService;
        this.dndService = dndService;
        this._disabled = true;
        this.onDisabledToggle = new core_1.EventEmitter();
    }
    Object.defineProperty(GridDropTarget.prototype, "acceptTypes", {
        get: function () {
            return this.dndService.allowedDragSourceTypes;
        },
        set: function (val) {
            this.dndService.allowedDragSourceTypes = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridDropTarget.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (val) {
            this._disabled = val;
            this.dataService.allowDrag = !val;
            this.onDisabledToggle.emit(val);
        },
        enumerable: true,
        configurable: true
    });
    GridDropTarget.prototype.allowDragOver = function () {
        var _this = this;
        return !!this.acceptTypes.find(function (item) { return item == _this.dndService.dragSourceType; });
    };
    GridDropTarget.prototype.onDragOver = function (evt) {
        if (this.disabled)
            return;
        if (!this.allowDragOver())
            return;
        // evt.dataTransfer.dropEffect = this.isCopy ? "copy" : "move";
        evt.dataTransfer.dropEffect = "move";
        //add drop target marker, since it is a Directive with dom access
        this.render.setElementClass(this.ele.nativeElement, "dropTargetOn", true);
        //get position of the mouse cursor relative to the drop box
        var relativePosition = {
            x: evt.offsetX,
            y: evt.offsetY
        };
        var boxCoords = new DndModels_1.BoxCoords(this.ele.nativeElement);
        //todo: per item gravity, right now just append to top
        var gravity = {
            horizontalPercentage: 0.1,
            verticalPercentage: 0.1
        };
        this.dndService.onDragOver.next(new DndModels_1.DropTargetModel(this.ele.nativeElement, gravity, evt, this.dndService.dragState));
    };
    GridDropTarget.prototype.onDragLeave = function (evt) {
        if (this.disabled)
            return;
        if (!this.allowDragOver())
            return;
        this.render.setElementClass(this.ele.nativeElement, "dropTargetOn", false);
        this.dndService.onDragOff.next(new DndModels_1.DropTargetModel(this.ele.nativeElement, null, evt, this.dndService.dragState));
    };
    GridDropTarget.prototype.onDrop = function (evt) {
        if (this.disabled)
            return;
        this.onDragLeave(evt);
        if (!this.allowDragOver())
            return;
        evt.preventDefault();
        evt.dataTransfer.dropEffect = "move";
        //get position of the mouse cursor relative to the drop box
        var relativePosition = {
            x: evt.offsetX,
            y: evt.offsetY
        };
        var boxCoords = new DndModels_1.BoxCoords(this.ele.nativeElement);
        //todo: per item gravity, right now just append to top
        var gravity = {
            horizontalPercentage: 0.1,
            verticalPercentage: 0.1
        };
        //update data service to add the dropped in item right on top
        //this will destroy the pagination, since it will make the first page fatter.
        this.dataService.pageServices[0].addRows(this.dndService.dragState);
        this.dndService.onDrop.next(new DndModels_1.DropTargetModel(this.ele.nativeElement, gravity, evt, this.dndService.dragState));
    };
    __decorate([
        core_1.Input('grid-droptarget'),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], GridDropTarget.prototype, "acceptTypes", null);
    __decorate([
        core_1.Input('drop-disabled'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], GridDropTarget.prototype, "disabled", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GridDropTarget.prototype, "onDisabledToggle", void 0);
    GridDropTarget = __decorate([
        core_1.Directive({
            selector: '[grid-droptarget]',
            host: {
                '(dragover)': 'onDragOver($event)',
                '(dragleave)': 'onDragLeave($event)',
                '(drop)': 'onDrop($event)'
            }
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.Renderer,
            GridReactiveServices_1.ReactiveGridService,
            DndService_1.DndService])
    ], GridDropTarget);
    return GridDropTarget;
}());
exports.GridDropTarget = GridDropTarget;
