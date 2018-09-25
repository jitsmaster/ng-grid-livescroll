import { Directive, ElementRef, Input } from '@angular/core';
import { GridColumnDef, GridColumnResizeModel } from '../models/GridModels';
import { ColumnResizeService } from '../services/ColumnResizeService';

@Directive({
	selector: "[resizer]",
	host: {
		'(mousedown)': "startColumnResizing($event)",
	}
})
export class ResizerPlaceHolder {
	columnDomNode: HTMLElement;

	constructor(public ele: ElementRef, private colResizeService: ColumnResizeService) {
		this.columnDomNode = (ele.nativeElement as HTMLElement).parentElement;
	}

	startColumnResizing(evt: MouseEvent) {
		evt.stopPropagation();
		evt.preventDefault();
		
		this.colResizeService.onColumnResizeStart.emit({
			colDef: this.ColumnDef,
			columnDomNode: this.columnDomNode,
			mouseLeft: evt.pageX
		});
		this.colResizeService.resizingColumn = this.ColumnDef;
	}

	@Input('resizer') ColumnDef: GridColumnDef;
}