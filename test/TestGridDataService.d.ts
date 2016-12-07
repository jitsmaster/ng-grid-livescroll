import { GridDataServiceBase } from '../src/services/GridDataService';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { GridDataResponse } from '../src/models/GridModels';
export declare class TestGridDataService extends GridDataServiceBase {
    protected _rowsSubject: BehaviorSubject<GridDataResponse>;
    rows: Observable<GridDataResponse>;
    requestData(page: number, pageSize: number, sortField: string, sortDsc: boolean): Observable<GridDataResponse>;
}
