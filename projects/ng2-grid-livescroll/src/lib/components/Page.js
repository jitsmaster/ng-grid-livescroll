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
var SelectService_1 = require("../services/SelectService");
var Page = (function () {
    function Page(ele, selectService) {
        this.ele = ele;
        this.selectService = selectService;
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", GridReactiveServices_1.ReactiveGridPageService)
    ], Page.prototype, "pageService", void 0);
    Page = __decorate([
        core_1.Component({
            template: "\n   <div class=\"tr\" awgrid-tr *ngFor=\"let row of pageService.rows | async\"\n   \t[model]=\"row\">\n   </div>\n\t",
            selector: "[aw-grid-page]"
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, SelectService_1.SelectService])
    ], Page);
    return Page;
}());
exports.Page = Page;
