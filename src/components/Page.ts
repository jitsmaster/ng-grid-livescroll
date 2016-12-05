import { Component, Input, Output, ElementRef, Renderer } from '@angular/core';
import { ReactiveGridPageService } from '../services/GridReactiveServices';

@Component({
	templateUrl: "./templates/awgrid_page.html",
	selector: "[aw-grid-page]"
})
export class Page {
	@Input() pageService: ReactiveGridPageService;
	constructor(public ele: ElementRef) {
		
	}
}