import {
	Component, Input, Output, EventEmitter,
	ViewChild, ViewChildren,
	QueryList,
	AfterViewInit,
	ViewEncapsulation,
	ChangeDetectionStrategy
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { ReactiveGridService } from '../services/GridReactiveServices';
import { SortingService } from '../services/SortingService';
import { SelectService } from '../services/SelectService';
import { SelectionMode } from '../models/enums';
import { GridColumnDef, GridRow } from '../models/GridModels';
import { LiveScroll } from '../directives/liveScroll';
import { Page } from './Page';

@Component({
	selector: 'aw-grid',
	templateUrl: './templates/awgrid.html',
	styleUrls: ['./templates/awgrid.css'],
	providers: [ReactiveGridService, SortingService, SelectService],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AwGrid implements AfterViewInit {
	private _colsSubj = new BehaviorSubject<GridColumnDef[]>([]);
	columns = this._colsSubj.asObservable();

	@Input() idField: string;

	private _colsDef: GridColumnDef[];
	@Input() set columnsDef(cols: GridColumnDef[]) {
		this._colsDef = cols;
		this._colsSubj.next(cols);
		this.refresh();
	}
	@Input() pageSize = 100;
	@Input() height: string;

	@Input() selectionMode: SelectionMode = SelectionMode.multiple;
	@Input() selected: string[];

	@ViewChild(LiveScroll) liveScroll: LiveScroll;
	@ViewChildren(Page) _pages: QueryList<Page>;

	@Output() onSelect: EventEmitter<GridRow[]> = new EventEmitter<GridRow[]>();

	get pages(): Page[] {
		if (!this._pages)
			return [];
		return this._pages.map(p => p);
	}

	constructor(public dataService: ReactiveGridService, public selectService: SelectService) {
		this.selectService.onSelect.subscribe(evt => {
			this.onSelect.emit(evt);
		});
	}

	ngAfterViewInit() {
		this.selectService.selectionMode = this.selectionMode;

		if (!!this._colsDef && this._colsDef.length > 0 && !this._colsDef.find(val => !val.width))
			//auto resize the last row
			this._colsDef[this._colsDef.length - 1].width = null;

		if (this._colsDef && this._colsDef.length > 0)
			this.refresh();
	}

	refresh() {
		this.dataService.initialize(this.pageSize, this._colsDef, this.idField);
		this.dataService.currentPage = 0;
		this.liveScroll.reset();
		this.dataService.refresh();
	}

	select(ids?: string[]) {
		if (ids)
			this.selected = ids;

		//use reducer to realize selectMany
		var selectedRows = this.dataService.pageServices
			.map(s => s.rowsState)
			.reduce((x, y) => x.concat(y))
			.filter(r => this.selected.find(id => id == r.id));

		this.selectService.selectMany(selectedRows);
	}

	onLiveScroll(pagesToLoad: number[]) {
		pagesToLoad.forEach(
			page => {
				this.dataService.currentPage = page;
				this.dataService
					.requestData(this.dataService.sortField, this.dataService.sortDsc);
			});
	}
}