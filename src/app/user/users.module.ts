import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { PostsComponent } from './user/posts/posts.component';
import { CommentsComponent } from './user/comments/comments.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [
    PostsComponent,
    CommentsComponent,
    UsersListComponent,
    UserDetailComponent
  ],
  imports: [CommonModule, UsersRoutingModule],
})
export class UsersModule {}
