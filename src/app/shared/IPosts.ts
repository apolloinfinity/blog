import { CommentApiResponse } from './IComments';

export interface PostApiResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  comments: CommentApiResponse[];
}
