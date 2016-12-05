import { Component, Input, ElementRef } from '@angular/core';
import { GridColumnDef, GridCell} from '../models/GridModels';
import { WidthUnitType } from '../models/enums';

@Component({
	templateUrl:"./templates/awgrid_cell.html",
	selector: "[awgrid-td]",
	host: {
		'[style.width]': 'colWidth'
	}
})
export class Cell {

	@Input() model : GridCell;

	get colWidth(): string {
		return this.model.colDef.width 
			+ (this.model.colDef.widthUnit == WidthUnitType.px ? "px" : "%");
	}

	get value(): string {
		return this.model.value;
	}
}