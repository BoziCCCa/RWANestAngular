export interface ArtPiece {
  id: number;
  photo: string;
  description: string;
  name: string;
  createdAt: Date;
  userId: number;
}

export class ArtPieceModel implements ArtPiece {
  id: number;
  photo: string;
  description: string;
  name: string;
  createdAt: Date;
  userId: number;

  constructor(
    id: number,
    photo: string,
    description: string,
    name: string,
    createdAt: Date,
    userId: number
  ) {
    this.id = id;
    this.photo = photo;
    this.description = description;
    this.name = name;
    this.createdAt = createdAt;
    this.userId = userId;
  }
}
