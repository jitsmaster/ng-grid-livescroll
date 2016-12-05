import { GridDataServiceBase } from '../src/services/GridDataService';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { GridDataResponse } from '../src/models/GridModels';

export class TestGridDataService extends GridDataServiceBase {
	protected _rowsSubject = new BehaviorSubject<GridDataResponse>({
		idField: "1",
		page: 0,
		rows: [],
		totalCount: 0
	});
	rows = this._rowsSubject.asObservable();

	requestData(page: number, pageSize: number,
		sortField: string, sortDsc: boolean): Observable<GridDataResponse> {
		//simulate a 5 col array
		var data = Array.from({ length: pageSize },
			(v, k) => {
				var rowData = {};
				Array.from({ length: 5 }, (vc, kc) => {
					return page + "-" + (k * 10 + kc);
				}).forEach((val, index) => {
					rowData[index + ""] = val;
				})

				return rowData;
			});

		if (sortField) {
			data.sort((a, b) => {
				if (a == b)
					return 0;
				else {
					if (sortDsc) {
						return (a > b) ? -1 : 1;
					}
					else {
						return (a < b) ? -1 : 1;
					}
				}
			})
		}

		this._rowsSubject.next({
			idField: "1",
			page: page,
			rows: data,
			totalCount: 700
		});

		return this.rows;
	}
}