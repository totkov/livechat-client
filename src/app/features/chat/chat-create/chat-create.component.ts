import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { first } from 'rxjs/operators';

import { ChatService } from '../../../services/chat.service';
import { SearchUserResultModel } from '../../../models/search-user-result-model';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-chat-create',
  templateUrl: './chat-create.component.html',
  styleUrls: ['./chat-create.component.css']
})
export class ChatCreateComponent implements OnInit {

  @Output() createdChat: EventEmitter<any> = new EventEmitter<any>();

  searchResult: SearchUserResultModel[];

  constructor(
    private accountService: AccountService,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.loadData('', 0);
  }

  createChat(userId: number) {
    this.createdChat.emit();
    this.chatService.create(userId).pipe(first()).subscribe(data => {
      this.createdChat.emit(data);
    });
  }

  private loadData(phrase: string, page: number) {
    this.accountService.searchUser(phrase, page, 5)
      .pipe(first())
      .subscribe(result => {
        this.searchResult = result;
      });
  }

  getEmitter() {
    return this.createdChat;
  }

}
