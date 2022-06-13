import { Component, OnInit } from '@angular/core';
import { catchError, combineLatest, EMPTY, map, Subject } from 'rxjs';

import { PostsService } from '../services/posts.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  private errorMessageSubject = new Subject<string>();

  errorMessage$ = this.errorMessageSubject.asObservable();
  // users$ = this.userService.users$;

  userPosts$ = this.userService.usersPosts$.pipe(
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );
  // vm$ = combineLatest([this.users$, this.userPosts$]);

  constructor(private userService: UserService) {}

  ngOnInit(): void {}
}
