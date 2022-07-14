import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostApiResponse } from 'src/app/shared/IPosts';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private commentsUrl = 'https://jsonplaceholder.typicode.com/posts';

  posts$ = this.http.get<PostApiResponse[]>(this.commentsUrl);

  constructor(private http: HttpClient) {}
}
