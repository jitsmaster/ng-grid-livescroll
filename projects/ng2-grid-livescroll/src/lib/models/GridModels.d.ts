import { WidthUnitType } from './enums';
import { ElementRef } from "@angular/core";
export declare class GridColumnDef {
    label: string;
    field: string;
    width: number;
    minWidth: number;
    widthUnit: WidthUnitType;
    formatter: (cellData, cellIndex: number, rowData, rowIndex: number) => string;
    sortable: boolean;
}
export declare class GridColumnResizeModel {
    colDef: GridColumnDef;
    columnDomNode: HTMLElement;
    mouseLeft: number;
}
export declare class GridDataRequest {
    page: number;
    pageSize: number;
}
export declare class GridDataResponse {
    totalCount: number;
    page: number;
    idField: string;
    rows: any[];
}
export declare class GridCell {
    colDef: GridColumnDef;
    value: string;
}
export declare class GridRow {
    id: string;
    index: number;
    selected: boolean;
    data: GridCell[];
    rawData: any;
    draggable: boolean;
}
export declare class GridRowEventModel {
    model: GridRow;
    node: ElementRef;
}
export declare class SortState {
    sorting: boolean;
    descending: boolean;
    column: GridColumnDef;
}
export declare class SelectItemsState {
    ids: string[];
}
export declare class SelectRangeState {
    fromPage: number;
    toPage: number;
    fromPageRow: number;
    toPageRow: number;
}
export declare class GridClickEventModel {
    cell: GridCell;
    row: GridRow;
    domNode: HTMLElement;
}
