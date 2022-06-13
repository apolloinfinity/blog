import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CommentApiResponse } from 'src/app/shared/IComments';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private commentsUrl = 'https://jsonplaceholder.typicode.com/comments';

  comments$ = this._http.get<CommentApiResponse[]>(this.commentsUrl);

  constructor(private _http: HttpClient) {}
}
