import { ElementRef } from '@angular/core';
import { GridColumnDef } from '../models/GridModels';
import { ColumnResizeService } from '../services/ColumnResizeService';
export declare class ResizerPlaceHolder {
    ele: ElementRef;
    private colResizeService;
    columnDomNode: HTMLElement;
    constructor(ele: ElementRef, colResizeService: ColumnResizeService);
    startColumnResizing(evt: MouseEvent): void;
    ColumnDef: GridColumnDef;
}
