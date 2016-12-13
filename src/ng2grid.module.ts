import { NgModule, NgZone } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AwGrid } from './components/AwGrid';
import { Page } from './components/Page';
import { HeaderColumn } from './components/HeaderColumn';
import { Row } from './components/Row';
import { Cell } from './components/Cell';

import { LiveScroll } from './directives/liveScroll';
import { ColumnResizer } from './directives/ColumnResizer';
import { ResizerPlaceHolder } from './directives/ResizePlaceHolder';

@NgModule({
	imports:[BrowserModule, HttpModule],
	declarations: [AwGrid, Page, HeaderColumn, Row, Cell, LiveScroll, ColumnResizer, ResizerPlaceHolder],
	exports: [AwGrid, Page, HeaderColumn, Row, Cell, LiveScroll, ColumnResizer, ResizerPlaceHolder],
	entryComponents: [],
})
export class Ng2GridModule { }