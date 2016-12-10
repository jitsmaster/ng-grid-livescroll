import { NgModule, NgZone } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { TestApp } from '../test/app';
import { TestGridDataService } from '../test/TestGridDataService';
import { Ng2GridModule } from '../src/ng2grid.module';

@NgModule({
	imports: [BrowserModule, HttpModule, Ng2GridModule],
	declarations: [TestApp],
	providers: [TestGridDataService],
	entryComponents: [],
	bootstrap: [TestApp]
})
export class AppModule { }