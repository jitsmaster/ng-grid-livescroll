import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { GridColumnDef, SortState } from '../models/GridModels';
import { WidthUnitType } from '../models/enums';
import { AsyncPipeService } from '../services/AsyncPipeService';
import { ReactiveGridService } from '../services/GridReactiveServices';
import { SortingService } from '../services/SortingService';

@Component({
	templateUrl: "./templates/HeaderColumn.html",
	selector: "[aw-grid-head-col]",
	host: {
		'[style.width]': 'colWidth',
		'[style.minWidth]': 'colWidth',
		'[style.maxWidth]': 'colWidth',
		'(mouseup)': 'sort($event)'
	}
})
export class HeaderColumn {

	@Input() model: GridColumnDef;

	constructor(public gridReactiveService: ReactiveGridService,
		public sortingService: SortingService) {
	}

	get minWidth(): string {
		if (this.model.minWidth)
			this.model.minWidth
				+ (this.model.widthUnit == WidthUnitType.px ? "px" : "%");
		else
			return this.colWidth;
	}

	get colWidth(): string {
		if (this.model.width)
			return this.model.width
				+ (this.model.widthUnit == WidthUnitType.px ? "px" : "%");
	}

	get label(): string {
		return this.model.label;
	}

	sort(evt: MouseEvent) {
		if (!this.model.sortable) {
			return;
		}

		this.sortingService.sort(this.model);
		this.gridReactiveService.requestData(this.model.field, this.sortingService.sortState.currentState.descending);
	}
}