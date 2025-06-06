import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './404/not-found.component';
import { AuthenticationRoutes } from './authentication.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { MaterialModule } from '@app/material.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    ReactiveFormsModule,
    NgHttpLoaderModule.forRoot(),
    MaterialModule
  ],
  declarations: [
    NotfoundComponent,
    LoginComponent
  ]
})
export class AuthenticationModule {}
