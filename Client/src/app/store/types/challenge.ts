import { UserModel } from './user';

export interface Challenge {
  id: number;
  topic: string;
  createdAt: Date;
  user: UserModel;
}

export class ChallengeModel implements Challenge {
  id: number;
  topic: string;
  createdAt: Date;
  user: UserModel;

  constructor(id: number, topic: string, createdAt: Date, user: UserModel) {
    this.id = id;
    this.topic = topic;
    this.createdAt = createdAt;
    this.user = user;
  }
}
