import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { environment } from '@env/environment';
import { UserInsert } from '../interfaces/user-insert';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public insert(user: UserInsert) {
    return this.http.post<UserInsert>(`${environment.baseUrl}/users`, user);
  }
}
