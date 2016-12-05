import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ReactiveGridService } from '../services/GridReactiveServices';
export var AwGrid = (function () {
    function AwGrid(dataService) {
        this.dataService = dataService;
        this.pageSize = 100;
    }
    AwGrid.prototype.ngAfterViewInit = function () {
        this.dataService.initialize(this.pageSize, this.columnsDef, this.idField);
        this.dataService.currentPage = 0;
        this.dataService.requestData("", false);
    };
    AwGrid.decorators = [
        { type: Component, args: [{
                    selector: 'aw-grid',
                    templateUrl: './templates/awgrid.html',
                    styleUrls: ['./templates/awgrid.css'],
                    providers: [ReactiveGridService],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    AwGrid.ctorParameters = [
        { type: ReactiveGridService, },
    ];
    AwGrid.propDecorators = {
        'idField': [{ type: Input },],
        'columnsDef': [{ type: Input },],
        'pageSize': [{ type: Input },],
        'height': [{ type: Input },],
    };
    return AwGrid;
}());
