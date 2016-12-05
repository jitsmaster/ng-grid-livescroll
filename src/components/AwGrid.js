import { Component, Input, ViewChild, ViewChildren, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveGridService } from '../services/GridReactiveServices';
import { LiveScroll } from '../directives/liveScroll';
import { Page } from './Page';
export var AwGrid = (function () {
    function AwGrid(dataService) {
        this.dataService = dataService;
        this.pageSize = 100;
    }
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
        this.dataService.initialize(this.pageSize, this.columnsDef, this.idField);
        this.dataService.currentPage = 0;
        this.dataService.requestData("", false);
    };
    AwGrid.prototype.onLiveScroll = function (pagesToLoad) {
        var _this = this;
        pagesToLoad.forEach(function (page) {
            _this.dataService.currentPage = page;
            _this.dataService.requestData("", false);
        });
    };
    AwGrid.decorators = [
        { type: Component, args: [{
                    selector: 'aw-grid',
                    templateUrl: './templates/awgrid.html',
                    styleUrls: ['./templates/awgrid.css'],
                    providers: [ReactiveGridService],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
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
        'liveScroll': [{ type: ViewChild, args: [LiveScroll,] },],
        '_pages': [{ type: ViewChildren, args: [Page,] },],
    };
    return AwGrid;
}());
