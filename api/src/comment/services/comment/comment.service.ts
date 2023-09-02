import { CommentDto } from './../../models/comment.entity';
import { UserService } from 'src/user/services/user.service';
import { ArtPieceService } from 'src/art-piece/services/art-piece.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from 'src/comment/models/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private CommentRepository: Repository<CommentEntity>,
    private UserService: UserService,
    private ArtPieceService: ArtPieceService,
  ) {}

  async addComment(commentDto: CommentDto) {
    const comment = new CommentEntity();
    comment.id = commentDto.id;
    comment.description = commentDto.description;

    const user = await this.UserService.getUser(commentDto.userId);
    const artPiece = await this.ArtPieceService.getArtPieceById(
      commentDto.artPieceId,
    );

    comment.user = user;
    comment.artPiece = artPiece;

    return this.CommentRepository.save(comment);
  }

  async getCommentsForArtPiece(id: number) {
    return await this.CommentRepository.createQueryBuilder('comment')
      .where('comment.artPieceId = :id', { id })
      .leftJoinAndSelect('comment.user', 'user')
      .getMany();
  }

  async deleteComment(id: number) {
    return this.CommentRepository.delete(id);
  }
}
