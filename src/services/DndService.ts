import { Output, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { GridRow } from '../models/GridModels';
import { DragSourceModel, DropTargetModel } from '../models/DndModels';

export class DndService {
	dragDisabled: boolean;
	dropDisabled: boolean;

	dragSourceType: string;
	allowedDragSourceTypes: string[] = [];

	@Output() onDragStart = new EventEmitter<DragSourceModel<any>>();
	@Output() onDragEnd = new EventEmitter<DragSourceModel<any>>();

	dragState: any[];

	@Output() onDragOver = new EventEmitter<DropTargetModel<any>>();
	@Output() onDragOff = new EventEmitter<DropTargetModel<any>>();
	@Output() onDrop = new EventEmitter<DropTargetModel<any>>();
}