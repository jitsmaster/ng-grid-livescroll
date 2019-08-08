import { GridColumnDef } from '../models/GridModels';
import { ReactiveGridService } from '../services/GridReactiveServices';
import { SortingService } from '../services/SortingService';
export declare class HeaderColumn {
    gridReactiveService: ReactiveGridService;
    sortingService: SortingService;
    model: GridColumnDef;
    constructor(gridReactiveService: ReactiveGridService, sortingService: SortingService);
    readonly minWidth: string;
    readonly colWidth: string;
    readonly label: string;
    sort(evt: MouseEvent): void;
}
