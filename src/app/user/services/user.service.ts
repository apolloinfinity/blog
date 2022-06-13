import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  combineLatest,
  map,
  Observable,
  shareReplay,
  tap,
  throwError,
} from 'rxjs';

import { IUser } from '../../shared/IUser';
import { PostsService } from './posts.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = 'https://jsonplaceholder.typicode.com/users';

  users$ = this._http.get<IUser[]>(this.usersUrl).pipe(
    tap((data) => console.log(JSON.stringify(data))),
    catchError(this.handleError)
  );

  usersWithPosts$ = combineLatest([
    this.users$,
    this.postsService.userPosts$,
  ]).pipe(
    map(
      ([users, posts]) =>
        users.map(
          (user) =>
            ({
              ...user,
              name: user.name,
              username: user.username,
              email: user.email,
              address: {
                street: user.address.street,
                suite: user.address.suite,
                city: user.address.city,
                zipcode: user.address.zipcode,
                geo: {
                  lat: user.address.geo.lat,
                  lng: user.address.geo.lng,
                },
                phone: user.phone,
                website: user.website,
                company: {
                  name: user.company.name,
                  catchPhrase: user.company.catchPhrase,
                  bs: user.company.bs,
                },
                posts: posts.filter((p) => user.id === p.userId),
              },
            } as IUser)
        ),
      shareReplay(1)
    )
  );

  constructor(private _http: HttpClient, private postsService: PostsService) {}

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }
}
