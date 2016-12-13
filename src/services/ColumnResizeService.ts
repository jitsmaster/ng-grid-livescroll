import { EventEmitter, Output } from '@angular/core';
import { GridColumnDef, GridColumnResizeModel } from '../models/GridModels';

export class ColumnResizeService {
	@Output() onColumnResizeStart: EventEmitter<GridColumnResizeModel> = new EventEmitter<GridColumnResizeModel>();
	@Output() onColumnResizeEnd: EventEmitter<boolean> = new EventEmitter<boolean>();

	public resizingColumn: GridColumnDef;
}