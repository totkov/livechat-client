import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatListItemComponent } from './chat-list-item/chat-list-item.component';
import { ChatCreateComponent } from './chat-create/chat-create.component';
import { ChatDetailsComponent } from './chat-details/chat-details.component';
import { MessageItemComponent } from './message-item/message-item.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ChatListComponent,
    ChatListItemComponent,
    ChatCreateComponent,
    ChatDetailsComponent,
    MessageItemComponent,
    SendMessageComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    SharedModule
  ]
})
export class ChatModule { }
