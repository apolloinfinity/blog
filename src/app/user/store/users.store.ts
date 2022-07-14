import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { forkJoin, map, switchMap, tap } from 'rxjs';
import { CommentApiResponse } from 'src/app/shared/IComments';
import { Post, PostApiResponse } from 'src/app/shared/IPosts';

import { User, UserApiResponse } from 'src/app/shared/IUser';

type Status = 'pending' | 'loading' | 'loaded' | 'error';

export interface UsersState {
  users: User[];
  status: Status;
}

@Injectable()
export class UserStore extends ComponentStore<UsersState> {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {
    super({
      users: [],
      status: 'pending',
    });
  }
  selectUsers = this.select(({ users }) => users);
  readonly selectStatus = this.select(({ status }) => status);

  readonly getUsers = this.effect((origin$) =>
    origin$.pipe(
      tap(() => {
        this.setState((state) => ({
          //   ...state,
          users: state.users,
          status: 'loading',
        }));
      }),
      switchMap(() =>
        forkJoin([
          this.http.get<UserApiResponse[]>(`${this.baseUrl}/users`),
          this.http.get<PostApiResponse[]>(`${this.baseUrl}/posts`),
          this.http.get<CommentApiResponse[]>(`${this.baseUrl}/comments`),
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

            this.setState((state) => {
              return {
                ...state,
                users: Object.values(userMap),
                status: 'loaded',
              };
            });
          })
        )
      )
    )
  );
}

// challenge: Add status
// Make sure the status is being used.

// It seems the best way to update the status of the state is to use patchState
