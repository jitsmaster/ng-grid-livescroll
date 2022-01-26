import { Injectable, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { WidthUnitType } from '../models/enums';
import { GridColumnDef, GridDataRequest, GridDataResponse, GridRow } from '../models/GridModels';
import { GridDataServiceBase } from './GridDataService';
import { SelectService } from './SelectService';
import { AsyncPipeService } from './AsyncPipeService';


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
		public gridService: ReactiveGridService,
		public columnsDef: GridColumnDef[],
		public idField: string,
		public pageSize: number,
		public pageIndex: number,
		public rowsCount: number) {
	}

	rowsState: GridRow[];

	//this is kind of change detection within Observable
	private _currentRowsData: any[];

	loading() {
		//create stubbing rows with no cells
		this._rowsSubject.next(Array.from({ length: this.rowsCount }, (v, k) => {
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
					value: `<span class="fa fa-spinner fa-pulse"></span>`
				}]
			} as GridRow;
		}));
	}

	setData(rowsData: any[]) {
		//prevent setting page data repeatedly
		if (!this.clientDataFullfilled || this._currentRowsData != rowsData) {
			this.rowsState = rowsData.map((rowData, rowIndex) => {
				var actualRowIndex = this.pageSize * this.pageIndex + rowIndex;
				const id = rowData[this.idField];
				return {
					id: id,
					index: actualRowIndex,
					selected: this.gridService.selectedIds.indexOf(id) > -1,
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
			})
				.filter(r => this._removedIds.indexOf(r.id) < 0);

			this._rowsSubject.next(this.rowsState);

			this._currentRowsData = rowsData

			this.clientDataFullfilled = true;
		};
	}

	clear() {
		this.rowsState = [];
		this._rowsSubject.next(this.rowsState);
		this.clientDataFullfilled = false;
	}

	addRows(rows: GridRow[], addToBottom?: boolean) {
		this.rowsState = addToBottom ?
			this.rowsState.concat(rows) :
			rows.concat(this.rowsState);

		this._rowsSubject.next(this.rowsState);
	}

	private _removedIds: string[] = [];

	removeRows(rows: GridRow[]) {
		if (!this.rowsState)
			return;

		this._removedIds = this._removedIds.concat(
			rows.map(r => r.id));
		this.rowsState = this.rowsState
			.filter(r => {
				return !rows.find(rr => rr === r);
			});

		this._rowsSubject.next(this.rowsState);
	}
}

@Injectable()
export class ReactiveGridService {
	private _allowDrag = false;

	requestedPages: number[] = [];

	public selectService: SelectService;

	set allowDrag(val: boolean) {
		this._allowDrag = true;
		this.pageServices.forEach(page => page.allowDrag = val);
	}

	constructor(
		public dataService: GridDataServiceBase,
		public changeDetector: ChangeDetectorRef) {
	}

	initialize(pageSize: number, columnsDef: GridColumnDef[], idField: string) {
		this.pageSize = pageSize;
		this.columnsDef = columnsDef;
		this.idField = idField;
		this.allRows = null;
	}

	pageSize: number = 100;
	currentPages: number[] = [];
	columnsDef: GridColumnDef[];
	idField: string;

	totalCount: number;

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

	teardowns: Subscription[] = [];

	refresh() {
		this.isFirstRequest = true;
		this.requestedPages = [];
		this.changePages([0], "", false, this.selectedIds);
	}

	addRows(rows: GridRow[], toEnd?: boolean) {
		if (!rows || !rows.length)
			return;

		//add to the end of listing, which means the last page
		if (!this.pageServices.length) {
			var pageService = new ReactiveGridPageService(
				this,
				this.columnsDef,
				this.idField,
				this.pageSize,
				0,
				rows.length);
			pageService.allowDrag = this._allowDrag;
			this.pageServices = [pageService];
			this._pagesSubject.next(this.pageServices);
		}

		var lastPage = this.pageServices[this.pageServices.length - 1];
		if (!lastPage.rowsState) {
			var obs = this.dataService.requestData(this.pageServices.length - 1, this.pageSize, this.sortField, this.sortDsc);
			var t = obs.subscribe(resp => {
				lastPage.setData(resp.rows);
				lastPage.addRows(rows, toEnd);
			});
		}
		else
			lastPage.addRows(rows, toEnd);
	}

	removeRows(rows: GridRow[]) {
		var visitedPages = this.pageServices.filter(p => !!p.rowsState)
			.forEach(p => p.removeRows(rows));
	}

	initialRequestDone: EventEmitter<boolean> = new EventEmitter<boolean>();

