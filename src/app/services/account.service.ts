import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountInfoModel } from '../models/accountInfo-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient
  ) { }

  getMyAccountInfo() {
    return this.http.get<AccountInfoModel>(`http://localhost:5000/api/profile/GetMyProfile`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token)
    });
  }

  uploadProfilePicture(image: File) {
    const formData = new FormData();

    formData.append('file', image);

    return this.http.post(`http://localhost:5000/api/profile/PostProfilePicture`,
      formData,
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token) })
      .pipe(map(data => {
        return data;
      }));
  }
}
