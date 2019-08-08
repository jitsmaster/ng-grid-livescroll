import { ElementRef } from '@angular/core';
import { ReactiveGridPageService } from '../services/GridReactiveServices';
import { SelectService } from '../services/SelectService';
export declare class Page {
    ele: ElementRef;
    selectService: SelectService;
    pageService: ReactiveGridPageService;
    constructor(ele: ElementRef, selectService: SelectService);
}
