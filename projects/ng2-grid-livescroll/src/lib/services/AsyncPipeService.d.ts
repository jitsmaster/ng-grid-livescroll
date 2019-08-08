import { Observable } from 'rxjs/Rx';
export declare class AsyncPipeService<T> {
    currentState: T;
    constructor(currentState: T);
    private _subject;
    model: Observable<T>;
    triggerUpdate(model: T): Observable<T>;
}
