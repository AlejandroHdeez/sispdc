import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './countries/countries.component';
import { DepartmentsComponent } from './departments/departments.component';
import { MunicipalitiesComponent } from './municipalities/municipalities.component';
import { CompaniesComponent } from './companies/companies.component';
import { ColaboratorsComponent } from './colaborators/colaborators.component';
import { ColaboratorsAssignedComponent } from './companies/colaborators-assigned/colaborators-assigned.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'paises',
        component: CountriesComponent,
        data: {
          title: 'Países',
          urls: [{ title: 'Inicio', url: '/' }, { title: 'Países' }],
        },
      },
      {
        path: 'departamentos',
        component: DepartmentsComponent,
        data: {
          title: 'Departamentos',
          urls: [{ title: 'Inicio', url: '/' }, { title: 'Departamentos' }],
        },
      },
      {
        path: 'municipios',
        component: MunicipalitiesComponent,
        data: {
          title: 'Municipios',
          urls: [{ title: 'Inicio', url: '/' }, { title: 'Municipios' }],
        },
      },
      {
        path: 'empresas',
        component: CompaniesComponent,
        data: {
          title: 'Empresas',
          urls: [{ title: 'Inicio', url: '/' }, { title: 'Empresas' }],
        },
      },
      {
        path: 'empresas/colaboradores-asignados',
        component: ColaboratorsAssignedComponent,
        data: {
          title: 'Colaboradores Asignados',
          urls: [{ title: 'Inicio', url: '/' }, { title: 'Colaboradores Asignados' }],
        },
      },
      {
        path: 'colaboradores',
        component: ColaboratorsComponent,
        data: {
          title: 'Colaboradores',
          urls: [{ title: 'Inicio', url: '/' }, { title: 'Colaboradores' }],
        },
      },


    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmonRoutingModule { }
