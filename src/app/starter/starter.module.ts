import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarterComponent } from './starter.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { TranslateModule } from '@ngx-translate/core';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Inicio'
    },
    component: StarterComponent
  }
];

@NgModule({
  declarations: [StarterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    TablerIconsModule
  ]
})
export class StarterModule { }
