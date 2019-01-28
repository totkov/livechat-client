import { Injectable, Output, EventEmitter } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  @Output() newMessageEventEmitter: EventEmitter<any> = new EventEmitter();

  private hubConnection: HubConnection;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(
        `${environment.api.baseUrl}${environment.api.notifications}`, {
          accessTokenFactory: () => {
            return '' + this.authenticationService.getToken();
          }
        })
      .build();

    this.hubConnection.on('updateChats', () => {
      this.newMessageEventEmitter.emit(null);
    });

    this.hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :(' + err));
  }

  public getEmitter() {
    return this.newMessageEventEmitter;
  }

}
