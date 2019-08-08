import { EventEmitter } from '@angular/core';
import { GridColumnDef, GridColumnResizeModel } from '../models/GridModels';
export declare class ColumnResizeService {
    onColumnResizeStart: EventEmitter<GridColumnResizeModel>;
    onColumnResizeEnd: EventEmitter<boolean>;
    resizingColumn: GridColumnDef;
}
