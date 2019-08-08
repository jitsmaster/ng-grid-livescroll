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
var GridReactiveServices_1 = require("../services/GridReactiveServices");
var DndService_1 = require("../services/DndService");
var SelectService_1 = require("../services/SelectService");
var GridDragSource = (function () {
    function GridDragSource(dataService, selectService, dndService) {
        var _this = this;
        this.dataService = dataService;
        this.selectService = selectService;
        this.dndService = dndService;
        this._disabled = true;
        this.onDisabledToggle = new core_1.EventEmitter();
        dndService.onDragStart.subscribe(function (src) {
            if (_this.selectService.selected.find(function (r) { return src.dataModel == r; }))
                _this.dndService.dragState = _this.selectService.selected;
            else {
                //if drag somewhere else, select the drag item and deselect rest
                _this.selectService.select(src.dataModel);
                _this.dndService.dragState = [src.dataModel];
            }
            //set drag avatar, just use a green button with number of drag items in it
            if (!!src.dragEvent.dataTransfer['setDragImage']) {
                if (!_this.avatar) {
                    _this.avatar = document.createElement('div');
                    _this.avatar.className = "gridDragAvatar";
                    document.body.appendChild(_this.avatar);
                }
                _this.avatar.innerHTML = _this.dndService.dragState.length + "";
                src.dragEvent.dataTransfer['setDragImage'](_this.avatar, 2, 2);
            }
        });
    }
    Object.defineProperty(GridDragSource.prototype, "dragType", {
        get: function () {
            return this.dndService.dragSourceType;
        },
        set: function (val) {
            this.dndService.dragSourceType = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridDragSource.prototype, "disabled", {
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
    __decorate([
        core_1.Input('grid-dragsource'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], GridDragSource.prototype, "dragType", null);
    __decorate([
        core_1.Input('drag-disabled'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], GridDragSource.prototype, "disabled", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GridDragSource.prototype, "onDisabledToggle", void 0);
    GridDragSource = __decorate([
        core_1.Directive({
            selector: "[grid-dragsource]"
        }),
        __metadata("design:paramtypes", [GridReactiveServices_1.ReactiveGridService,
            SelectService_1.SelectService,
            DndService_1.DndService])
    ], GridDragSource);
    return GridDragSource;
}());
exports.GridDragSource = GridDragSource;
