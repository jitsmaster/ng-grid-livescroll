import { enableProdMode } from "@angular/core";
import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from '../aot/src/app.module.ngfactory';
enableProdMode();
// platformBrowserDynamic().bootstrapModule(AppModule);
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
