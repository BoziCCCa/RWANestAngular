import { ArtPieceModel } from './art-piece';
import { UserModel } from './user';

export interface ChallengeComment {
  photo: string;
  createdAt: Date;
  user: UserModel;
}

export class ChallengeCommentModel {
  id: number;
  photo: string;
  createdAt: Date;
  user: UserModel;

  constructor(
    id: number,
    photo: string,
    createdAt: Date,
    user: UserModel
  ) {
    this.id = id;
    this.photo = photo;
    this.createdAt = createdAt;
    this.user = user;
  }
}
