import { Directive, EventEmitter, ElementRef, Output, Input, ViewChildren } from '@angular/core';
import { GridColumnDef, GridColumnResizeModel, } from '../models/GridModels';
import { WidthUnitType } from '../models/enums';
import { ColumnResizeService } from '../services/ColumnResizeService';

@Directive({
	selector: "[column-resizer]",
	host: {
		'(document:mousemove)': "onColumnHeadersMouseMove($event)",
		'(document:mouseup)': "confirmColumnResizing($event)"
	}
})
export class ColumnResizer {
	@Output() onColumnResizing: EventEmitter<GridColumnResizeModel> = new EventEmitter<GridColumnResizeModel>();

	private columnToResize: GridColumnResizeModel = null;

	lastMouseLeft: number;

	constructor(private ele: ElementRef, private colResizeService: ColumnResizeService) {
		colResizeService.onColumnResizeStart.subscribe((colDef: GridColumnResizeModel) => {
			this.onColumnResizing.emit(colDef);
			this.columnToResize = colDef;
			this.lastMouseLeft = colDef.mouseLeft;
		});
	}

	onColumnHeadersMouseMove(evt: MouseEvent) {
		evt.stopPropagation();
		evt.preventDefault();

		var mouseLeft = evt.pageX;
		var widthDiff = mouseLeft - this.lastMouseLeft;
		this.lastMouseLeft = mouseLeft;

		if (!!this.columnToResize) {
			//use mouse position diffing to get the width
			this.columnToResize.colDef.width = Math.max(this.columnToResize.colDef.width + widthDiff,
				this.columnToResize.colDef.minWidth);
			this.columnToResize.colDef.widthUnit = WidthUnitType.px;
		}
	}

	confirmColumnResizing(evt: MouseEvent) {
		evt.stopPropagation();
		evt.preventDefault();

		this.columnToResize = null;
		this.onColumnResizing.emit(null);
		this.colResizeService.onColumnResizeEnd.emit(true);
	}
}