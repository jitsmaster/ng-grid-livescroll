import { EventEmitter } from '@angular/core';
import { ReactiveGridService } from '../services/GridReactiveServices';
import { DndService } from '../services/DndService';
import { SelectService } from '../services/SelectService';
export declare class GridDragSource {
    dataService: ReactiveGridService;
    selectService: SelectService;
    dndService: DndService;
    private _disabled;
    dragType: string;
    disabled: boolean;
    onDisabledToggle: EventEmitter<boolean>;
    avatar: HTMLElement;
    constructor(dataService: ReactiveGridService, selectService: SelectService, dndService: DndService);
}
