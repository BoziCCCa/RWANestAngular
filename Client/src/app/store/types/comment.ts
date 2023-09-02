import { ArtPieceModel } from './art-piece';
import { UserModel } from './user';

export interface Comment {
  description: string;
  createdAt: Date;
  user: UserModel;
  timeAgo: string;
}

export class CommentModel {
  id: number;
  description: string;
  createdAt: Date;
  user: UserModel;
  timeAgo: string;

  constructor(
    id: number,
    description: string,
    createdAt: Date,
    user: UserModel
  ) {
    this.id = id;
    this.description = description;
    this.createdAt = createdAt;
    this.user = user;
    this.timeAgo = '';
  }
}

export function calculateTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} month${months !== 1 ? 's' : ''} ago`;
  }

  const years = Math.floor(months / 12);
  return `${years} year${years !== 1 ? 's' : ''} ago`;
}
