import { NgModule, Optional, SkipSelf } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { AuthGuard } from '../guards/auth.guard';
import { ChatService } from '../services/chat.service';
import { AccountService } from '../services/account.service';
import { NotificationService } from '../services/notification.service';

@NgModule({
  providers: [
    AuthenticationService,
    AuthGuard,
    ChatService,
    AccountService,
    NotificationService
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('Core module already provided! Please provide it only in the App Module!');
    }
  }
}
