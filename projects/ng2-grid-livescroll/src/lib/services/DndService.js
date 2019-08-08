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
var DndService = (function () {
    function DndService() {
        this.allowedDragSourceTypes = [];
        this.onDragStart = new core_1.EventEmitter();
        this.onDragEnd = new core_1.EventEmitter();
        this.onDragOver = new core_1.EventEmitter();
        this.onDragOff = new core_1.EventEmitter();
        this.onDrop = new core_1.EventEmitter();
    }
    Object.defineProperty(DndService.prototype, "acceptTypes", {
        set: function (val) {
            this.allowedDragSourceTypes = val.split(',')
                .filter(function (t) { return !!t; });
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DndService.prototype, "onDragStart", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DndService.prototype, "onDragEnd", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DndService.prototype, "onDragOver", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DndService.prototype, "onDragOff", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DndService.prototype, "onDrop", void 0);
    return DndService;
}());
exports.DndService = DndService;
