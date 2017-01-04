import { Injectable, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { WidthUnitType } from '../models/enums';
import { GridColumnDef, GridDataRequest, GridDataResponse, GridRow } from '../models/GridModels';
import { GridDataServiceBase } from './GridDataService';
import { SelectService } from './SelectService';
import { AsyncPipeService } from './AsyncPipeService';

@Injectable()
export class ReactiveGridPageService {
	protected _rowsSubject = new BehaviorSubject<GridRow[]>([]);
	rows = this._rowsSubject.asObservable();

	private _allowDrag = false;
	set allowDrag(val: boolean) {
		this._allowDrag = true;
		if (this.rowsState)
			this.rowsState.forEach(r => r.draggable = val);
	}

	get allowDrag(): boolean {
		return this._allowDrag;
	}

	clientDataFullfilled = false;

	constructor(
		public columnsDef: GridColumnDef[],
		public idField: string,
		public pageSize: number,
		public pageIndex: number,
		public rowsCount: number) {

		//create stubbing rows with no cells
		this._rowsSubject.next(Array.from({ length: rowsCount }, (v, k) => {
			return {
				id: "",
				// selected: new AsyncPipeService<boolean>(false),
				selected: false,
				data: [{
					colDef: {
						field: "id",
						width: 100,
						widthUnit: WidthUnitType.percent
					} as GridColumnDef,
					value: ""
				}]
			} as GridRow;
		}));
	}

	rowsState: GridRow[];

	//this is kind of change detection within Observable
	private _currentRowsData: any[];

	setData(rowsData: any[]) {
		//prevent setting page data repeatedly
		if (!this.clientDataFullfilled || this._currentRowsData != rowsData) {
			this.rowsState = rowsData.map((rowData, rowIndex) => {
				var actualRowIndex = this.pageSize * this.pageIndex + rowIndex;
				return {
					id: rowData[this.idField],
					index: actualRowIndex,
					// selected: new AsyncPipeService<boolean>(false),
					selected: false,
					data: this.columnsDef.map((colDef, colIndex) => {
						var value = colDef.formatter ? colDef.formatter(
							rowData[colDef.field], colIndex,
							rowData, actualRowIndex) : rowData[colDef.field] + "";

						return {
							colDef: colDef,
							value: value
						};
					}),
					draggable: this._allowDrag,
					rawData: rowData
				} as GridRow;
			});
			this._rowsSubject.next(this.rowsState);

			this._currentRowsData = rowsData

			this.clientDataFullfilled = true;
		};
	}

	addRows(rows: GridRow[], addToBottom?: boolean) {
		this.rowsState = addToBottom ?
			this.rowsState.concat(rows) :
			rows.concat(this.rowsState);

		this._rowsSubject.next(this.rowsState);
	}
}

@Injectable()
export class ReactiveGridService {
	private _allowDrag = false;

	requestedPages: number[] = [];

	set allowDrag(val: boolean) {
		this._allowDrag = true;
		this.pageServices.forEach(page => page.allowDrag = val);
	}

	constructor(public dataService: GridDataServiceBase) {
	}

	initialize(pageSize: number, columnsDef: GridColumnDef[], idField: string) {
		this.pageSize = pageSize;
		this.columnsDef = columnsDef;
		this.idField = idField;
		this.allRows = null;
	}

	pageSize: number = 100;
	currentPage: number = 0; s
	columnsDef: GridColumnDef[];
	idField: string;

	isFirstRequest: boolean = true;

	pageServices: ReactiveGridPageService[] = [];
	allRows: any[];

	protected _pagesSubject: BehaviorSubject<ReactiveGridPageService[]>
	= new BehaviorSubject<ReactiveGridPageService[]>([]);
	pages: Observable<ReactiveGridPageService[]> = this._pagesSubject.asObservable();

	sortField: string;
	sortDsc: boolean;

	selectedIndexes: number[] = [];
	selectedIds: string[] = [];

	refresh() {
		this.isFirstRequest = true;
		this.requestedPages = [];
		this.requestData("", false);
	}

	requestData(sortField: string, sortDsc: boolean, selectedIds?: string[]) {
		if (sortField != this.sortField
			|| sortDsc != this.sortDsc) {
			this.isFirstRequest = true;
			this.requestedPages = [];
		}

		this.sortField = sortField;
		this.sortDsc = sortDsc;
		this.selectedIds = selectedIds;

		//preventing requesting the same page twice
		if (this.requestedPages.indexOf(this.currentPage) > -1)
			return;

		this.requestedPages.push(this.currentPage);

		//if all rows already set, use it directly,
		//this is the client side live scroll
		if (this.allRows) {

			if (!this.pageServices[this.currentPage].clientDataFullfilled) {
				var pageRows = this.allRows
					.filter((v, k) => k >= this.currentPage * this.pageSize
						&& k < (this.currentPage + 1) * this.pageSize);

				this.pageServices[this.currentPage].setData(pageRows);
			}
		}

		this.dataService.requestData(this.currentPage, this.pageSize, sortField, sortDsc)
			.subscribe(resp => {
				if (!resp || !resp.rows)
					return;

				if (this.isFirstRequest) {
					var lastPageSize = resp.totalCount % this.pageSize || this.pageSize;
					var pages = Math.ceil(resp.totalCount / this.pageSize);

					this.pageServices = Array.from({ length: pages }, (v, k) => {
						var s = new ReactiveGridPageService(
							this.columnsDef,
							this.idField,
							this.pageSize,
							this.currentPage,
							pages - 1 ? lastPageSize : this.pageSize);
						s.allowDrag = this._allowDrag;
						return s;
					});

					this._pagesSubject.next(this.pageServices);

					this.isFirstRequest = false;
				}

				//if all rows are returned, set them directly, otherwise, set the first one
				if (resp.rows && resp.rows.length > 0) {
					if (resp.rows.length == resp.totalCount) {
						//set all rows
						this.allRows = resp.rows;
					}

					if (resp.rows.length <= this.pageSize) {
						this.pageServices[this.currentPage].setData(resp.rows);
						var selectedRows: GridRow[] = [];

						if (this.selectedIndexes && this.selectedIndexes.length > 0) {
							var selectedRows = this.pageServices[this.currentPage]
								.rowsState
								.filter(r => this.selectedIndexes.find(idx => r.index == idx));
						}
						else if (this.selectedIds && this.selectedIds.length > 0) {
							var selectedRows = this.pageServices[this.currentPage]
								.rowsState
								.filter(r => this.selectedIds.find(id => r.id == id));
						}

						if (selectedRows.length > 0)
							selectedRows.forEach(r => r.selected = true);
					}
					else
						throw new Error("Invalid grid data: Page data overflow.");
				}
			});
	}
}