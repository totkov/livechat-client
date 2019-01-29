import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginNavBarComponent } from './login-nav-bar/login-nav-bar.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    NavbarComponent,
    LoginNavBarComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    AlertComponent
  ]
})
export class SharedModule { }
