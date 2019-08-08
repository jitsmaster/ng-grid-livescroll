import { EventEmitter, QueryList, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ReactiveGridService, ReactiveGridPageService } from '../services/GridReactiveServices';
import { SelectService } from '../services/SelectService';
import { DndService } from '../services/DndService';
import { SelectionMode } from '../models/enums';
import { GridColumnDef, GridRow, GridRowEventModel, GridClickEventModel } from '../models/GridModels';
import { LiveScroll } from '../directives/liveScroll';
import { Page } from './Page';
export declare class AwGrid implements AfterViewInit {
    dataService: ReactiveGridService;
    selectService: SelectService;
    dndService: DndService;
    private _colsSubj;
    columns: Observable<GridColumnDef[]>;
    pageServices: Observable<ReactiveGridPageService[]>;
    private _teardowns;
    idField: string;
    allowDrag: boolean;
    dragSourceType: string;
    allowDrop: boolean;
    acceptDropTypes: string;
    private _colsDef;
    columnsDef: GridColumnDef[];
    pageSize: number;
    height: string;
    selectionMode: SelectionMode;
    selected: string[];
    liveScroll: LiveScroll;
    _pages: QueryList<Page>;
    onSelect: EventEmitter<GridRow[]>;
    onDoubleClick: EventEmitter<GridRow>;
    onRowCreate: EventEmitter<GridRowEventModel>;
    onRowDestroy: EventEmitter<GridRowEventModel>;
    onClick: EventEmitter<GridClickEventModel>;
    readonly pages: Page[];
    constructor(dataService: ReactiveGridService, selectService: SelectService, dndService: DndService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    columnResizing: boolean;
    onColumnResizing(colDef: any): void;
    fit(): void;
    refresh(): void;
    select(ids?: string[]): void;
    onLiveScroll(pagesToLoad: number[]): void;
}
