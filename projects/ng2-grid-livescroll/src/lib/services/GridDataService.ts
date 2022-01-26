import { Observable } from 'rxjs';
import { GridDataResponse } from '../models/GridModels';

export abstract class GridDataServiceBase {
	abstract requestData(page: number, pageSize: number,
		sortField: string, sorcDsc: boolean) : Observable<GridDataResponse>;
}