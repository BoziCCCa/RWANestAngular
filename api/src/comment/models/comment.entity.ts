import { UserEntity } from 'src/user/models/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArtPieceEntity } from 'src/art-piece/modules/art-piece.entity';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne(() => ArtPieceEntity, (artPiece) => artPiece.comments, {
    onDelete: 'CASCADE',
  })
  artPiece: ArtPieceEntity;
}

export class CommentDto {
  id: number;
  description: string;
  userId: number;
  artPieceId: number;

  constructor(entity: CommentEntity) {
    this.id = entity.id;
    this.description = entity.description;
    this.userId = entity.user.id;
    this.artPieceId = entity.artPiece.id;
  }
}
