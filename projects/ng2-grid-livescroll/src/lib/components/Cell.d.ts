import { GridCell, GridRow } from '../models/GridModels';
import { SelectService } from '../services/SelectService';
export declare class Cell {
    private selectService;
    constructor(selectService: SelectService);
    model: GridCell;
    rowModel: GridRow;
    readonly minWidth: string;
    readonly colWidth: string;
    readonly value: string;
    onCellClick(cell: GridCell, row: GridRow, evt: MouseEvent): void;
}
