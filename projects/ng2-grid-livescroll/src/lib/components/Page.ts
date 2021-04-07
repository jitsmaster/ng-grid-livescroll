import { Component, Input, Output, ElementRef, EventEmitter, Renderer2, ChangeDetectorRef } from '@angular/core';
import { GridRow } from '../models/GridModels';
import { ReactiveGridPageService } from '../services/GridReactiveServices';
import { SelectService } from '../services/SelectService';

@Component({
	templateUrl: "./templates/Page.html",
	selector: "[aw-grid-page]",
	host: {
		"[style.height]": "emptyHeight"
	}
})
export class Page {
	@Input() pageService: ReactiveGridPageService;
	@Input() emptyRowHeight: number;
	@Input() pageRowCount: number;
	constructor(
		public ele: ElementRef, public selectService: SelectService) {
	}

	get emptyHeight(): string {
		if (!this.pageService.clientDataFullfilled) {
			return `${this.emptyRowHeight * this.pageRowCount}px`;
		}
		else {
			return "auto";
		}
	}
}