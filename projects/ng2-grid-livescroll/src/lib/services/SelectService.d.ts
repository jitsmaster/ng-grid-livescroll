import { EventEmitter } from '@angular/core';
import { ReactiveGridService } from './GridReactiveServices';
import { SelectionMode } from '../models/enums';
import { GridRow, GridRowEventModel, GridClickEventModel } from '../models/GridModels';
export declare class SelectService {
    private dataService;
    selected: GridRow[];
    startSelected: GridRow;
    selectionMode: SelectionMode;
    onSelect: EventEmitter<GridRow[]>;
    onDoubleClick: EventEmitter<GridRow>;
    onRowCreate: EventEmitter<GridRowEventModel>;
    onRowDestroy: EventEmitter<GridRowEventModel>;
    onClick: EventEmitter<GridClickEventModel>;
    constructor(dataService: ReactiveGridService);
    clear(): void;
    doubleClick(row: GridRow): void;
    select(row: GridRow): void;
    additionalSelect(row: GridRow): void;
    markAsSelected(row: GridRow): void;
    selectMany(rows: GridRow[]): void;
    endSelect(row: GridRow): void;
    /**
     * @description Marked selected to paginated in rows
     */
    pageInSelected(rows: GridRow[]): void;
}
