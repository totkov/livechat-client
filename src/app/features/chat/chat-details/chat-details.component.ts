import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { HubConnection, HubConnectionBuilder, HttpTransportType } from '@aspnet/signalr';

import { ChatService } from '../../../services/chat.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrls: ['./chat-details.component.css']
})
export class ChatDetailsComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  chat: any;
  private hubConnection: HubConnection;

  constructor(
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.notificationService.getEmitter().subscribe(() => {
      console.log('Hello!');
      this.loadChat();
    });
    this.loadChat();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  loadChat() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.chatService.getById(id).pipe(first()).subscribe(chat => {
        this.chat = chat;
        this.scrollToBottom();
      });
    });
  }

  addMessage(event: any) { }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

}
