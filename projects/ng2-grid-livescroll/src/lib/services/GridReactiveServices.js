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
var enums_1 = require("../models/enums");
var GridDataService_1 = require("./GridDataService");
var ReactiveGridPageService = (function () {
    function ReactiveGridPageService(columnsDef, idField, pageSize, pageIndex, rowsCount) {
        this.columnsDef = columnsDef;
        this.idField = idField;
        this.pageSize = pageSize;
        this.pageIndex = pageIndex;
        this.rowsCount = rowsCount;
        this._rowsSubject = new Rx_1.BehaviorSubject([]);
        this.rows = this._rowsSubject.asObservable();
        this._allowDrag = false;
        this.clientDataFullfilled = false;
        this._removedIds = [];
        //create stubbing rows with no cells
        this._rowsSubject.next(Array.from({ length: rowsCount }, function (v, k) {
            return {
                id: "",
                // selected: new AsyncPipeService<boolean>(false),
                selected: false,
                data: [{
                        colDef: {
                            field: "id",
                            width: 100,
                            widthUnit: enums_1.WidthUnitType.percent
                        },
                        value: ""
                    }]
            };
        }));
    }
    Object.defineProperty(ReactiveGridPageService.prototype, "allowDrag", {
        get: function () {
            return this._allowDrag;
        },
        set: function (val) {
            this._allowDrag = true;
            if (this.rowsState)
                this.rowsState.forEach(function (r) { return r.draggable = val; });
        },
        enumerable: true,
        configurable: true
    });
    ReactiveGridPageService.prototype.setData = function (rowsData) {
        var _this = this;
        //prevent setting page data repeatedly
        if (!this.clientDataFullfilled || this._currentRowsData != rowsData) {
            this.rowsState = rowsData.map(function (rowData, rowIndex) {
                var actualRowIndex = _this.pageSize * _this.pageIndex + rowIndex;
                return {
                    id: rowData[_this.idField],
                    index: actualRowIndex,
                    // selected: new AsyncPipeService<boolean>(false),
                    selected: false,
                    data: _this.columnsDef.map(function (colDef, colIndex) {
                        var value = colDef.formatter ? colDef.formatter(rowData[colDef.field], colIndex, rowData, actualRowIndex) : rowData[colDef.field] + "";
                        return {
                            colDef: colDef,
                            value: value
                        };
                    }),
                    draggable: _this._allowDrag,
                    rawData: rowData
                };
            })
                .filter(function (r) { return _this._removedIds.indexOf(r.id) < 0; });
            this._rowsSubject.next(this.rowsState);
            this._currentRowsData = rowsData;
            this.clientDataFullfilled = true;
        }
        ;
    };
    ReactiveGridPageService.prototype.addRows = function (rows, addToBottom) {
        this.rowsState = addToBottom ?
            this.rowsState.concat(rows) :
            rows.concat(this.rowsState);
        this._rowsSubject.next(this.rowsState);
    };
    ReactiveGridPageService.prototype.removeRows = function (rows) {
        if (!this.rowsState)
            return;
        this._removedIds = this._removedIds.concat(rows.map(function (r) { return r.id; }));
        this.rowsState = this.rowsState
            .filter(function (r) {
            return !rows.find(function (rr) { return rr === r; });
        });
        this._rowsSubject.next(this.rowsState);
    };
    ReactiveGridPageService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [Array, String, Number, Number, Number])
    ], ReactiveGridPageService);
    return ReactiveGridPageService;
}());
exports.ReactiveGridPageService = ReactiveGridPageService;
var ReactiveGridService = (function () {
    function ReactiveGridService(dataService) {
        this.dataService = dataService;
        this._allowDrag = false;
        this.requestedPages = [];
        this.infiniteScrollMode = false;
        this.pageSize = 100;
        this.currentPages = [0];
        this.isFirstRequest = true;
        this.pageServices = [];
        this._pagesSubject = new Rx_1.BehaviorSubject([]);
        this.pages = this._pagesSubject.asObservable();
        this.selectedIndexes = [];
        this.selectedIds = [];
        this.teardowns = [];
    }
    Object.defineProperty(ReactiveGridService.prototype, "allowDrag", {
        set: function (val) {
            this._allowDrag = true;
            this.pageServices.forEach(function (page) { return page.allowDrag = val; });
        },
        enumerable: true,
        configurable: true
    });
    ReactiveGridService.prototype.initialize = function (pageSize, columnsDef, idField) {
        this.pageSize = pageSize;
        this.columnsDef = columnsDef;
        this.idField = idField;
        this.allRows = null;
    };
    ReactiveGridService.prototype.refresh = function () {
        this.isFirstRequest = true;
        this.requestedPages = [];
        this.requestData("", false);
    };
    ReactiveGridService.prototype.addRows = function (rows, toEnd) {
        if (!rows || !rows.length)
            return;
        //add to the end of listing, which means the last page
        if (!this.pageServices.length) {
            var pageService = new ReactiveGridPageService(this.columnsDef, this.idField, this.pageSize, 0, rows.length);
            pageService.allowDrag = this._allowDrag;
            this.pageServices = [pageService];
            this._pagesSubject.next(this.pageServices);
        }
        var lastPage = this.pageServices[this.pageServices.length - 1];
        if (!lastPage.rowsState) {
            var obs = this.dataService.requestData(this.pageServices.length - 1, this.pageSize, this.sortField, this.sortDsc);
            var t = obs.subscribe(function (resp) {
                lastPage.setData(resp.rows);
                lastPage.addRows(rows, toEnd);
            });
        }
        else
            lastPage.addRows(rows, toEnd);
    };
    ReactiveGridService.prototype.removeRows = function (rows) {
        var visitedPages = this.pageServices.filter(function (p) { return !!p.rowsState; })
            .forEach(function (p) { return p.removeRows(rows); });
    };
    ReactiveGridService.prototype.requestData = function (sortField, sortDsc, selectedIds) {
        var _this = this;
        if (sortField != this.sortField
            || sortDsc != this.sortDsc) {
            this.isFirstRequest = true;
            this.requestedPages = [];
        }
        this.sortField = sortField;
        this.sortDsc = sortDsc;
        if (selectedIds)
            this.selectedIds = selectedIds;
        //preventing requesting the same page twice
        var actualPagesToRequest = this.currentPages
            .filter(function (p) { return _this.requestedPages.indexOf(p) < 0; });
        this.requestedPages = this.requestedPages.concat(actualPagesToRequest);
        //if all rows already set, use it directly,
        //this is the client side live scroll
        if (this.allRows) {
            actualPagesToRequest.forEach(function (p) {
                if (!_this.pageServices[p].clientDataFullfilled) {
                    var pageRows = _this.allRows
                        .filter(function (v, k) { return k >= p * _this.pageSize
                        && k < (p + 1) * _this.pageSize; });
                    _this.pageServices[p].setData(pageRows);
                }
            });
        }
        var pageRequests = actualPagesToRequest.map(function (p) {
            return {
                page: p,
                request: _this.dataService.requestData(p, _this.pageSize, sortField, sortDsc)
            };
        });
        // this.teardowns.forEach(t => t.unsubscribe());
        this.teardowns = pageRequests.map(function (pReq) {
            return pReq.request
                .subscribe(function (resp) {
                if (!resp || !resp.rows)
                    return;
                if (resp.totalCount < 0) {
                    _this.infiniteScrollMode = true;
                    //infinite scroll mode
                    if (resp.page == _this.pageServices.length - 1) {
                        //when return rows count > 0, add another page at the end
                        var s = new ReactiveGridPageService(_this.columnsDef, _this.idField, _this.pageSize, resp.page + 1, _this.pageSize);
                        s.allowDrag = _this._allowDrag;
                        _this.pageServices.push(s);
                    }
                    _this._setPageData(resp);
                }
                else {
                    if (_this.isFirstRequest) {
                        var lastPageSize = resp.totalCount % _this.pageSize || _this.pageSize;
                        var pages = Math.ceil(resp.totalCount / _this.pageSize);
                        _this.pageServices = Array.from({ length: pages }, function (v, k) {
                            var s = new ReactiveGridPageService(_this.columnsDef, _this.idField, _this.pageSize, k, resp.page == pages - 1 ? lastPageSize : _this.pageSize);
                            s.allowDrag = _this._allowDrag;
                            return s;
                        });
                        _this._pagesSubject.next(_this.pageServices);
                        _this.isFirstRequest = false;
                    }
                    //if all rows are returned, set them directly, otherwise, set the first one
                    if (resp.rows && resp.rows.length > 0) {
                        if (resp.rows.length == resp.totalCount) {
                            //set all rows
                            _this.allRows = resp.rows;
                        }
                        _this._setPageData(resp);
                    }
                }
            });
        });
    };
    ReactiveGridService.prototype._setPageData = function (resp) {
        var _this = this;
        if (resp.rows.length <= this.pageSize) {
            this.pageServices[resp.page].setData(resp.rows);
            var selectedRows = [];
            if (this.selectedIndexes && this.selectedIndexes.length > 0) {
                var selectedRows = this.pageServices[resp.page]
                    .rowsState
                    .filter(function (r) { return _this.selectedIndexes.find(function (idx) { return r.index == idx; }); });
            }
            else if (this.selectedIds && this.selectedIds.length > 0) {
                var selectedRows = this.pageServices[resp.page]
                    .rowsState
                    .filter(function (r) { return _this.selectedIds.find(function (id) { return r.id == id; }); });
            }
            if (selectedRows.length > 0)
                selectedRows.forEach(function (r) { return _this.selectService.markAsSelected(r); });
        }
        else
            throw new Error("Invalid grid data: Page data overflow.");
    };
    ReactiveGridService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [GridDataService_1.GridDataServiceBase])
    ], ReactiveGridService);
    return ReactiveGridService;
}());
exports.ReactiveGridService = ReactiveGridService;
