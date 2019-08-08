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
var GridReactiveServices_1 = require("./GridReactiveServices");
var enums_1 = require("../models/enums");
var SelectService = (function () {
    function SelectService(dataService) {
        this.dataService = dataService;
        this.selected = [];
        this.selectionMode = enums_1.SelectionMode.multiple;
        this.onSelect = new core_1.EventEmitter();
        this.onDoubleClick = new core_1.EventEmitter();
        this.onRowCreate = new core_1.EventEmitter();
        this.onRowDestroy = new core_1.EventEmitter();
        this.onClick = new core_1.EventEmitter();
        this.dataService.selectService = this;
    }
    SelectService.prototype.clear = function () {
        if (this.selected) {
            // this.selected.forEach(r => r.selected.triggerUpdate(false));
            this.selected.forEach(function (r) {
                r.selected = false;
            });
        }
        this.selected = [];
    };
    SelectService.prototype.doubleClick = function (row) {
        this.onDoubleClick.emit(row);
    };
    SelectService.prototype.select = function (row) {
        this.clear();
        this.additionalSelect(row);
        this.startSelected = row;
        //clear original selected range
        this.dataService.selectedIndexes = [];
    };
    SelectService.prototype.additionalSelect = function (row) {
        this.markAsSelected(row);
        this.onSelect.emit(this.selected);
    };
    SelectService.prototype.markAsSelected = function (row) {
        if (this.selected.length > 0 && this.selectionMode == enums_1.SelectionMode.single)
            return;
        var pos = this.selected.indexOf(row);
        if (pos < 0) {
            this.selected.push(row);
            row.selected = true;
        }
        else {
            row.selected = false;
            this.selected.splice(pos, 1);
        }
        // row.selected.triggerUpdate(true);
    };
    SelectService.prototype.selectMany = function (rows) {
        var _this = this;
        this.clear();
        rows.forEach(function (r) { return _this.additionalSelect(r); });
    };
    SelectService.prototype.endSelect = function (row) {
        if (!row)
            return;
        if (!this.startSelected)
            this.select(row);
        var endIndex = row.index;
        var startIndex = Math.min(this.startSelected.index, endIndex);
        endIndex = Math.max(this.startSelected.index, endIndex);
        var startPage = Math.floor(startIndex / this.dataService.pageSize);
        var endPage = Math.floor(endIndex / this.dataService.pageSize);
        //for pages not yet fullfilled, the selectedIndexes array is important
        //for pre-select
        this.dataService.selectedIndexes = [];
        for (var i = startIndex; i <= endIndex; i++) {
            this.dataService.selectedIndexes.push(i);
        }
        //now do select on fullfilled pages
        for (var i = startPage; i <= endPage; i++) {
            var page = this.dataService.pageServices[i];
            if (page.clientDataFullfilled) {
                var selectedRows = page.rowsState
                    .filter(function (r) { return r.index <= endIndex && r.index >= startIndex; });
                this.selected = this.selected.concat(selectedRows);
                selectedRows
                    .forEach(function (r) { return r.selected = true; });
            }
        }
        this.onSelect.emit(this.selected);
    };
    /**
     * @description Marked selected to paginated in rows
     */
    SelectService.prototype.pageInSelected = function (rows) {
        var _this = this;
        var selectedRows = rows.filter(function (r) { return _this.selected.find(function (sr) { return sr == r; }); });
        // selectedRows.forEach(r => r.selected.triggerUpdate(true));
        selectedRows.forEach(function (r) { return r.selected = true; });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], SelectService.prototype, "selectionMode", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SelectService.prototype, "onSelect", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SelectService.prototype, "onDoubleClick", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SelectService.prototype, "onRowCreate", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SelectService.prototype, "onRowDestroy", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SelectService.prototype, "onClick", void 0);
    SelectService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [GridReactiveServices_1.ReactiveGridService])
    ], SelectService);
    return SelectService;
}());
exports.SelectService = SelectService;
