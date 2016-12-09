import { Component, Input, ElementRef } from '@angular/core';
import { GridRow } from '../models/GridModels';
import { SelectService } from '../services/SelectService';

@Component({
	templateUrl: "./templates/Row.html",
	selector: "[awgrid-tr]",
	host: {
		'class': 'tr',
		'[class.selected]': 'model.selected',
		'(click)': 'onRowClick(model, $event)'
	}
})
export class Row {
	@Input() model: GridRow;

	constructor(public ele: ElementRef, public selectService: SelectService) {
	}
	
	onRowClick(row: GridRow, evt: MouseEvent) {
		if (evt.ctrlKey) {
			this.selectService.additionalSelect(row);
		}
		else if (evt.shiftKey) {
			//todo: figure out how to deal with the range select across pages
		}
		else {
			this.selectService.select(row);
		}
	}
}