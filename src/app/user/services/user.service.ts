import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  combineLatest,
  filter,
  map,
  Observable,
  shareReplay,
  tap,
  throwError,
} from 'rxjs';

import { User, UserApiResponse } from '../../shared/IUser';
import { CommentsService } from './comments.service';
import { PostsService } from './posts.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = 'https://jsonplaceholder.typicode.com/users';

  private users$ = this._http
    .get<UserApiResponse[]>(this.usersUrl)
    .pipe(catchError(this.handleError));

  usersData$: Observable<User[]> = combineLatest([
    this.users$,
    this.postsService.posts$,
    this.commentsService.comments$,
  ]).pipe(
    map(([users, posts, comments]) =>
      users.map((user) => ({
        ...user,
        posts: posts
          .filter((post) => user.id === post.userId)
          .map((post) => ({
            ...post,
            comments: comments.filter((comment) => comment.postId === post.id),
          })),
      }))
    )
  );

  constructor(
    private _http: HttpClient,
    private postsService: PostsService,
    private commentsService: CommentsService
  ) {}

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
