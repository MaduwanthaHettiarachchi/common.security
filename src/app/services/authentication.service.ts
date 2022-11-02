import { Observable, retry, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from './common.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends CommonService {

  constructor(private http: HttpClient) {
    super("https://localhost:7270/api/Authentication", http)
  }

  logIn(resourse: any): Observable<any> {
    let url = `${this.api}/login`
    return this.http.post<any>(url, JSON.stringify(resourse), { headers: this.headers })
      .pipe(retry(1), catchError(this.handleError))
  }

  refreshToken(resourse: any):Observable<any>{
    let url = `${this.api}/refreshtoken`
    return this.http.post<any>(url, JSON.stringify(resourse), { headers: this.headers })
      .pipe(retry(1), catchError(this.handleError))
  }

  logOut(): Observable<any> {
    let url = `${this.api}/logout`
    return this.http.post<any>(url, { headers: this.headers })
      .pipe(retry(1), catchError(this.handleError))
  }

  isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token)
      return true;

    return false;
  }

  isAdminUser() {
    var userType = localStorage.getItem('userType');
    switch (userType) {
      case UserType.SupperAdmin.toString():
        return true;
      case UserType.Admin.toString():
        return true;
      default:
        return false;
    }
  }

  getUsername() {
    return localStorage.getItem('fullName');
  }

  getToken(){
    return localStorage.getItem('token') as string;
  }

  getRefreshToken(){
    return localStorage.getItem('refreshtoken') as string;
  }

}

enum UserType {
  SupperAdmin = 1,
  Admin = 2,
  SupperUser = 3,
  User = 4
}