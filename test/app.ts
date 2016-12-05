import { Component, Input, Output } from '@angular/core';
import { AwGrid } from '../src/components/AwGrid';
import { WidthUnitType } from '../src/models/enums';
import { GridColumnDef } from '../src/models/GridModels';
import { GridDataServiceBase } from '../src/services/GridDataService';
import { TestGridDataService } from './TestGridDataService';

@Component({
	template: `
	<aw-grid [idField]="'1'" [columnsDef]="colsDef" [pageSize]="10"
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
		return {
			field: k + "",
			label: "Column " + k ,
			sortable: true,
			width: 200,
			widthUnit: WidthUnitType.px
		} as GridColumnDef;
	});
}