import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { WidthUnitType } from '../models/enums';
import { GridColumnDef, GridDataRequest, GridDataResponse, GridRow } from '../models/GridModels';
import { GridDataServiceBase } from './GridDataService';
import { AsyncPipeService } from './AsyncPipeService';

@Injectable()
export class ReactiveGridPageService {
	protected _rowsSubject = new BehaviorSubject<GridRow[]>([]);
	rows = this._rowsSubject.asObservable();

	clientDataFullfilled = false;

	constructor(
		public columnsDef: GridColumnDef[],
		public idField: string,
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

	setData(rowsData: any[]) {
		//prevent setting page data repeatedly
		if (!this.clientDataFullfilled)
			this._rowsSubject.next(rowsData.map((rowData, rowIndex) => {
				return {
					id: rowData[this.idField],
					// selected: new AsyncPipeService<boolean>(false),
					selected: false,
					data: this.columnsDef.map((colDef, colIndex) => {
						var value = colDef.formatter ? colDef.formatter(
							rowData[colDef.field], colIndex,
							rowData, rowIndex) : rowData[colDef.field] + "";

						return {
							colDef: colDef,
							value: value
						};
					})
				};
			}));

		this.clientDataFullfilled = true;
	}
}

@Injectable()
export class ReactiveGridService {
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

	requestData(sortField: string, sortDsc: boolean) {
		if (sortField != this.sortField
			|| sortDsc != this.sortDsc)
			this.isFirstRequest = true;

		this.sortField = sortField;
		this.sortDsc = sortDsc;

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

				if (this.isFirstRequest) {
					var lastPageSize = resp.totalCount % this.pageSize || this.pageSize;
					var pages = Math.ceil(resp.totalCount / this.pageSize);

					this.pageServices = Array.from({ length: pages }, (v, k) =>
						new ReactiveGridPageService(
							this.columnsDef,
							this.idField,
							pages - 1 ? lastPageSize : this.pageSize));

					this._pagesSubject.next(this.pageServices);

					this.isFirstRequest = false;
				}

				//if all rows are returned, set them directly, otherwise, set the first one
				if (resp.rows && resp.rows.length > 0) {
					if (resp.rows.length == resp.totalCount) {
						//set all rows
						this.allRows = resp.rows;
					}

					if (resp.rows.length <= this.pageSize)
						this.pageServices[this.currentPage].setData(resp.rows);
					else
						throw new Error("Invalid grid data: Page data overflow.");
				}
			})
	}
}