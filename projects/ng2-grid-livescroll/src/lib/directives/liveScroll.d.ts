import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../components/Page';
export declare class LiveScroll {
    private ele;
    pages: Page[];
    constructor(ele: ElementRef);
    onLiveScroll: Observable<number[]>;
    scrollLeft: Observable<number>;
    private _paddingRightSubj;
    paddingRight: Observable<string>;
    private _onScrollI;
    onScrollI: Observable<UIEvent>;
    fit(): void;
    handleScroll(evt: UIEvent): void;
    reset(): void;
}
