import { WidthUnitType } from './enums';
export declare class GridColumnDef {
    label: string;
    field: string;
    width: number;
    widthUnit: WidthUnitType;
    formatter: (cellData, cellIndex: number, rowData, rowIndex: number) => string;
    sortable: boolean;
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
    data: GridCell[];
}
