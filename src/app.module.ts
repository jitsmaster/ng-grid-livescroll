import { NgModule, NgZone } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AwGrid } from './AwGrid';
@NgModule({
	imports: [BrowserModule, HttpModule],
	declarations: [AwGrid],
	providers: [],
	entryComponents: [],
	bootstrap: [AwGrid]
})
export class AppModule { }