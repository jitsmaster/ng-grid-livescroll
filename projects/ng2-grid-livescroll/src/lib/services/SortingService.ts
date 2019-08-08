import { Injectable } from '@angular/core';
import { AsyncPipeService } from './AsyncPipeService';
import { SortState, GridColumnDef } from '../models/GridModels';

@Injectable()
export class SortingService {
	
	sortState: AsyncPipeService<SortState> = new AsyncPipeService<SortState>({
		descending: true, //first sort will change it to false
		sorting: false,
		column: null
	});

	sort(col: GridColumnDef) {
		//immutable comparision
		if (this.sortState.currentState.column == col) {
			this.sortState.triggerUpdate({
				descending: !this.sortState.currentState.descending,
				column: col,
				sorting: true
			});
		}
		else {
			this.sortState.triggerUpdate({
				descending: false,
				column: col,
				sorting: true
			});
		}
	}
}