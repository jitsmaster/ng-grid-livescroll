import { NgModule, NgZone } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { Ng2GridModule } from 'ng2-Grid-LiveScroll/Grid';

import { ModuleTestApp } from './app';
import { TestGridDataService } from './TestGridDataService';

@NgModule({
	imports: [BrowserModule, HttpModule, Ng2GridModule],
	declarations: [ModuleTestApp],
	providers: [TestGridDataService],
	entryComponents: [],
	bootstrap: [ModuleTestApp]
})
export class TestAppModule { }