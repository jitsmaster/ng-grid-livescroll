import {
    Component, Input, Output, EventEmitter,
    ViewChild, ViewChildren,
    QueryList,
    AfterViewInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    NgZone
} from '@angular/core';
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { ReactiveGridService, ReactiveGridPageService } from '../services/GridReactiveServices';
import { SortingService } from '../services/SortingService';
import { SelectService } from '../services/SelectService';
import { ColumnResizeService } from '../services/ColumnResizeService';
import { DndService } from '../services/DndService';
import { SelectionMode } from '../models/enums';
import { GridColumnDef, GridRow, GridRowEventModel, GridClickEventModel } from '../models/GridModels';
import { Page } from './Page';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
    selector: 'aw-grid',
    templateUrl: './templates/awgrid.html',
    styleUrls: ['./templates/awgrid.css'],
    encapsulation: ViewEncapsulation.None
})
export class AwGrid implements AfterViewInit {
    private _colsSubj = new BehaviorSubject<GridColumnDef[]>([]);
    columns = this._colsSubj.asObservable();

    pageServices: Observable<ReactiveGridPageService[]>;

    private _teardowns = [];

    @Input() noRecordsMessage: string = "";
    @Input() idField: string;
    @Input() set allowDrag(val: boolean) {
        this.dndService.dragDisabled = !val;
    }

    get allowDrag(): boolean {
        return !this.dndService.dragDisabled;
    }

    @Input() dragSourceType: string = "";
    @Input() set allowDrop(val: boolean) {
        this.dndService.dropDisabled = !val;
    }

    get allowDrop(): boolean {
        return !this.dndService.dropDisabled;
    }

    @Input() acceptDropTypes: string = "";

    private _colsDef: GridColumnDef[];
    @Input() set columnsDef(cols: GridColumnDef[]) {
        this._colsDef = cols;
        //adjust initial cellwidth
        this._colsDef.forEach(col => {
            col.cellWidth = col.width;
        });
        this._colsSubj.next(cols);
        // this.refresh();
    }
    @Input() pageSize = 100;
    @Input() emptyRowHeight = 34;
    @Input() height: string;

    @Input() selectionMode: SelectionMode = SelectionMode.multiple;
    @Input() selected: string[];

    @ViewChildren(Page) _pages: QueryList<Page>;

    @Output() onSelect: EventEmitter<GridRow[]> = new EventEmitter<GridRow[]>();
    @Output() onDoubleClick: EventEmitter<GridRow> = new EventEmitter<GridRow>();
    @Output() onRowCreate: EventEmitter<GridRowEventModel> = new EventEmitter<GridRowEventModel>();
    @Output() onRowDestroy: EventEmitter<GridRowEventModel> = new EventEmitter<GridRowEventModel>();
    @Output() onClick: EventEmitter<GridClickEventModel> = new EventEmitter<GridClickEventModel>();

    @ViewChild(CdkVirtualScrollViewport) body: CdkVirtualScrollViewport;

    get totalCount(): number {
        return this.dataService.totalCount;
    }

    constructor(
        public changeDetector: ChangeDetectorRef,
        public dataService: ReactiveGridService,
        public selectService: SelectService,
        public dndService: DndService,
        private zone: NgZone) {

        this._teardowns = [
            this.selectService.onSelect.subscribe(evt => {
                this.onSelect.emit(evt);
            }),
            this.selectService.onRowCreate.subscribe(evt => {
                this.onRowCreate.emit(evt);
            }),
            this.selectService.onRowDestroy.subscribe(evt => {
                this.onRowDestroy.emit(evt);
            }),
            this.selectService.onDoubleClick.subscribe(evt => {
                this.onDoubleClick.emit(evt);
            }),
            this.selectService.onClick.subscribe(evt => {
                this.onClick.emit(evt);
            })
        ];

        this.pageServices = this.dataService.pages
            .pipe(
                tap(() => setTimeout(() => this.fit(), 100))
            );
    }

    bodyScrollLeft: number = 0;
    paddingRight: string = "17px";

    ngAfterViewInit() {
        this.zone.onStable.subscribe(() => {
            var scrollBody = this.body.elementRef.nativeElement;
            this.paddingRight = !scrollBody.firstElementChild ? "0px" :
                scrollBody.offsetWidth - (scrollBody.firstElementChild as HTMLElement).offsetWidth + "px";
        });
        
        this.selectService.selectionMode = this.selectionMode;

        this._teardowns.push(this.body.elementScrolled()
            .debounceTime(500)
            .distinctUntilChanged()
            .subscribe(evt => {
                const container = (evt.target as HTMLElement);
                //set scrollleft
                this.bodyScrollLeft = container
                    .scrollLeft;

                //get visible pages
                var visiblePages = this.body.elementRef.nativeElement.getElementsByClassName("tpage");
                var pageIndexes = Array.from(visiblePages)
                    .map((n) => parseInt(n.getAttribute("page-index"), 10))
                    .filter(i => !isNaN(i));

                this.onLiveScroll(pageIndexes, this.dataService.sortField, this.dataService.sortDsc);

                this.changeDetector.detectChanges();
            }));

        this._teardowns.push(
            fromEvent(window, 'resize')
                .pipe(
                    distinctUntilChanged(),
                    debounceTime(100))
                .subscribe(() => {
                    this.body.checkViewportSize();
                }));

        // if (!!this._colsDef && this._colsDef.length > 0 && !this._colsDef.find(val => !val.width))
        //     //auto resize the last row
        //     this._colsDef[this._colsDef.length - 1].width = null;

        if (this._colsDef && this._colsDef.length > 0)
            this.refresh();
    }

    ngOnDestroy() {
        this._teardowns.forEach(t => t.unsubscribe());
    }

    scrollTo(pageIndex: number) {
        this.body.scrollToIndex(pageIndex);
    }

    columnResizing: boolean = false;

    onColumnResizing(colDef) {
        this.columnResizing = !!colDef;
    }

    fit() {
        this.body.checkViewportSize();
    }

    initialized: boolean = false;

    refresh() {
        if (!this.body) {
            setTimeout(() => {
                this.refresh();
            }, 100);
            return;
        }

        let sub = this.dataService.initialRequestDone
            .subscribe(data => {
                sub.unsubscribe();
                this.initialized = true;
            });

        this.dataService.initialize(this.pageSize, this._colsDef, this.idField);
        this.dataService.currentPages = [0];

        this.scrollTo(0);
        this.dataService.refresh();
    }

    select(ids?: string[]) {
        if (ids) {
            this.selected = ids;
            this.dataService.selectedIds = ids;
        }

        if (!this.dataService.pageServices.length)
            return;

        //use reducer to realize selectMany
        var selectedRows = this.dataService.pageServices
            .map(s => s.rowsState || [])
            .reduce((x, y) => x.concat(y))
            .filter(r => this.selected.find(id => id == r.id));

        this.selectService.selectMany(selectedRows, true);
    }

    onLiveScroll(pagesToLoad: number[],
        sortField: string, sortDsc: boolean) {
        this.dataService
            .changePages(pagesToLoad, sortField || this.dataService.sortField, sortDsc, this.selected);

        //on last page, prevent stuffing on scroll view port
        this.body.checkViewportSize();
    }
}