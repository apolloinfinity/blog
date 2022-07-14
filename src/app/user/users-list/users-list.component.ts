import { Component, OnInit } from '@angular/core';
import { catchError, combineLatest, EMPTY, map, Subject } from 'rxjs';

import { PostsService } from '../services/posts.service';
import { UserService } from '../services/user.service';
import { UserStore } from '../store/users.store';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  providers: [UserStore],
})
export class UsersListComponent implements OnInit {
  private errorMessageSubject = new Subject<string>();

  errorMessage$ = this.errorMessageSubject.asObservable();
  // users$ = this.userService.users$;

  userPosts$ = this.userService.usersData$.pipe(
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  constructor(private userService: UserService, private userStore: UserStore) {}

  ngOnInit(): void {
    this.userStore.selectUsers.subscribe((users) => console.log(users));
    this.userStore.getUsers();
  }
}
