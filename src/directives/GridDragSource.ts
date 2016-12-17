import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { GridRow } from '../models/GridModels';
import { ReactiveGridService } from '../services/GridReactiveServices';
import { DndService } from '../services/DndService';
import { SelectService } from '../services/SelectService';
import { DragSourceModel } from '../models/DndModels';

@Directive({
	selector: "[grid-dragsource]"
})
export class GridDragSource {

	private _disabled = true;

	@Input('grid-dragsource') set dragType(val: string) {
		this.dndService.dragSourceType = val;
	}

	get dragType(): string {
		return this.dndService.dragSourceType;
	}

	@Input('drag-disabled') set disabled(val: boolean) {
		this._disabled = val;
		this.dataService.allowDrag = !val;
		this.onDisabledToggle.emit(val);
	}

	get disabled(): boolean {
		return this._disabled;
	}

	@Output() onDisabledToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

	avatar: HTMLElement;

	constructor(public dataService: ReactiveGridService,
		public selectService: SelectService,
		public dndService: DndService) {
		dndService.onDragStart.subscribe((src: DragSourceModel<GridRow>) => {
			if (this.selectService.selected.find(r => src.dataModel == r))
				this.dndService.dragState = this.selectService.selected;
			else {
				//if drag somewhere else, select the drag item and deselect rest
				this.selectService.select(src.dataModel);
				this.dndService.dragState = [src.dataModel];
			}

			//set drag avatar, just use a green button with number of drag items in it
			if (!!src.dragEvent.dataTransfer['setDragImage']) {
				if (!this.avatar) {
					this.avatar = document.createElement('div');
					this.avatar.className = "gridDragAvatar"

					document.body.appendChild(this.avatar);
				}

				this.avatar.innerHTML = this.dndService.dragState.length + "";
				src.dragEvent.dataTransfer['setDragImage'](this.avatar, 2, 2);
			}
		});
	}
}