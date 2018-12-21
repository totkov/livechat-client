import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { HubConnection, HubConnectionBuilder, HttpTransportType } from '@aspnet/signalr';

import { ChatService } from '../../../services/chat.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrls: ['./chat-details.component.css']
})
export class ChatDetailsComponent implements OnInit {

  chat: any;
  private hubConnection: HubConnection;

  constructor(
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(
        'http://localhost:5000/notifications',
        {
          accessTokenFactory: () => this.authenticationService.getToken()
        })
      .build();

    this.hubConnection.on('updateChats', () => {
      console.log('Hello!!!');
      console.log();
    });

    this.hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :(' + err));

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.chatService.getById(id).pipe(first()).subscribe(chat => {
        this.chat = chat;
      });
    });
  }

  addMessage(event: any) {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.chatService.getById(id).pipe(first()).subscribe(chat => {
        this.chat = chat;
      });
    });
  }

}
