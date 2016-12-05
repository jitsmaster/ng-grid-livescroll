import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { TestApp } from '../test/app';
import { AwGrid } from './components/AwGrid';
import { Page } from './components/Page';
import { HeaderColumn } from './components/HeaderColumn';
import { Cell } from './components/Cell';
import { TestGridDataService } from '../test/TestGridDataService';
export var AppModule = (function () {
    function AppModule() {
    }
    AppModule.decorators = [
        { type: NgModule, args: [{
                    imports: [BrowserModule, HttpModule],
                    declarations: [TestApp, AwGrid, Page, HeaderColumn, Cell],
                    providers: [TestGridDataService],
                    entryComponents: [],
                    bootstrap: [TestApp]
                },] },
    ];
    /** @nocollapse */
    AppModule.ctorParameters = [];
    return AppModule;
}());
