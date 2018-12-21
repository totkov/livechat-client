import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SignUpModel } from '../models/signup-model';

@Injectable()
export class AuthenticationService {

  @Output() fireIsLoggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  getEmitter() {
    return this.fireIsLoggedIn;
  }

  signup(signupModel: SignUpModel) {
    return this.http.post<any>('http://localhost:5000/api/authentication/registration', signupModel)
      .pipe(map(data => {
        return data;
      }));
  }

  login(email: string, password: string) {
    return this.http.post<any>('http://localhost:5000/api/authentication/login', { email: email, password: password })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.fireIsLoggedIn.emit();
  }

  hasLoggedUser() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  getToken(): string {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser')).token;
    }
  }

  getLoggedUserEmail() {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser')).email;
    }

    throw new Error('Have no logged user!');
  }

  getLoggedUserId() {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser')).userId;
    }

    throw new Error('Have no logged user!');
  }

}
