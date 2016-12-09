import { WidthUnitType } from './enums';
import { AsyncPipeService } from '../Services/AsyncPipeService';

export class GridColumnDef {
	label: string;
	field: string;
	width: number;
	minWidth: number;
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
	// selected: AsyncPipeService<boolean> = new AsyncPipeService<boolean>(false);
	selected: boolean = false;
	data: GridCell[]
}

export class SortState {
	sorting: boolean;
	descending: boolean;
	column: GridColumnDef;
}

export class SelectItemsState {
	ids: string[];
}

export class SelectRangeState {
	fromPage: number;
	toPage: number;
	fromPageRow: number;
	toPageRow: number;
}