import { Component, Input, ElementRef } from '@angular/core';
import { GridColumnDef } from '../models/GridModels';
import { WidthUnitType } from '../models/enums';

@Component({
	templateUrl:"./templates/awgrid_column.html",
	selector:"[aw-grid-head-col]",
	host: {
		'[style.width]': 'colWidth'
	}
})
export class HeaderColumn {

	@Input() model : GridColumnDef;

	get colWidth(): string {
		return this.model.width 
			+ (this.model.widthUnit == WidthUnitType.px ? "px" : "%");
	}

	get label(): string {
		return this.model.label;
	}
}