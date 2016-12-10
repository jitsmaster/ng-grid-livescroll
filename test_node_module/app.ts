import { Component, Input, Output } from '@angular/core';
import { AwGrid, WidthUnitType, GridColumnDef, GridDataServiceBase } from 'Ng2-Grid-LiveScroll';
import { TestGridDataService } from './TestGridDataService';

@Component({
	template: `
	<aw-grid [idField]="'1'" [columnsDef]="colsDef" [pageSize]="60"
		[height]="'400px'"
		[selected]="['0-41', '0-11']">
	</aw-grid>
	`,
	selector: "test-app",
	providers: [
		{
			provide: GridDataServiceBase,
			useClass: TestGridDataService
		}
	]
})
export class ModuleTestApp {
	colsDef : GridColumnDef[] = Array.from({length: 5}, (v, k) => {
		var colDef = {
			field: k + "",
			label: "Column " + k ,
			sortable: true,
			width: 200,
			minWidth: 200,
			widthUnit: WidthUnitType.px
		} as GridColumnDef;

		return colDef;
	});
}