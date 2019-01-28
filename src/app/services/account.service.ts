import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AccountInfoModel } from '../models/accountInfo-model';
import { map } from 'rxjs/operators';
import { Observable } from '../../../node_modules/rxjs';
import { environment } from '../../environments/environment';
import { SearchUserResultModel } from '../models/search-user-result-model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient
  ) { }

  public getMyAccountInfo(): Observable<AccountInfoModel> {
    return this.http.get<AccountInfoModel>(`${environment.api.apiUrl}${environment.api.profile}GetMyProfile`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token)
    });
  }

  public uploadProfilePicture(image: File): any {
    const formData = new FormData();

    formData.append('file', image);

    return this.http.post(`${environment.api.apiUrl}${environment.api.profile}PostProfilePicture`,
      formData,
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token) }
    )
    .pipe(
      map(data => {
        return data;
      })
    );
  }

  public searchUser(phrase: string, page: number, itemsPerPage: number): Observable<SearchUserResultModel[]> {
    return this.http.get<SearchUserResultModel[]>(`${environment.api.apiUrl}${environment.api.profile}SearchUser`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token),
      params: new HttpParams()
        .set('phrase', phrase)
        .set('page', page.toString())
        .set('itemsPerPage', itemsPerPage.toString())
    });
  }
}
