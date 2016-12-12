import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { AsyncPipeService } from './AsyncPipeService';
import { SelectionMode } from '../models/enums';
import { GridRow, SelectItemsState, SelectRangeState } from '../models/GridModels';

@Injectable()
export class SelectService {
	selected: GridRow[] = [];

	startSelected: GridRow;

	@Input() selectionMode: SelectionMode = SelectionMode.multiple;
	@Output() onSelect: EventEmitter<GridRow[]> = new EventEmitter<GridRow[]>();

	clear() {
		if (this.selected) {
			// this.selected.forEach(r => r.selected.triggerUpdate(false));
			this.selected.forEach(r => {
				r.selected = false;
			});
		}

		this.selected = [];
	}

	select(row: GridRow) {
		this.clear();
		this.additionalSelect(row);
		this.startSelected = row;
	}

	additionalSelect(row: GridRow) {
		if (this.selected.length > 0 && this.selectionMode == SelectionMode.single)
			return;

		if (!this.selected.find(r => r == row))
			this.selected.push(row);
		// row.selected.triggerUpdate(true);
		row.selected = true;
		this.onSelect.emit(this.selected);
	}

	selectMany(rows: GridRow[]) {
		this.clear();
		rows.forEach(r => this.additionalSelect(r));
	}

	/**
	 * @description Marked selected to paginated in rows
	 */
	pageInSelected(rows: GridRow[]) {
		var selectedRows = rows.filter(r => this.selected.find(sr => sr == r));
		// selectedRows.forEach(r => r.selected.triggerUpdate(true));
		selectedRows.forEach(r => r.selected = true);
	}
}