import {Component, Input, Output, EventEmitter, ViewChild, AfterViewInit,
	ViewEncapsulation} from '@angular/core';
import { ReactiveGridService} from '../services/GridReactiveServices';
import { GridColumnDef } from '../models/GridModels';

@Component({
    selector: 'aw-grid',
    templateUrl: './templates/awgrid.html',
	styleUrls: ['./templates/awgrid.css'],
	providers: [ReactiveGridService],
	encapsulation: ViewEncapsulation.None
})
export class AwGrid implements AfterViewInit {
	@Input() idField: string;
	@Input() columnsDef: GridColumnDef[];
	@Input() pageSize = 100;
	@Input() height: string;

	constructor(public dataService: ReactiveGridService) {
	}

	ngAfterViewInit() {
		this.dataService.initialize(this.pageSize, this.columnsDef, this.idField);
		this.dataService.currentPage = 0;
		this.dataService.requestData("", false);
	}
}