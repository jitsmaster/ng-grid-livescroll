import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AwGrid } from '../src/components/AwGrid';
import { WidthUnitType } from '../src/models/enums';
import { GridColumnDef, GridRow } from '../src/models/GridModels';
import { GridDataServiceBase } from '../src/services/GridDataService';
import { TestGridDataService } from './TestGridDataService';

@Component({
	template: `
	<button (click)="refresh()">Refresh</button>
	<aw-grid [idField]="'1'" [columnsDef]="colsDef" [pageSize]="60"
		[height]="'400px'"
		[selected]="['0-41', '0-11']"
		[selectionMode]="0"
		(onSelect)="onSelect($event)">
	</aw-grid>
	<div style="height: 400px">
		<div *ngFor="let log of logs | async">
			{{log}}
		</div>
	</div>
	`,
	selector: "test-app",
	providers: [
		{
			provide: GridDataServiceBase,
			useClass: TestGridDataService
		}
	]
})
export class TestApp {
	_logs: string[] = [];
	logs: EventEmitter<string[]> = new EventEmitter<string[]>();
	colsDef: GridColumnDef[] = Array.from({ length: 5 }, (v, k) => {
		var colDef = {
			field: k + "",
			label: "Column " + k,
			sortable: true,
			width: 200,
			minWidth: 200,
			widthUnit: WidthUnitType.px,
			formatter: (cellData, cellIndex, rowData, rowIndex) => {
				return cellData + "<span>Row:" + rowIndex + " - Cell: " + cellIndex + "</span>"
			}
		} as GridColumnDef;

		return colDef;
	});

	onSelect(rows: GridRow[]) {
		this._logs.push("Selected: " + rows.map(r => r.id).join(", "));
		this.logs.emit(this._logs);
	}

	@ViewChild(AwGrid) grid: AwGrid;

	refresh() {
		this.grid.refresh();
	}
}