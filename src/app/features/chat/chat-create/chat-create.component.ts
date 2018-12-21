import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { first } from 'rxjs/operators';

import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-chat-create',
  templateUrl: './chat-create.component.html',
  styleUrls: ['./chat-create.component.css']
})
export class ChatCreateComponent implements OnInit {

  @Output() createdChat: EventEmitter<any> = new EventEmitter<any>();

  emails: string[] = [];

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
  }

  getEmitter() {
    return this.createdChat;
  }

  addEmail(email: string) {
    this.emails.push(email);
  }

  create() {
    this.chatService.create(this.emails).pipe(first()).subscribe(data => {
      console.log(data);
      this.createdChat.emit();
    });
  }

}