	changePages(pagesToLoad: number[],
		sortField: string, sortDsc: boolean, selectedIds?: string[]) {
		if (!pagesToLoad) {
			pagesToLoad = [0];
		}

		if (sortField != this.sortField
			|| sortDsc != this.sortDsc) {
			this.isFirstRequest = true;
		}

		if (this.isFirstRequest) {
			//very first request, reset current pages
			this.currentPages = [];
		}

		if (this.currentPages && this.currentPages.length > 0) {
			var pagesToClear = this.currentPages
				.filter(p => pagesToLoad.indexOf(p) == -1);

			var pagesToAdd = pagesToLoad
				.filter(p => this.currentPages.indexOf(p) == -1);

			//clear the pages to clear
			pagesToClear.forEach(p => this.pageServices[p].clear());

			if (pagesToAdd.length > 0)
				this.requestData(
					sortField,
					sortDsc,
					selectedIds,
					pagesToAdd);
		}
		else {
			this.requestData(
				sortField,
				sortDsc,
				selectedIds,
				pagesToLoad);
		}

		this.currentPages = pagesToLoad;

	}

	requestData(sortField: string, sortDsc: boolean, selectedIds?: string[],
		pagesToRequest?: number[]) {

		if (selectedIds)
			this.selectedIds = selectedIds;

		//preventing requesting the same page twice
		var actualPagesToRequest = pagesToRequest;

		//if all rows already set, use it directly,
		//this is the client side live scroll
		// if (this.allRows) {

		// 	actualPagesToRequest.forEach(p => {
		// 		var pageRows = this.allRows
		// 			.filter((v, k) => k >= p * this.pageSize
		// 				&& k < (p + 1) * this.pageSize);

		// 		this.pageServices[p].setData(pageRows);
		// 	});
		// }
		// else {
		this.sortField = sortField;
		this.sortDsc = sortDsc;

		var pageRequests = actualPagesToRequest.map(
			p => {
				return {
					page: p,
					request: this.dataService.requestData(p, this.pageSize, sortField, sortDsc)
				};
			});

		//show loading to server side pagination
		if (this.pageServices && this.pageServices.length > 0) {
			pageRequests.forEach(p => {
				if (p.page < this.pageServices.length) {
					var pageService = this.pageServices[p.page];
					if (pageService) {
						pageService.loading();
					}
				}
			});

			this.changeDetector.detectChanges();
		}

		this.teardowns = pageRequests.map(pReq => {
			return pReq.request
				.subscribe(resp => {
					if (!resp || !resp.rows)
						return;

					this.totalCount = resp.totalCount;


					if (this.isFirstRequest) {
						var lastPageSize = resp.totalCount % this.pageSize || this.pageSize;
						var pages = Math.ceil(resp.totalCount / this.pageSize);

						this.pageServices = Array.from({ length: pages }, (v, k) => {
							var s = new ReactiveGridPageService(
								this,
								this.columnsDef,
								this.idField,
								this.pageSize,
								k,
								resp.page == pages - 1 ? lastPageSize : this.pageSize);
							s.allowDrag = this._allowDrag;
							return s;
						});

						this._pagesSubject.next(this.pageServices);

						this.isFirstRequest = false;
						this.changeDetector.detectChanges();
					}

					//if all rows are returned, set them directly, otherwise, set the first one
					if (resp.rows && resp.rows.length > 0) {
						// if (resp.rows.length == resp.totalCount) {
						// 	//set all rows
						// 	this.allRows = resp.rows;
						// }

						this._setPageData(resp);
					}
					else
						this.initialRequestDone.emit(true);

				});
		});
		// }
	}

	private _setPageData(resp: GridDataResponse) {
		if (resp.rows.length <= this.pageSize) {
			this.pageServices[resp.page].setData(resp.rows);
			var selectedRows: GridRow[] = [];
			if (this.selectedIndexes && this.selectedIndexes.length > 0) {
				var selectedRows = this.pageServices[resp.page]
					.rowsState
					.filter(r => this.selectedIndexes.find(idx => r.index == idx));
			}
			else if (this.selectedIds && this.selectedIds.length > 0) {
				var selectedRows = this.pageServices[resp.page]
					.rowsState
					.filter(r => this.selectedIds.find(id => r.id == id));
			}
			if (selectedRows.length > 0)
				selectedRows.forEach(r => this.selectService.markAsSelected(r));

			this.initialRequestDone.emit(true);
			this.changeDetector.detectChanges();
		}
		else
			throw new Error("Invalid grid data: Page data overflow.");
	}
}