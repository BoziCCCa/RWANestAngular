import { UserEntity } from 'src/user/models/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArtPieceEntity } from 'src/art-piece/modules/art-piece.entity';
import { ChallengeEntity } from 'src/challenge/models/challenge.entity';

@Entity('challenge-comment')
export class ChallengeCommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  photo: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.challengeComments, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne(() => ChallengeEntity, (chal) => chal.challengeComments, {
    onDelete: 'CASCADE',
  })
  challenge: ChallengeEntity;
}

export class ChallengeCommentDto {
  id: number;
  photo: string;
  userId: number;
  challengeId: number;

  constructor(entity: ChallengeCommentEntity) {
    this.id = entity.id;
    this.photo = entity.photo;
    this.userId = entity.user.id;
    this.challengeId = entity.challenge.id;
  }
}
