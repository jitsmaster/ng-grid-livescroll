import { EventEmitter } from '@angular/core';
import { DragSourceModel, DropTargetModel } from '../models/DndModels';
export declare class DndService {
    dragDisabled: boolean;
    dropDisabled: boolean;
    dragSourceType: string;
    allowedDragSourceTypes: string[];
    acceptTypes: string;
    onDragStart: EventEmitter<DragSourceModel<any>>;
    onDragEnd: EventEmitter<DragSourceModel<any>>;
    dragState: any[];
    onDragOver: EventEmitter<DropTargetModel<any>>;
    onDragOff: EventEmitter<DropTargetModel<any>>;
    onDrop: EventEmitter<DropTargetModel<any>>;
}
