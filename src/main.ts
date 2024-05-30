import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment.prod';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


  bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes),
      importProvidersFrom(HttpClientModule),
    ],
  
  
  
  })