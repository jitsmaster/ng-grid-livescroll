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
var LiveScroll = (function () {
    function LiveScroll(ele) {
        var _this = this;
        this.ele = ele;
        this._paddingRightSubj = new Rx_1.BehaviorSubject("0px");
        this.paddingRight = this._paddingRightSubj.asObservable();
        this._onScrollI = new Rx_1.BehaviorSubject(null);
        this.onScrollI = this._onScrollI.asObservable();
        this.onLiveScroll = this.onScrollI
            .debounceTime(400)
            .distinctUntilChanged()
            .map(function (evt) {
            if (!evt)
                return [0];
            //detect visible pages
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
            // return [];
        });
        this.scrollLeft = this.onScrollI
            .map(function (evt) {
            if (!evt)
                return 0;
            var container = _this.ele.nativeElement;
            return container.scrollLeft;
        });
    }
    LiveScroll.prototype.fit = function () {
        var container = this.ele.nativeElement;
        var scrollbarWidth = !container.firstElementChild ?
            0 :
            container.offsetWidth - container.firstElementChild.offsetWidth;
        //set the topbar padding right
        this._paddingRightSubj.next(scrollbarWidth + "px");
    };
    LiveScroll.prototype.handleScroll = function (evt) {
        this._onScrollI.next(evt);
        this.fit();
    };
    LiveScroll.prototype.reset = function () {
        this.ele.nativeElement.scrollTop = 0;
        this.ele.nativeElement.scrollLeft = 0;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], LiveScroll.prototype, "pages", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Rx_1.Observable)
    ], LiveScroll.prototype, "onLiveScroll", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Rx_1.Observable)
    ], LiveScroll.prototype, "scrollLeft", void 0);
    LiveScroll = __decorate([
        core_1.Directive({
            selector: '[live-scroll]',
            host: {
                '(scroll)': 'handleScroll($event)'
            }
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], LiveScroll);
    return LiveScroll;
}());
exports.LiveScroll = LiveScroll;
