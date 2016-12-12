import {
	Component, Input, Output, EventEmitter,
	ViewChild, ViewChildren,
	QueryList,
	AfterViewInit,
	ViewEncapsulation,
	ChangeDetectionStrategy
} from '@angular/core';
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
	@Input() idField: string;
	@Input() columnsDef: GridColumnDef[];
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

		if (!this.columnsDef.find(val => !val.width))
			//auto resize the last row
			this.columnsDef[this.columnsDef.length - 1].width = null;

		this.dataService.initialize(this.pageSize, this.columnsDef, this.idField);
		this.dataService.currentPage = 0;
		this.dataService.requestData("", false, this.selected);
	}

	refresh() {
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