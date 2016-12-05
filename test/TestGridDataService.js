var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { GridDataServiceBase } from '../src/services/GridDataService';
import { BehaviorSubject } from 'rxjs/Rx';
export var TestGridDataService = (function (_super) {
    __extends(TestGridDataService, _super);
    function TestGridDataService() {
        _super.apply(this, arguments);
        this._rowsSubject = new BehaviorSubject({
            idField: "1",
            page: 0,
            rows: [],
            totalCount: 0
        });
        this.rows = this._rowsSubject.asObservable();
    }
    TestGridDataService.prototype.requestData = function (page, pageSize, sortField, sortDsc) {
        //simulate a 5 col array
        var data = Array.from({ length: pageSize }, function (v, k) {
            var rowData = {};
            Array.from({ length: 5 }, function (vc, kc) {
                return page + "-" + (k * 10 + kc);
            }).forEach(function (val, index) {
                rowData[index + ""] = val;
            });
            return rowData;
        });
        if (sortField) {
            data.sort(function (a, b) {
                if (a == b)
                    return 0;
                else {
                    if (sortDsc) {
                        return (a > b) ? -1 : 1;
                    }
                    else {
                        return (a < b) ? -1 : 1;
                    }
                }
            });
        }
        this._rowsSubject.next({
            idField: "1",
            page: page,
            rows: data,
            totalCount: 700
        });
        return this.rows;
    };
    return TestGridDataService;
}(GridDataServiceBase));
