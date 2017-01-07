import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { AsyncPipeService } from './AsyncPipeService';
import { ReactiveGridService, ReactiveGridPageService } from './GridReactiveServices';
import { SelectionMode } from '../models/enums';
import { GridRow, SelectItemsState, SelectRangeState } from '../models/GridModels';

@Injectable()
export class SelectService {
	selected: GridRow[] = [];

	startSelected: GridRow;

	@Input() selectionMode: SelectionMode = SelectionMode.multiple;
	@Output() onSelect: EventEmitter<GridRow[]> = new EventEmitter<GridRow[]>();

	constructor(private dataService: ReactiveGridService) {
	}

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
		//clear original selected range
		this.dataService.selectedIndexes = [];
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

	endSelect(row: GridRow) {
		if (!row)
			return;

		if (!this.startSelected)
			this.select(row);

		var endIndex = row.index;
		var startIndex = Math.min(this.startSelected.index, endIndex);
		endIndex = Math.max(this.startSelected.index, endIndex);

		var startPage = Math.floor(startIndex / this.dataService.pageSize);
		var endPage = Math.floor(endIndex / this.dataService.pageSize);

		//for pages not yet fullfilled, the selectedIndexes array is important
		//for pre-select
		this.dataService.selectedIndexes = [];

		for (var i = startIndex; i <= endIndex; i++) {
			this.dataService.selectedIndexes.push(i);
		}

		//now do select on fullfilled pages
		for (var i = startPage; i <= endPage; i++) {
			var page = this.dataService.pageServices[i];
			if (page.clientDataFullfilled) {
				var selectedRows = page.rowsState
					.filter(r => r.index <= endIndex && r.index >= startIndex);

				this.selected = this.selected.concat(selectedRows);

				selectedRows
					.forEach(r => r.selected = true);
			}
		}

		this.onSelect.emit(this.selected);
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