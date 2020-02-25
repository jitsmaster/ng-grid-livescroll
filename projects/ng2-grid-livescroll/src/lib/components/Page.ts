import { Component, Input, Output, ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { GridRow } from '../models/GridModels';
import { ReactiveGridPageService } from '../services/GridReactiveServices';
import { SelectService } from '../services/SelectService';

@Component({
	templateUrl: "./templates/Page.html",
	selector: "[aw-grid-page]"
})
export class Page {
	@Input() pageService: ReactiveGridPageService;
	constructor(public ele: ElementRef, public selectService: SelectService) {
	}
}