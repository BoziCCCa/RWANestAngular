import { ArtPieceEntity } from 'src/art-piece/modules/art-piece.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommentEntity } from 'src/comment/models/comment.entity';
import { ChallengeEntity } from 'src/challenge/models/challenge.entity';
import { ChallengeCommentEntity } from 'src/challenge-comment/models/challenge-comment.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ default: '' })
  email: string;

  @Column({ default: '' })
  username: string;

  @Column({ default: '' })
  photo: string;

  @Column({ default: '' })
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateOfBirth: Date;

  @Column({ default: 'user' })
  role: string;

  @OneToMany(() => ArtPieceEntity, (ap) => ap.user, { cascade: true })
  artPieces: ArtPieceEntity;

  @OneToMany(() => CommentEntity, (com) => com.user, { cascade: true })
  comments: CommentEntity;

  @OneToMany(() => ChallengeEntity, (chal) => chal.user, { cascade: true })
  challenges: ChallengeEntity;

  @OneToMany(() => ChallengeCommentEntity, (chalcom) => chalcom.user, {
    cascade: true,
  })
  challengeComments: ChallengeCommentEntity;
}

export class LoginDto {
  username?: string;
  password?: string;
}
