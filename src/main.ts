import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { Ng2GridModule } from './ng2grid.module';
// import { environment } from './environments/environment';

enableProdMode();


platformBrowserDynamic().bootstrapModule(Ng2GridModule)
  .catch(err => console.log(err));
