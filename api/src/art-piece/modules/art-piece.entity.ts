import { UserEntity } from 'src/user/models/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentEntity } from 'src/comment/models/comment.entity';

@Entity('art-piece')
export class ArtPieceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  photo: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: '' })
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.artPieces, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (com) => com.artPiece, { cascade: true })
  comments: CommentEntity;
}

export class ArtPieceDto {
  photo: string;
  description: string;
  name: string;
  createdAt: Date;
  userId: number;

  constructor(entity: ArtPieceEntity) {

    this.photo = entity.photo;
    this.description = entity.description;
    this.name = entity.name;
    this.createdAt = entity.createdAt;
    this.userId = entity.user.id;
  }
}

export class ArtPieceUpdateDto {
  id: number;
  photo: string;
  description: string;
  name: string;

  constructor(entity: ArtPieceEntity) {
    this.id = entity.id;
    this.photo = entity.photo;
    this.description = entity.description;
    this.name = entity.name;
  }
}
