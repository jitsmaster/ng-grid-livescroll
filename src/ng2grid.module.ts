import { NgModule, NgZone } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AwGrid } from './components/AwGrid';
import { LiveScroll } from './directives/liveScroll';
import { Page } from './components/Page';
import { HeaderColumn } from './components/HeaderColumn';
import { Row } from './components/Row';
import { Cell } from './components/Cell';

@NgModule({
	imports:[BrowserModule, HttpModule],
	declarations: [AwGrid, LiveScroll, Page, HeaderColumn, Row, Cell],
	exports: [AwGrid, LiveScroll, Page, HeaderColumn, Row, Cell],	
	entryComponents: [],
})
export class Ng2GridModule { }