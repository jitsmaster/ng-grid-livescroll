export class DragSourceModel<T> {
	constructor(public dragType: string,
		public dragEvent: DragEvent,
		public dataModel: T) {
	}
}

export class Gravity {
	horizontalPercentage: number;
	verticalPercentage: number;
}

export class DropTargetModel<T> extends DragSourceModel<T[]> {

	constructor(
		public domNode: HTMLElement,
		public gravity: Gravity,
		public dragType: string,
		public dragEvent: DragEvent,
		public dataModel: T[]) {
		super(dragType, dragEvent, dataModel);
	}

	acknowledgetDragBehavior() {
		this.dragEvent.preventDefault();
	}
}