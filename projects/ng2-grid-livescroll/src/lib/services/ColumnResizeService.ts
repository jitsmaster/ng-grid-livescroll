import { EventEmitter, Output, Directive } from '@angular/core';
import { GridColumnDef, GridColumnResizeModel } from '../models/GridModels';

@Directive()
export class ColumnResizeService {
	@Output() onColumnResizeStart: EventEmitter<GridColumnResizeModel> = new EventEmitter<GridColumnResizeModel>();
	@Output() onColumnResizeEnd: EventEmitter<boolean> = new EventEmitter<boolean>();

	public resizingColumn: GridColumnDef;
}