import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  combineLatest,
  filter,
  forkJoin,
  map,
  Observable,
  shareReplay,
  tap,
  throwError,
} from 'rxjs';
import { CommentApiResponse } from 'src/app/shared/IComments';
import { Post, PostApiResponse } from 'src/app/shared/IPosts';

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

  usersData$: Observable<User[]> = forkJoin([
    this.users$,
    this.postsService.posts$,
    this.commentsService.comments$,
  ]).pipe(
    map(([users, posts, comments]) => {
      const userMap: Record<number, User> = {};
      const postMap: Record<number, Post> = {};

      users.forEach((user) => {
        userMap[user.id] = {
          ...user,
          posts: [],
        };
      });
      posts.forEach((post) => {
        postMap[post.id] = {
          ...post,
          comments: [],
        };
      });

      comments.forEach((comment) => {
        postMap[comment.postId].comments.push(comment);
      });

      Object.values(postMap).forEach((post) => {
        userMap[post.userId].posts.push(post);
      });

      return Object.values(userMap);
    })
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
