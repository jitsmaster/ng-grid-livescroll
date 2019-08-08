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
var Rx_1 = require("rxjs/Rx");
var GridReactiveServices_1 = require("../services/GridReactiveServices");
var SelectService_1 = require("../services/SelectService");
var DndService_1 = require("../services/DndService");
var enums_1 = require("../models/enums");
var liveScroll_1 = require("../directives/liveScroll");
var Page_1 = require("./Page");
var AwGrid = (function () {
    function AwGrid(dataService, selectService, dndService) {
        var _this = this;
        this.dataService = dataService;
        this.selectService = selectService;
        this.dndService = dndService;
        this._colsSubj = new Rx_1.BehaviorSubject([]);
        this.columns = this._colsSubj.asObservable();
        this._teardowns = [];
        this.dragSourceType = "";
        this.acceptDropTypes = "";
        this.pageSize = 100;
        this.selectionMode = enums_1.SelectionMode.multiple;
        this.onSelect = new core_1.EventEmitter();
        this.onDoubleClick = new core_1.EventEmitter();
        this.onRowCreate = new core_1.EventEmitter();
        this.onRowDestroy = new core_1.EventEmitter();
        this.onClick = new core_1.EventEmitter();
        this.columnResizing = false;
        this._teardowns = [
            this.selectService.onSelect.subscribe(function (evt) {
                _this.onSelect.emit(evt);
            }),
            this.selectService.onRowCreate.subscribe(function (evt) {
                _this.onRowCreate.emit(evt);
            }),
            this.selectService.onRowDestroy.subscribe(function (evt) {
                _this.onRowDestroy.emit(evt);
            }),
            this.selectService.onDoubleClick.subscribe(function (evt) {
                _this.onDoubleClick.emit(evt);
            }),
            this.selectService.onClick.subscribe(function (evt) {
                _this.onClick.emit(evt);
            })
        ];
        this.pageServices = this.dataService.pages
            .map(function (pages) {
            setTimeout(function () { return _this.fit(); }, 100);
            return pages;
        });
    }
    Object.defineProperty(AwGrid.prototype, "allowDrag", {
        get: function () {
            return !this.dndService.dragDisabled;
        },
        set: function (val) {
            this.dndService.dragDisabled = !val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AwGrid.prototype, "allowDrop", {
        get: function () {
            return !this.dndService.dropDisabled;
        },
        set: function (val) {
            this.dndService.dropDisabled = !val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AwGrid.prototype, "columnsDef", {
        set: function (cols) {
            this._colsDef = cols;
            this._colsSubj.next(cols);
            // this.refresh();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AwGrid.prototype, "pages", {
        get: function () {
            if (!this._pages)
                return [];
            return this._pages.map(function (p) { return p; });
        },
        enumerable: true,
        configurable: true
    });
    AwGrid.prototype.ngAfterViewInit = function () {
        this.selectService.selectionMode = this.selectionMode;
        // if (!!this._colsDef && this._colsDef.length > 0 && !this._colsDef.find(val => !val.width))
        //     //auto resize the last row
        //     this._colsDef[this._colsDef.length - 1].width = null;
        if (this._colsDef && this._colsDef.length > 0)
            this.refresh();
    };
    AwGrid.prototype.ngOnDestroy = function () {
        this._teardowns.forEach(function (t) { return t.unsubscribe(); });
    };
    AwGrid.prototype.onColumnResizing = function (colDef) {
        this.columnResizing = !!colDef;
    };
    AwGrid.prototype.fit = function () {
        this.liveScroll.fit();
    };
    AwGrid.prototype.refresh = function () {
        this.dataService.initialize(this.pageSize, this._colsDef, this.idField);
        this.dataService.currentPages = [0];
        this.liveScroll.reset();
        this.dataService.refresh();
    };
    AwGrid.prototype.select = function (ids) {
        var _this = this;
        if (ids) {
            this.selected = ids;
            this.dataService.selectedIds = ids;
        }
        if (!this.dataService.pageServices.length)
            return;
        //use reducer to realize selectMany
        var selectedRows = this.dataService.pageServices
            .map(function (s) { return s.rowsState; })
            .reduce(function (x, y) { return x.concat(y); })
            .filter(function (r) { return _this.selected.find(function (id) { return id == r.id; }); });
        this.selectService.selectMany(selectedRows);
    };
    AwGrid.prototype.onLiveScroll = function (pagesToLoad) {
        this.dataService.currentPages = pagesToLoad;
        this.dataService
            .requestData(this.dataService.sortField, this.dataService.sortDsc, this.selected);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AwGrid.prototype, "idField", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AwGrid.prototype, "allowDrag", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AwGrid.prototype, "dragSourceType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AwGrid.prototype, "allowDrop", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AwGrid.prototype, "acceptDropTypes", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], AwGrid.prototype, "columnsDef", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AwGrid.prototype, "pageSize", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AwGrid.prototype, "height", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], AwGrid.prototype, "selectionMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], AwGrid.prototype, "selected", void 0);
    __decorate([
        core_1.ViewChild(liveScroll_1.LiveScroll),
        __metadata("design:type", liveScroll_1.LiveScroll)
    ], AwGrid.prototype, "liveScroll", void 0);
    __decorate([
        core_1.ViewChildren(Page_1.Page),
        __metadata("design:type", core_1.QueryList)
    ], AwGrid.prototype, "_pages", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AwGrid.prototype, "onSelect", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AwGrid.prototype, "onDoubleClick", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AwGrid.prototype, "onRowCreate", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AwGrid.prototype, "onRowDestroy", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AwGrid.prototype, "onClick", void 0);
    AwGrid = __decorate([
        core_1.Component({
            selector: 'aw-grid',
            template: "\n      <div class=\"awgrid\" [style.height]=\"height\"\n      \t[grid-dragsource]=\"dragSourceType\" [drag-disabled]=\"!allowDrag\" \n      \t[grid-droptarget]=\"acceptDropTypes\" [drop-disabled]=\"!allowDrop\">\n      \t<div class=\"thead\" [scrollLeft]=\"liveScroll.scrollLeft | async\" column-resizer (onColumnResizing)=\"onColumnResizing($event)\"\n      \t\t[class.columnResizing]=\"columnResizing\">\n      \t\t<div [style.paddingRight]=\"liveScroll.paddingRight | async\">\n      \t\t\t<div aw-grid-head-col class=\"th\" *ngFor=\"let colDef of columns | async\" \n      \t\t\t\t[model]=\"colDef\"></div>\n      \t\t</div>\n      \t</div>\n      \t<div class=\"tbody\" \n      \t\tlive-scroll [pages]=\"pages\" (onLiveScroll)=\"onLiveScroll($event)\">\n      \t\t<div aw-grid-page class=\"tpage\" *ngFor=\"let page of pageServices | async\" \n      \t\t\t[pageService]=\"page\"></div>\n      \t</div>\n      </div>\n    ",
            styles: ["\n      .gridDragAvatar {\n        padding: 6px;\n        background-color: mediumseagreen;\n        color: white;\n        border-radius: 3px;\n        border: none;\n        position: absolute;\n        left: -9999px;\n        top: 0;\n      }\n      .awgrid {\n        display: flex;\n        border: 1px solid #d9dde4;\n        flex-flow: column nowrap;\n        align-content: stretch;\n        box-sizing: border-box;\n        background-color: white;\n        font-family: \"Segoe UI Webfont\", \"Helvetica\", \"Ebrima\", \"Nirmala UI\", \"Gadugi\", \"Segoe Xbox Symbol\", \"Segoe UI Symbol\", \"Meiryo UI\", \"Khmer UI\", \"Tunga\", \"Lao UI\", \"Raavi\", \"Iskoola Pota\", \"Latha\", \"Leelawadee\", \"Microsoft YaHei UI\", \"Microsoft JhengHei UI\", \"Malgun Gothic\", \"Estrangelo Edessa\", \"Microsoft Himalaya\", \"Microsoft New Tai Lue\", \"Microsoft PhagsPa\", \"Microsoft Tai Le\", \"Microsoft Yi Baiti\", \"Mongolian Baiti\", \"MV Boli\", \"Myanmar Text\", \"Cambria Math\";\n      }\n      .awgrid .thead {\n        border-bottom: 2px solid #d9dde4;\n        flex: 0 1 auto;\n        display: block;\n        background: white;\n        min-height: 2.2rem;\n        overflow: hidden;\n        height: 2.2rem;\n        box-sizing: border-box;\n        background-color: #edf0f2;\n      }\n      .awgrid .thead div {\n        display: table;\n        height: 100%;\n        min-width: 100%;\n        box-sizing: border-box;\n        position: relative;\n      }\n      .awgrid .thead div .th {\n        display: table-cell;\n        border-right: 1px solid #d9dde4;\n        font-size: 1.05rem;\n        padding: 0.5rem;\n        vertical-align: middle;\n        box-sizing: border-box;\n        white-space: nowrap;\n        text-overflow: ellipsis;\n        overflow: hidden;\n        cursor: pointer;\n      }\n      .awgrid .thead div .th:last-of-type {\n        border-right: none;\n      }\n      .awgrid .thead div .th .sortingSymbol {\n        opacity: 0;\n        transform: rotate(-90deg);\n        transition: all 0.2s;\n        position: absolute;\n        right: 0.4rem;\n        top: 0.11rem;\n        font-size: 0.9rem;\n      }\n      .awgrid .thead div .th .sortingSymbol.sort {\n        opacity: 1;\n      }\n      .awgrid .thead div .th .sortingSymbol.sort.desc {\n        transform: rotate(90deg);\n      }\n      .awgrid .thead div .th .resizer {\n        right: 0;\n        width: 0.4rem;\n        display: inline-block;\n        top: 0;\n        bottom: 0;\n        position: absolute;\n        cursor: ew-resize;\n      }\n      .awgrid .thead.columnResizing {\n        cursor: ew-resize !important;\n      }\n      .awgrid .thead.columnResizing div {\n        cursor: ew-resize !important;\n      }\n      .awgrid .thead.columnResizing div .th {\n        cursor: ew-resize !important;\n      }\n      .awgrid .tbody {\n        flex: 1 1 auto;\n        overflow: auto;\n        box-sizing: border-box;\n      }\n      .awgrid .tbody .tpage .tr {\n        border-bottom: 1px solid #d9dde4;\n        line-height: 1rem;\n        min-height: 1.3em;\n        display: table;\n        min-width: 100%;\n        box-sizing: border-box;\n      }\n      .awgrid .tbody .tpage .tr:nth-of-type(2n) {\n        background-color: #fafafa;\n      }\n      .awgrid .tbody .tpage .tr.selected {\n        background-color: palegreen;\n      }\n      .awgrid .tbody .tpage .tr .td {\n        display: table-cell;\n        border-right: 1px solid #d9dde4;\n        font-size: 1.0em;\n        box-sizing: border-box;\n        padding: 0.3rem 0.5rem;\n        overflow: hidden;\n        text-overflow: ellipsis;\n      }\n      .awgrid .tbody .tpage .tr .td:last-of-type {\n        border-right: none;\n      }\n      .awgrid .tbody .tpage .tr .td:last-of-type:after {\n        clear: both;\n      }\n    "],
            encapsulation: core_1.ViewEncapsulation.None,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [GridReactiveServices_1.ReactiveGridService, SelectService_1.SelectService,
            DndService_1.DndService])
    ], AwGrid);
    return AwGrid;
}());
exports.AwGrid = AwGrid;
