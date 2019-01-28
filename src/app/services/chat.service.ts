import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from '../../../node_modules/rxjs';
import { ChatsListItemModel } from '../models/chats-list-item-model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(): Observable<ChatsListItemModel[]> {
    return this.http
      .get<ChatsListItemModel[]>(`${environment.api.apiUrl}${environment.api.chats}GetMyChats`, {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token)
        }
      );
  }

  public getById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.api.apiUrl}${environment.api.chats}GetChat`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token),
      params: new HttpParams().set('id', id)
    });
  }

  public create(userId: number): any {
    return this.http.post<any>(`${environment.api.apiUrl}${environment.api.chats}CreateChat`, {}, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token),
      params: new HttpParams().set('userId', userId.toString())
    })
    .pipe(
      map(result => {
        if (result.chatId !== -1) {
          return result.chatId;
        }
      })
    );
  }

  public sendMessage(chatId: string, message: string): any {
    return this.http.post<any>(`${environment.api.apiUrl}${environment.api.chats}SendMessage`, {
      utcdate: new Date().toISOString(),
      text: message
    },
    {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token),
      params: new HttpParams().set('chatId', chatId)
    })
    .pipe(
      map(result => {
        if (result.messageId !== -1) {
          return result.messageId;
        }
      })
    );
  }
}
