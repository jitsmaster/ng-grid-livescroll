Installation:

>npm install ng2-grid-livescroll -save

Create data service for grid:

import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { GridDataServiceBase, GridDataResponse } from 'ng2-grid-livescroll/Grid';

export class ActualGridDataService extends GridDataServiceBase {

	private gridDataObs = this._gridDataSubj.asObservable();

	requestData(page: number, pageSize: number,
		sortField: string, sortDsc: boolean): Observable<GridDataResponse> {
		
		var pageData: Observable<GridDataResponse>;
		//implementation to return observable

		return pageData
	}
}

Create grid wrapper component to use the data service:

import { Component, Input, Output, ViewChild, NgZone, EventEmitter } from '@angular/core';
import { AwGrid, GridColumnDef, GridDataServiceBase, GridRow } from 'ng2-grid-livescroll/Grid';
import { ActualGridDataService } from '../../services/Grid/ActualGridDataService';

@Component({
	template: `
	<aw-grid [idField]="'Version'" [columnsDef]="colsDef" 
		[pageSize]="100" [height]="'100%'"
		(onSelect)="select($event)"
		[selectionMode]="0">
	</aw-grid>
	`,
	providers: [{
		provide: GridDataServiceBase,
		useClass: ActualGridDataService
	}]
})
export class ActualGridWrapper {
	@Input() colsDef: GridColumnDef[];
	@ViewChild(AwGrid) grid: AwGrid;
	@Output() onSelect: EventEmitter<GridRow> = new EventEmitter<GridRow>();

	constructor(public zone: NgZone) {
	}

	select(rows: GridRow[]) {
		this.onSelect.emit(rows.length > 0 ? rows[0] : null);
	}

	refresh() {
		this.grid.refresh()
	}
}