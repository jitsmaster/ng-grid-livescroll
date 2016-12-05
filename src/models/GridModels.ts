import { WidthUnitType } from './enums';

export class GridColumnDef {
	label: string;
	field: string;
	width: number;
	widthUnit: WidthUnitType;
	formatter: (cellData, cellIndex: number, rowData, rowIndex: number) => string;
	sortable: boolean;
}

export class GridDataRequest {
	page: number;
	pageSize: number
}

export class GridDataResponse {
	totalCount: number;
	page: number;
	idField: string;
	rows: any[]
}

export class GridCell {
	colDef: GridColumnDef;
	value: string;
}

export class GridRow {
	id: string;
	data: GridCell[]
}