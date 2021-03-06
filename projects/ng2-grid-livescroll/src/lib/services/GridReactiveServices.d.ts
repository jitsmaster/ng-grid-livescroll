import { Observable, BehaviorSubject, Subscription } from 'rxjs/Rx';
import { GridColumnDef, GridRow } from '../models/GridModels';
import { GridDataServiceBase } from './GridDataService';
import { SelectService } from './SelectService';
export declare class ReactiveGridPageService {
    columnsDef: GridColumnDef[];
    idField: string;
    pageSize: number;
    pageIndex: number;
    rowsCount: number;
    protected _rowsSubject: BehaviorSubject<GridRow[]>;
    rows: Observable<GridRow[]>;
    private _allowDrag;
    allowDrag: boolean;
    clientDataFullfilled: boolean;
    constructor(columnsDef: GridColumnDef[], idField: string, pageSize: number, pageIndex: number, rowsCount: number);
    rowsState: GridRow[];
    private _currentRowsData;
    setData(rowsData: any[]): void;
    addRows(rows: GridRow[], addToBottom?: boolean): void;
    private _removedIds;
    removeRows(rows: GridRow[]): void;
}
export declare class ReactiveGridService {
    dataService: GridDataServiceBase;
    private _allowDrag;
    requestedPages: number[];
    selectService: SelectService;
    infiniteScrollMode: boolean;
    allowDrag: boolean;
    constructor(dataService: GridDataServiceBase);
    initialize(pageSize: number, columnsDef: GridColumnDef[], idField: string): void;
    pageSize: number;
    currentPages: number[];
    columnsDef: GridColumnDef[];
    idField: string;
    isFirstRequest: boolean;
    pageServices: ReactiveGridPageService[];
    allRows: any[];
    protected _pagesSubject: BehaviorSubject<ReactiveGridPageService[]>;
    pages: Observable<ReactiveGridPageService[]>;
    sortField: string;
    sortDsc: boolean;
    selectedIndexes: number[];
    selectedIds: string[];
    teardowns: Subscription[];
    refresh(): void;
    addRows(rows: GridRow[], toEnd?: boolean): void;
    removeRows(rows: GridRow[]): void;
    requestData(sortField: string, sortDsc: boolean, selectedIds?: string[], pagesToRequest?: number[]): void;
    private _setPageData(resp);
}
