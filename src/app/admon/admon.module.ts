import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdmonRoutingModule } from './admon-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatNativeDateModule } from '@angular/material/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../material.module';
import { ToastrModule } from 'ngx-toastr';

import { MatChipsModule } from '@angular/material/chips';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { CountriesComponent } from './countries/countries.component';
import { CountryEditComponent } from './countries/country-edit/country-edit.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentEditComponent } from './departments/department-edit/department-edit.component';
import { MunicipalitiesComponent } from './municipalities/municipalities.component';
import { MunicipalityEditComponent } from './municipalities/municipality-edit/municipality-edit.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyEditComponent } from './companies/company-edit/company-edit.component';
import { ColaboratorsComponent } from './colaborators/colaborators.component';
import { ColaboratorEditComponent } from './colaborators/colaborator-edit/colaborator-edit.component';

@NgModule({
  declarations: [
    CountriesComponent,
    CountryEditComponent,
    DepartmentsComponent,
    DepartmentEditComponent,
    MunicipalitiesComponent,
    MunicipalityEditComponent,
    CompaniesComponent,
    CompanyEditComponent,
    ColaboratorsComponent,
    ColaboratorEditComponent
  ],
  imports: [
    CommonModule,
    AdmonRoutingModule,
    MaterialModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgScrollbarModule,
    MatNativeDateModule,
    TablerIconsModule,
    FormsModule,
    MatDialogModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatChipsModule,
    ToastrModule.forRoot(),
    AngularFirestoreModule
  ],
  exports: [
  ],
  providers: [DatePipe]
})
export class AdmonModule { }
