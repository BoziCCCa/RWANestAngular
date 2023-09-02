import { UserModel } from './user';

export interface ArtPiece {
  id: number;
  photo: string;
  description: string;
  name: string;
  createdAt: Date;
  user: UserModel;
}

export class ArtPieceModel implements ArtPiece {
  id: number;
  photo: string;
  description: string;
  name: string;
  createdAt: Date;
  user: UserModel;

  constructor(
    id: number,
    photo: string,
    description: string,
    name: string,
    createdAt: Date,
    user: UserModel
  ) {
    this.id = id;
    this.photo = photo;
    this.description = description;
    this.name = name;
    this.createdAt = createdAt;
    this.user = user;
  }
}
