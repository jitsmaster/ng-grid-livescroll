import { Component, Input, ElementRef } from '@angular/core';
import { GridColumnDef, GridCell } from '../models/GridModels';
import { WidthUnitType } from '../models/enums';

@Component({
	templateUrl: "./templates/Cell.html",
	selector: "[awgrid-td]",
	host: {
		'[style.width]': 'colWidth',
		'[style.minWidth]': 'colWidth',
		'[style.maxWidth]': 'colWidth'
	}
})
export class Cell {

	@Input() model: GridCell;

	get minWidth(): string {
		if (this.model.colDef.minWidth)
			return this.model.colDef.minWidth
				+ (this.model.colDef.widthUnit == WidthUnitType.px ? "px" : "%");
		else return this.colWidth;
	}

	get colWidth(): string {
		if (this.model.colDef.width)
			return this.model.colDef.width
				+ (this.model.colDef.widthUnit == WidthUnitType.px ? "px" : "%");
	}

	get value(): string {
		return this.model.value;
	}
}