import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AwGrid } from '../src/components/AwGrid';
import { WidthUnitType } from '../src/models/enums';
import { GridColumnDef, GridRow } from '../src/models/GridModels';
import { GridDataServiceBase } from '../src/services/GridDataService';
import { TestGridDataService } from './TestGridDataService';
import { DndService } from '../src/services/DndService';

@Component({
	template: `
	<div style="float:left;width:45%;margin-right:5%">
		<aw-grid [idField]="'1'" [columnsDef]="colsDef" [pageSize]="30"
			[height]="'90%'"
			[selected]="['0-41', '0-11']"
			[selectionMode]="1"
			[allowDrag]="true"
			[dragSourceType]="'grid1'"
			[acceptDropTypes]="'grid2'"
			[allowDrop]="true"
			(onSelect)="onSelect('grid1', $event)">
		</aw-grid>
	</div>
	<div style="float:left;width:45%">
		<aw-grid [idField]="'1'" [columnsDef]="colsDef" [pageSize]="30"
			[height]="'90%'"
			[selected]="['0-41', '0-11']"
			[selectionMode]="1"
			[allowDrag]="true"
			[dragSourceType]="'grid2'"
			[acceptDropTypes]="'grid1'"
			[allowDrop]="true"			
			(onSelect)="onSelect('grid1', $event)">
		</aw-grid>
	</div>
	`,
	selector: "test-app",
	providers: [
		DndService,
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
			minWidth: 100,
			widthUnit: WidthUnitType.px,
			formatter: (cellData, cellIndex, rowData, rowIndex) => {
				return cellData + "<span>Row:" + rowIndex + " - Cell: " + cellIndex + "</span>"
			}
		} as GridColumnDef;

		return colDef;
	});

	onSelect(gridName: string, rows: GridRow[]) {
		// this._logs.push("Grid " + gridName + " Selected: " + rows.map(r => r.id).join(", "));
		// this.logs.emit(this._logs);
	}

	@ViewChild(AwGrid) grid: AwGrid;

	refresh() {
		this.grid.refresh();
	}
}