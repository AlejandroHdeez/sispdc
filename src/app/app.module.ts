import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";
import { CommonModule, HashLocationStrategy, LocationStrategy } from "@angular/common";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { RouterModule, RouterOutlet } from "@angular/router";
import { routes } from "./app.routes";
import { ReactiveFormsModule } from "@angular/forms";
import { bootstrapApplication, BrowserModule } from "@angular/platform-browser";
import { CustomPaginator } from "./shared/custom-paginator.config";
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { TranslateModule } from "@ngx-translate/core";
import { HttpLoaderFactory } from "./app.config";
import { TruncatePipe } from "./pipe/truncate.pipe";
import { PipesModule } from "./pipe/pipe.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    { provide: MY_DATE_FORMAT, useValue: MY_DATE_FORMAT }
  ]
});

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,

    HttpClientModule,
    NgbModule,
    PipesModule,
    // RouterOutlet,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: 'TRANSLATE_HTTP_LOADER',
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    // ToastrModule.forRoot(),
  ],
  declarations: [
  ],
  bootstrap: [
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    // {
    //     provide: HTTP_INTERCEPTORS,
    //     useClass: AuthInterceptor,
    //     multi: true,
    // },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'es-ES'
    },
    {
      provide: MatPaginatorIntl,
      useValue: CustomPaginator()
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
