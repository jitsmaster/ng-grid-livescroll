import {Type} from "@angular/core"
import { Observable, BehaviorSubject } from 'rxjs';

export class AsyncPipeService<T> {
	constructor(public currentState: T) {
	}

	private _subject : BehaviorSubject<T> = new BehaviorSubject(this.currentState);
	public model: Observable<T> = this._subject.asObservable();

	public triggerUpdate(model: T) : Observable<T> {
		this.currentState = model;
		this._subject.next(model);
		return this.model;
	}
}