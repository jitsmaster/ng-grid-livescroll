import { Output, EventEmitter, Directive } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { GridRow } from '../models/GridModels';
import { DragSourceModel, DropTargetModel } from '../models/DndModels';

@Directive()
export class DndService {
	dragDisabled: boolean;
	dropDisabled: boolean;

	dragSourceType: string;
	allowedDragSourceTypes: string[] = [];

	set acceptTypes(val: string) {
		this.allowedDragSourceTypes = val.split(',')
			.filter(t => !!t);
	}

	@Output() onDragStart = new EventEmitter<DragSourceModel<any>>();
	@Output() onDragEnd = new EventEmitter<DragSourceModel<any>>();

	dragState: any[];

	@Output() onDragOver = new EventEmitter<DropTargetModel<any>>();
	@Output() onDragOff = new EventEmitter<DropTargetModel<any>>();
	@Output() onDrop = new EventEmitter<DropTargetModel<any>>();
}