import { Directive, Input, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { GridRow } from '../models/GridModels';
import { Coords, BoxCoords, Gravity, DropTargetModel } from '../models/DndModels';
import { ReactiveGridService } from '../services/GridReactiveServices';
import { DndService } from '../services/DndService';

@Directive({
	selector: '[grid-droptarget]',
	host: {
		'(dragover)': 'onDragOver($event)',
		'(dragleave)': 'onDragLeave($event)',
		'(drop)': 'onDrop($event)'
	}
})
export class GridDropTarget {
	private _disabled = true;

	@Input('grid-droptarget') set acceptTypes(val: string[]) {
		this.dndService.allowedDragSourceTypes = val;
	}

	get acceptTypes(): string[] {
		return this.dndService.allowedDragSourceTypes;
	}

	@Input('drop-disabled') set disabled(val: boolean) {
		this._disabled = val;
		this.dataService.allowDrag = !val;
		this.onDisabledToggle.emit(val);
	}

	get disabled(): boolean {
		return this._disabled;
	}

	@Output() onDisabledToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor(
		public ele: ElementRef,
		public render: Renderer2,
		public dataService: ReactiveGridService,
		public dndService: DndService) {
	}

	allowDragOver(): boolean {
		return !!this.acceptTypes.find(item => item == this.dndService.dragSourceType);
	}

	onDragOver(evt: DragEvent) {
		if (this.disabled)
			return;

		if (!this.allowDragOver())
			return;

		// evt.dataTransfer.dropEffect = this.isCopy ? "copy" : "move";
		evt.dataTransfer.dropEffect = "move";

		//add drop target marker, since it is a Directive with dom access
		this.render.addClass(this.ele.nativeElement, "dropTargetOn");

		//get position of the mouse cursor relative to the drop box
		var relativePosition = <Coords>{
			x: evt.offsetX,
			y: evt.offsetY
		};

		var boxCoords = new BoxCoords(this.ele.nativeElement as HTMLElement);

		//todo: per item gravity, right now just append to top
		var gravity = {
			horizontalPercentage: 0.1,
			verticalPercentage: 0.1
		} as Gravity;

		this.dndService.onDragOver.next(new DropTargetModel<any>(
			this.ele.nativeElement as HTMLElement,
			gravity,
			evt,
			this.dndService.dragState));
	}

	onDragLeave(evt: DragEvent) {
		if (this.disabled)
			return;

		if (!this.allowDragOver())
			return;

		this.render.removeClass(this.ele.nativeElement, "dropTargetOn");

		this.dndService.onDragOff.next(new DropTargetModel<any>(
			this.ele.nativeElement as HTMLElement,
			null,
			evt,
			this.dndService.dragState));
	}

	onDrop(evt: DragEvent) {
		if (this.disabled)
			return;

		this.onDragLeave(evt);

		if (!this.allowDragOver())
			return;

		evt.preventDefault();

		evt.dataTransfer.dropEffect = "move";

		//get position of the mouse cursor relative to the drop box
		var relativePosition = <Coords>{
			x: evt.offsetX,
			y: evt.offsetY
		};

		var boxCoords = new BoxCoords(this.ele.nativeElement as HTMLElement);

		//todo: per item gravity, right now just append to top
		var gravity = {
			horizontalPercentage: 0.1,
			verticalPercentage: 0.1
		} as Gravity;

		//update data service to add the dropped in item right on top
		//this will destroy the pagination, since it will make the first page fatter.
		this.dataService.pageServices[0].addRows(this.dndService.dragState);

		this.dndService.onDrop.next(new DropTargetModel<any>(
			this.ele.nativeElement as HTMLElement,
			gravity,
			evt,
			this.dndService.dragState));
	}
}