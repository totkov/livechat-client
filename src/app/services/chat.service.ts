import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<any>(`http://localhost:5000/api/chats/GetMyChats`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token)
    });
  }

  getById(id: string) {
    return this.http.get<any>(`http://localhost:5000/api/chats/GetChat`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token),
      params: new HttpParams().set('id', id)
    });
  }

  create(userEmails: string[]) {
    return this.http.post<any>('http://localhost:5000/api/chats/CreateChat',
      { userEmails: userEmails },
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token) })
      .pipe(map(data => {
        return data;
      }));
  }

  sendMessage(chatId: string, message: string) {
    return this.http.post<any>('http://localhost:5000/api/chats/SendMessage',
      {
        utcdate: new Date().toISOString(),
        text: message
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token),
        params: new HttpParams().set('chatId', chatId)
      })
      .pipe(map(data => {
        return data;
      }));
  }
}
