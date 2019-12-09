import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  private currrentUser: Observable<User>;
  private baseUrl = environment.baseUrl;

  constructor(private jwtHelper: JwtHelperService, private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currrentUser = this.currentUserSubject.asObservable();
  }

  public isAuthenticated(): boolean {

    if (JSON.parse(localStorage.getItem('jwt')) === null) {
      return false;
    }

    const token = JSON.parse(localStorage.getItem('jwt')).token;

    return !this.jwtHelper.isTokenExpired(token);

  }

  login(email, password) {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, { email, password });
  }
}
