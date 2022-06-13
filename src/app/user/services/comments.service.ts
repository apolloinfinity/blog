import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IComments } from 'src/app/shared/IComments';

@Injectable({
  providedIn: 'root',
})
export class CommentdService {
  private commentsUrl = 'https://jsonplaceholder.typicode.com/comments';

  comments$ = this._http.get<IComments[]>;
  

  constructor(private _http: HttpClient) {}

  
}
