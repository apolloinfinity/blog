import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { IUser } from '../../shared/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = 'https://jsonplaceholder.typicode.com/users';

  users$ = this._http
    .get<IUser[]>(this.usersUrl)
    .pipe(tap((data) => console.log(JSON.stringify(data))));

  constructor(private _http: HttpClient) {}
}
