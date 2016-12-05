import { Component, Input, ElementRef } from '@angular/core';
export var Page = (function () {
    function Page(ele) {
        this.ele = ele;
    }
    Page.decorators = [
        { type: Component, args: [{
                    templateUrl: "./templates/awgrid_page.html",
                    selector: "[aw-grid-page]"
                },] },
    ];
    /** @nocollapse */
    Page.ctorParameters = [
        { type: ElementRef, },
    ];
    Page.propDecorators = {
        'pageService': [{ type: Input },],
    };
    return Page;
}());
