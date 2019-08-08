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

export class DropTargetModel<T> {

	constructor(
		public domNode: HTMLElement,
		public gravity: Gravity,
		public dragEvent: DragEvent,
		public dataModel: T[]) {
	}

	acknowledgetDragBehavior() {
		this.dragEvent.preventDefault();
	}
}

export class Coords {
	x: number;
	y: number;
}


export class BoxCoords extends Coords {
	borderLeft: number;
	borderTop: number;
	w: number;
	h: number;

	constructor(node: HTMLElement) {
		super();
		var styles = window.getComputedStyle(node);
		this.x = node.scrollLeft;
		this.y = node.scrollTop;

		this.w = node.clientWidth;
		this.h = node.clientHeight;

		this.borderLeft = this._processSize(styles.borderLeftWidth);
		this.borderTop = this._processSize(styles.borderTopWidth)
	}

	_processSize(sizeStr: string) {
		if (!sizeStr)
			return 0;

		if (sizeStr.indexOf("px") > -1)
			sizeStr = sizeStr.replace("px", "");

		var size = parseFloat(sizeStr);
		if (isNaN(size))
			return 0;

		return size;
	}

	/**
	 * It is very important that w and h must be offset width and height
	 */
	getGravity(innerCoords: Coords): Gravity {
		//how offsetX and offsetY works:
		//left/top border is ignored, right/bottom border is included
		//so when calculating gravity, need to add the left/top border back

		var compensatedInnerCoords = <Coords>{
			x: innerCoords.x + this.borderLeft,
			y: innerCoords.y + this.borderTop
		};

		//now use the compensated coords to compare against box
		return <Gravity>{
			horizontalPercentage: (compensatedInnerCoords.x / this.w) * 100,
			verticalPercentage: (compensatedInnerCoords.y / this.h) * 100
		};
	}
}
