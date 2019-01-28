import { Component, OnInit, Input } from '@angular/core';
import { ChatsListItemModel } from '../../../models/chats-list-item-model';

@Component({
  selector: 'app-chat-list-item',
  templateUrl: './chat-list-item.component.html',
  styleUrls: ['./chat-list-item.component.css']
})
export class ChatListItemComponent implements OnInit {

  @Input() chat: ChatsListItemModel;

  constructor() { }

  ngOnInit() {
    if (this.chat.lastMessageDate.toString().slice(-1) !== 'Z') {
      this.chat.lastMessageDate = new Date(this.chat.lastMessageDate + 'Z');
    }
  }

}
