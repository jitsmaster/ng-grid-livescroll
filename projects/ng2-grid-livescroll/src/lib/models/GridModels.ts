import { WidthUnitType } from './enums';
import { AsyncPipeService } from '../Services/AsyncPipeService';
import { ElementRef, Injectable } from "@angular/core";


export class GridColumnDef {
	label: string;
	field: string;
	width: number;
	cellWidth: number;
	minWidth: number;
	widthUnit: WidthUnitType;
	formatter: (cellData, cellIndex: number, rowData, rowIndex: number) => string;
	sortable: boolean;
}

export class GridColumnResizeModel {
	colDef: GridColumnDef;
	columnDomNode: HTMLElement;
	mouseLeft: number;
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
	index: number;
	// selected: AsyncPipeService<boolean> = new AsyncPipeService<boolean>(false);
	selected: boolean = false;
	data: GridCell[];
	rawData: any;
	draggable: boolean = false;
}

export class GridRowEventModel {
	model: GridRow;
	node: ElementRef
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

export class GridClickEventModel {
	cell: GridCell;
	row: GridRow;
	domNode: HTMLElement;
}