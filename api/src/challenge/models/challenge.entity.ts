import { UserEntity } from 'src/user/models/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentEntity } from 'src/comment/models/comment.entity';
import { ChallengeCommentEntity } from 'src/challenge-comment/models/challenge-comment.entity';

@Entity('challenge')
export class ChallengeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  topic: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.challenges, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @OneToMany(() => ChallengeCommentEntity, (chalcom) => chalcom.challenge, {
    cascade: true,
  })
  challengeComments: ChallengeCommentEntity;
}

export class ChallengeDto {
  topic: string;
  createdAt: Date;
  userId: number;

  constructor(entity: ChallengeEntity) {
    this.topic = entity.topic;
    this.createdAt = entity.createdAt;
    this.userId = entity.user.id;
  }
}

export class ChallengeUpdateDto {
  id: number;
  topic: string;

  constructor(entity: ChallengeEntity) {
    this.id = entity.id;
    this.topic = entity.topic;
  }
}
