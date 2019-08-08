import { EventEmitter, ElementRef, Renderer } from '@angular/core';
import { ReactiveGridService } from '../services/GridReactiveServices';
import { DndService } from '../services/DndService';
export declare class GridDropTarget {
    ele: ElementRef;
    render: Renderer;
    dataService: ReactiveGridService;
    dndService: DndService;
    private _disabled;
    acceptTypes: string[];
    disabled: boolean;
    onDisabledToggle: EventEmitter<boolean>;
    constructor(ele: ElementRef, render: Renderer, dataService: ReactiveGridService, dndService: DndService);
    allowDragOver(): boolean;
    onDragOver(evt: DragEvent): void;
    onDragLeave(evt: DragEvent): void;
    onDrop(evt: DragEvent): void;
}
