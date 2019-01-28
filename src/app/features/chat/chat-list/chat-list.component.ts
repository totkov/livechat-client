import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ChatService } from '../../../services/chat.service';
import { first } from 'rxjs/operators';
import { ChatCreateComponent } from '../chat-create/chat-create.component';
import { ChatsListItemModel } from '../../../models/chats-list-item-model';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  @ViewChild('createChatComponent')
  createChatComponent: ChatCreateComponent;

  chats: ChatsListItemModel[];

  constructor(
    private chatService: ChatService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadAll();

    this.createChatComponent.getEmitter().subscribe((chatId) => {
      this.router.navigate(['/chat/details', +chatId]);
    });
  }

  private loadAll() {
    this.chatService
      .getAll()
      .pipe(
        first()
      )
      .subscribe(chats => {
        this.chats = chats;
      });
  }
}
