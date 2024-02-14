import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { InMemoryDataService } from './app/in-memory-data.service';
import { HttpClientInMemoryWebApiModule, InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, { 
  // imports: [HttpClientModule], 
  providers: [
  // provideHttpClient(), importProvidersFrom([
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false}),
    ),
  // ]),
]})

  .catch((err) => console.error(err));
