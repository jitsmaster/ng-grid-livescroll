export declare class DragSourceModel<T> {
    dragType: string;
    dragEvent: DragEvent;
    dataModel: T;
    constructor(dragType: string, dragEvent: DragEvent, dataModel: T);
}
export declare class Gravity {
    horizontalPercentage: number;
    verticalPercentage: number;
}
export declare class DropTargetModel<T> {
    domNode: HTMLElement;
    gravity: Gravity;
    dragEvent: DragEvent;
    dataModel: T[];
    constructor(domNode: HTMLElement, gravity: Gravity, dragEvent: DragEvent, dataModel: T[]);
    acknowledgetDragBehavior(): void;
}
export declare class Coords {
    x: number;
    y: number;
}
export declare class BoxCoords extends Coords {
    borderLeft: number;
    borderTop: number;
    w: number;
    h: number;
    constructor(node: HTMLElement);
    _processSize(sizeStr: string): number;
    /**
     * It is very important that w and h must be offset width and height
     */
    getGravity(innerCoords: Coords): Gravity;
}
