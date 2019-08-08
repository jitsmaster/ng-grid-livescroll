import { EventEmitter, ElementRef } from '@angular/core';
import { GridColumnResizeModel } from '../models/GridModels';
import { ColumnResizeService } from '../services/ColumnResizeService';
export declare class ColumnResizer {
    private ele;
    private colResizeService;
    onColumnResizing: EventEmitter<GridColumnResizeModel>;
    private columnToResize;
    lastMouseLeft: number;
    constructor(ele: ElementRef, colResizeService: ColumnResizeService);
    onColumnHeadersMouseMove(evt: MouseEvent): void;
    confirmColumnResizing(evt: MouseEvent): void;
}
