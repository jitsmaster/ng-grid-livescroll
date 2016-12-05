import {
	Component, Input, Output, EventEmitter,
	ViewChild, ViewChildren,
	QueryList,
	AfterViewInit,
	ViewEncapsulation,
	ChangeDetectionStrategy
} from '@angular/core';
import { ReactiveGridService } from '../services/GridReactiveServices';
import { GridColumnDef } from '../models/GridModels';
import { LiveScroll } from '../directives/liveScroll';
import { Page } from './Page';

@Component({
	selector: 'aw-grid',
	templateUrl: './templates/awgrid.html',
	styleUrls: ['./templates/awgrid.css'],
	providers: [ReactiveGridService],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AwGrid implements AfterViewInit {
	@Input() idField: string;
	@Input() columnsDef: GridColumnDef[];
	@Input() pageSize = 100;
	@Input() height: string;

	@ViewChild(LiveScroll) liveScroll: LiveScroll;
	@ViewChildren(Page) _pages: QueryList<Page>;

	get pages(): Page[] {
		if (!this._pages)
			return [];
		return this._pages.map(p => p);
	}

	constructor(public dataService: ReactiveGridService) {
	}

	ngAfterViewInit() {
		this.dataService.initialize(this.pageSize, this.columnsDef, this.idField);
		this.dataService.currentPage = 0;
		this.dataService.requestData("", false);
	}

	onLiveScroll(pagesToLoad: number[]) {
		pagesToLoad.forEach(
			page => {
				this.dataService.currentPage = page;
				this.dataService.requestData("", false);
			});
	}
}