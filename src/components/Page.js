import { Component, Input } from '@angular/core';
export var Page = (function () {
    function Page() {
    }
    Page.decorators = [
        { type: Component, args: [{
                    templateUrl: "./templates/awgrid_page.html",
                    selector: "[aw-grid-page]"
                },] },
    ];
    /** @nocollapse */
    Page.ctorParameters = [];
    Page.propDecorators = {
        'pageService': [{ type: Input },],
    };
    return Page;
}());
