import { Component, Input, ElementRef } from '@angular/core';
import { GridColumnDef } from '../models/GridModels';
import { WidthUnitType } from '../models/enums';

@Component({
	templateUrl: "./templates/awgrid_column.html",
	selector: "[aw-grid-head-col]",
	host: {
		'[style.width]': 'colWidth',
		'[style.minWidth]': 'colWidth',
		'[style.maxWidth]': 'colWidth'
	}
})
export class HeaderColumn {

	@Input() model: GridColumnDef;

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
}