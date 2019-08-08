import { Observable } from 'rxjs/Rx';
import { GridDataResponse } from '../models/GridModels';
export declare abstract class GridDataServiceBase {
    abstract requestData(page: number, pageSize: number, sortField: string, sorcDsc: boolean): Observable<GridDataResponse>;
}
