﻿import {enableProdMode} from "@angular/core";
import {platformBrowserDynamic}  from '@angular/platform-browser-dynamic';
import {platformBrowser}  from '@angular/platform-browser';

import {TestAppModule} from './app.module';
// import { AppModuleNgFactory } from '../aot/test/app.module.ngfactory';

enableProdMode();
platformBrowserDynamic().bootstrapModule(TestAppModule);
// platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
