import { Component, Input, ElementRef } from '@angular/core';
import { GridRow } from '../models/GridModels';
import { SelectService } from '../services/SelectService';
import { DndService } from '../services/DndService';
import { DragSourceModel, DropTargetModel } from '../models/DndModels';

@Component({
	templateUrl: "./templates/Row.html",
	selector: "[awgrid-tr]",
	host: {
		'class': 'tr',
		'[class.selected]': 'model.selected',
		'(click)': 'onRowClick(model, $event)',
		'(dblclick)': 'onDoubleClick(model, $event)',
		'[attr.draggable]': "model.draggable",
		'(dragstart)': "onDragStart($event)",
		'(dragEnd)': "onDragEnd($event)"
	}
})
export class Row {
	@Input() model: GridRow;

	constructor(public ele: ElementRef, public selectService: SelectService,
		public dndService: DndService) {
	}

	ngAfterViewInit() {
		this.selectService.onRowCreate.emit({
			model: this.model,
			node: this.ele
		});
	}

	ngOnDestroy() {
		this.selectService.onRowDestroy.emit({
			model: this.model,
			node: this.ele
		});
	}

	onRowClick(row: GridRow, evt: MouseEvent) {
		if (evt.ctrlKey) {
			this.selectService.additionalSelect(row);
		}
		else if (evt.shiftKey) {
			this.selectService.endSelect(row);
		}
		else {
			this.selectService.select(row);
		}
	}

	onDoubleCLick(row: GridRow, evt: MouseEvent) {
		if (row)
			this.selectService.onDoubleClick.emit(row);
	}

	onDragStart(evt: DragEvent) {
		if (this.dndService.dragDisabled) {
			evt.preventDefault();
			return;
		}

		var dragSourceModel = new DragSourceModel(this.dndService.dragSourceType,
			evt, this.model);

		evt.dataTransfer.effectAllowed = "move";
		//bypass firefox not able to drag issue
		evt.dataTransfer.setData("Text", this.model.id);

		this.dndService.onDragStart.emit(dragSourceModel);
	}

	onDragEnd(evt: DragEvent) {
		if (this.dndService.dragDisabled)
			return;

		var dragSourceModel = new DragSourceModel(this.dndService.dragSourceType,
			evt, this.model);

		this.dndService.onDragEnd.emit(dragSourceModel);
	}
}