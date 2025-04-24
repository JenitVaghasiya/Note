import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from '../src/app/environments/environment';

if (environment.production) {
  // Enable production mode
  import('@angular/core').then(core => core.enableProdMode());
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));