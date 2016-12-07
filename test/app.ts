import { Component, Input, Output } from '@angular/core';
import { AwGrid } from '../src/components/AwGrid';
import { WidthUnitType } from '../src/models/enums';
import { GridColumnDef } from '../src/models/GridModels';
import { GridDataServiceBase } from '../src/services/GridDataService';
import { TestGridDataService } from './TestGridDataService';

@Component({
	template: `
	<aw-grid [idField]="'1'" [columnsDef]="colsDef" [pageSize]="60"
		[height]="'400px'">
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
export class TestApp {
	colsDef : GridColumnDef[] = Array.from({length: 5}, (v, k) => {
		var colDef = {
			field: k + "",
			label: "Column " + k ,
			sortable: true,
			widthUnit: WidthUnitType.px
		} as GridColumnDef;

		if (k < 4)
			colDef.width = 200;

		return colDef;
	});
}