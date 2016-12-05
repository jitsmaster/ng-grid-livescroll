import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { GridDataServiceBase } from './GridDataService';
export var ReactiveGridPageService = (function () {
    function ReactiveGridPageService(columnsDef, idField, rowsCount) {
        this.columnsDef = columnsDef;
        this.idField = idField;
        this.rowsCount = rowsCount;
        this._rowsSubject = new BehaviorSubject([]);
        this.rows = this._rowsSubject.asObservable();
        this.clientDataFullfilled = false;
        //create stubbing rows with no cells
        this._rowsSubject.next(Array.from({ length: rowsCount }, function (v, k) {
            return {
                id: "",
                data: []
            };
        }));
    }
    ReactiveGridPageService.prototype.setData = function (rowsData) {
        var _this = this;
        //prevent setting page data repeatedly
        if (!this.clientDataFullfilled)
            this._rowsSubject.next(rowsData.map(function (rowData, rowIndex) {
                return {
                    id: rowData[_this.idField],
                    data: _this.columnsDef.map(function (colDef, colIndex) {
                        var value = colDef.formatter ? colDef.formatter(rowData[colDef.field], colIndex, rowData, rowIndex) : rowData[colDef.field] + "";
                        return {
                            colDef: colDef,
                            value: value
                        };
                    })
                };
            }));
        this.clientDataFullfilled = true;
    };
    ReactiveGridPageService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ReactiveGridPageService.ctorParameters = [
        { type: Array, },
        null,
        null,
    ];
    return ReactiveGridPageService;
}());
export var ReactiveGridService = (function () {
    function ReactiveGridService(dataService) {
        this.dataService = dataService;
        this.pageSize = 100;
        this.currentPage = 0;
        this.isFirstRequest = true;
        this.pageServices = [];
        this._pagesSubject = new BehaviorSubject([]);
        this.pages = this._pagesSubject.asObservable();
    }
    ReactiveGridService.prototype.initialize = function (pageSize, columnsDef, idField) {
        this.pageSize = pageSize;
        this.columnsDef = columnsDef;
        this.idField = idField;
        this.allRows = null;
    };
    ReactiveGridService.prototype.requestData = function (sortField, sortDsc) {
        var _this = this;
        //if all rows already set, use it directly,
        //this is the client side live scroll
        if (this.allRows) {
            if (!this.pageServices[this.currentPage].clientDataFullfilled) {
                var pageRows = this.allRows
                    .filter(function (v, k) { return k >= _this.currentPage * _this.pageSize
                    && k < (_this.currentPage + 1) * _this.pageSize; });
                this.pageServices[this.currentPage].setData(pageRows);
            }
        }
        this.dataService.requestData(this.currentPage, this.pageSize, sortField, sortDsc)
            .subscribe(function (resp) {
            if (_this.isFirstRequest) {
                var lastPageSize = resp.totalCount % _this.pageSize || _this.pageSize;
                var pages = Math.ceil(resp.totalCount / _this.pageSize);
                _this.pageServices = Array.from({ length: pages }, function (v, k) {
                    return new ReactiveGridPageService(_this.columnsDef, _this.idField, pages - 1 ? lastPageSize : _this.pageSize);
                });
                _this._pagesSubject.next(_this.pageServices);
            }
            //if all rows are returned, set them directly, otherwise, set the first one
            if (resp.rows && resp.rows.length > 0) {
                if (resp.rows.length == resp.totalCount) {
                    //set all rows
                    _this.allRows = resp.rows;
                }
                if (resp.rows.length <= _this.pageSize)
                    _this.pageServices[_this.currentPage].setData(resp.rows);
                else
                    throw new Error("Invalid grid data: Page data overflow.");
            }
        });
    };
    ReactiveGridService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ReactiveGridService.ctorParameters = [
        { type: GridDataServiceBase, },
    ];
    return ReactiveGridService;
}());
