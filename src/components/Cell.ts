import { Component, Input, ElementRef, Output } from '@angular/core';
import { GridColumnDef, GridCell, GridRow, GridClickEventModel } from '../models/GridModels';
import { WidthUnitType } from '../models/enums';
import { SelectService } from '../services/SelectService';

@Component({
	templateUrl: "./templates/Cell.html",
	selector: "[awgrid-td]",
	host: {
		'[style.width]': 'colWidth',
		'[style.minWidth]': 'colWidth',
		'[style.maxWidth]': 'colWidth',
		'(click)': 'onCellClick(model, rowModel, $event)',
	}
})
export class Cell {

	constructor(private selectService: SelectService) {
	}

	@Input() model: GridCell;
	@Input() rowModel: GridRow;

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

	onCellClick(cell: GridCell, row: GridRow, evt: MouseEvent) {
		var evtModel: GridClickEventModel = {
			cell: cell,
			row: row,
			domNode: evt.target
		} as GridClickEventModel;

		this.selectService.onClick.emit(evtModel);
	}
}