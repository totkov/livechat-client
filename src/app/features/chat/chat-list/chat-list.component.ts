import { Component, OnInit, ViewChild } from '@angular/core';

import { ChatService } from '../../../services/chat.service';
import { first } from 'rxjs/operators';
import { ChatCreateComponent } from '../chat-create/chat-create.component';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  @ViewChild('createChatComponent')
  createChatComponent: ChatCreateComponent;

  chats: any[] = [];

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.loadAll();

    this.createChatComponent.getEmitter().subscribe(() => {
      this.loadAll();
    });
  }

  private loadAll() {
    this.chatService.getAll().pipe(first()).subscribe(chats => {
      this.chats = chats;
    });
  }

}
