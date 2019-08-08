import { AsyncPipeService } from './AsyncPipeService';
import { SortState, GridColumnDef } from '../models/GridModels';
export declare class SortingService {
    sortState: AsyncPipeService<SortState>;
    sort(col: GridColumnDef): void;
}
