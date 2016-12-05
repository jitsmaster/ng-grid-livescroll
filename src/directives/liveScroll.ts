import { Directive, Input, Output, EventEmitter, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Page } from '../components/Page';

@Directive({
	selector: '[live-scroll]',
	host: {
		'(scroll)': 'handleScroll($event)'
	}
})
export class LiveScroll {
	@Input() pages: Page[];

	constructor(private ele: ElementRef) {
		this.onScroll = this.onScrollI
			.debounceTime(500)
			.map(evt => {
				var container = this.ele.nativeElement as HTMLElement;
				var scrollTop = container.scrollTop;

				//check the pages that are in the view and request data for them
				//no directly here, but to fire event
				var boxPos = (this.ele.nativeElement as HTMLElement)
					.getBoundingClientRect();

				var visiblePages = this.pages
					.map((p, k) => {
						var pagePos = (p.ele.nativeElement as HTMLElement).getBoundingClientRect();
						return Math.max(boxPos.top, pagePos.top) < Math.min(boxPos.bottom, pagePos.bottom) ?
							k : -1;
					})
					.filter(p => p > -1);

				return visiblePages;
			});
	}

	@Output() onScroll: Observable<number[]>;

	onScrollI: EventEmitter<UIEvent> = new EventEmitter<UIEvent>();

	handleScroll(evt: UIEvent) {
		this.onScrollI.emit(evt);
	}
}