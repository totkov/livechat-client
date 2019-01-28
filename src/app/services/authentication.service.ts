import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SignUpModel } from '../models/signup-model';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

  @Output() fireIsLoggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient
  ) { }

  public getEmitter() {
    return this.fireIsLoggedIn;
  }

  public signup(signupModel: SignUpModel) {
    return this.http.post<any>(`${environment.api.apiUrl}${environment.api.authentication}registration`, signupModel)
      .pipe(map(data => {
        return data;
      }));
  }

  public login(email: string, password: string) {
    return this.http.post<any>(`${environment.api.apiUrl}${environment.api.authentication}login`,
      {
        email: email,
        password: password
      })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  public logout() {
    localStorage.removeItem('currentUser');
    this.fireIsLoggedIn.emit();
  }

  public hasLoggedUser() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  public getToken(): string {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser')).token;
    }
  }

  public getLoggedUserEmail() {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser')).email;
    }

    throw new Error('Have no logged user!');
  }

  public getLoggedUserId() {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser')).userId;
    }

    throw new Error('Have no logged user!');
  }

}
