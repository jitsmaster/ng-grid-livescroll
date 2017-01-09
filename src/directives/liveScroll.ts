import {
	Directive, Input, Output, EventEmitter, ElementRef,
	ViewChildren, QueryList
} from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
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
		this.onLiveScroll = this.onScrollI
			.debounceTime(400)
			.distinctUntilChanged()
			.map(evt => {
				//detect visible pages
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
				// return [];
			});

		this.scrollLeft = this.onScrollI
			.map(evt => {
				var container = this.ele.nativeElement as HTMLElement;
				return container.scrollLeft;
			});
	}

	@Output() onLiveScroll: Observable<number[]>;
	@Output() scrollLeft: Observable<number>;
	private _paddingRightSubj = new BehaviorSubject<string>("0px");
	paddingRight = this._paddingRightSubj.asObservable();

	onScrollI: EventEmitter<UIEvent> = new EventEmitter<UIEvent>();

	fit() {
		var container = this.ele.nativeElement as HTMLElement;
		var scrollbarWidth = !container.firstElementChild ?
			0 :
			container.offsetWidth - (container.firstElementChild as HTMLElement).offsetWidth;

		//set the topbar padding right
		this._paddingRightSubj.next(scrollbarWidth + "px");
	}

	handleScroll(evt: UIEvent) {
		this.onScrollI.emit(evt);
		this.fit();
	}

	reset() {
		this.ele.nativeElement.scrollTop = 0;
		this.ele.nativeElement.scrollLeft = 0;
	}
}