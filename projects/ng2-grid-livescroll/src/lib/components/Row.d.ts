import { ElementRef } from '@angular/core';
import { GridRow } from '../models/GridModels';
import { SelectService } from '../services/SelectService';
import { DndService } from '../services/DndService';
export declare class Row {
    ele: ElementRef;
    selectService: SelectService;
    dndService: DndService;
    model: GridRow;
    constructor(ele: ElementRef, selectService: SelectService, dndService: DndService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onRowClick(row: GridRow, evt: MouseEvent): void;
    onDoubleClick(row: GridRow, evt: MouseEvent): void;
    onDragStart(evt: DragEvent): void;
    onDragEnd(evt: DragEvent): void;
}
