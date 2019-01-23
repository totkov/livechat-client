import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { UploadImageComponent } from './upload-image/upload-image.component';

@NgModule({
  declarations: [WelcomeComponent, UploadImageComponent],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
