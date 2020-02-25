import { NgModule, NgZone } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AwGrid } from './components/AwGrid';
import { Page } from './components/Page';
import { HeaderColumn } from './components/HeaderColumn';
import { Row } from './components/Row';
import { Cell } from './components/Cell';

import { LiveScroll } from './directives/liveScroll';
import { ColumnResizer } from './directives/ColumnResizer';
import { ResizerPlaceHolder } from './directives/ResizePlaceHolder';
import { GridDragSource } from './directives/GridDragSource';
import { GridDropTarget } from './directives/GridDropTarget';

import { ReactiveGridService } from "./services/GridReactiveServices";
import { SortingService } from "./services/SortingService";
import { SelectService } from "./services/SelectService";
import { ColumnResizeService } from "./services/ColumnResizeService";

@NgModule({
  imports: [BrowserModule, HttpClientModule],
  declarations: [AwGrid, Page, HeaderColumn, Row, Cell, LiveScroll,
    ColumnResizer, ResizerPlaceHolder, GridDragSource, GridDropTarget],
  exports: [AwGrid, Page, HeaderColumn, Row, Cell, LiveScroll,
    ColumnResizer, ResizerPlaceHolder, GridDragSource, GridDropTarget],
  providers: [ReactiveGridService, SortingService, SelectService, ColumnResizeService],
  entryComponents: [],
})
export class Ng2GridLiveScrollModule { }