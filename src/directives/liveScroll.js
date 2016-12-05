import { Directive, Input, Output, EventEmitter, ElementRef } from '@angular/core';
export var LiveScroll = (function () {
    function LiveScroll(ele) {
        var _this = this;
        this.ele = ele;
        this.onScrollI = new EventEmitter();
        this.onScroll = this.onScrollI
            .debounceTime(500)
            .map(function (evt) {
            var container = _this.ele.nativeElement;
            var scrollTop = container.scrollTop;
            //check the pages that are in the view and request data for them
            //no directly here, but to fire event
            var boxPos = _this.ele.nativeElement
                .getBoundingClientRect();
            var visiblePages = _this.pages
                .map(function (p, k) {
                var pagePos = p.ele.nativeElement.getBoundingClientRect();
                return Math.max(boxPos.top, pagePos.top) < Math.min(boxPos.bottom, pagePos.bottom) ?
                    k : -1;
            })
                .filter(function (p) { return p > -1; });
            return visiblePages;
        });
    }
    LiveScroll.prototype.handleScroll = function (evt) {
        this.onScrollI.emit(evt);
    };
    LiveScroll.decorators = [
        { type: Directive, args: [{
                    selector: '[live-scroll]',
                    host: {
                        '(scroll)': 'handleScroll($event)'
                    }
                },] },
    ];
    /** @nocollapse */
    LiveScroll.ctorParameters = [
        { type: ElementRef, },
    ];
    LiveScroll.propDecorators = {
        'pages': [{ type: Input },],
        'onScroll': [{ type: Output },],
    };
    return LiveScroll;
}());
