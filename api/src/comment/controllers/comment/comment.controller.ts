import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommentDto } from 'src/comment/models/comment.entity';
import { CommentService } from 'src/comment/services/comment/comment.service';
import { UserGuard } from 'src/guards/user-role.guard';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}
  @Post('addComment')
  @UseGuards(UserGuard)
  addComment(@Body() commentDto: CommentDto) {
    return this.commentService.addComment(commentDto);
  }

  @Get('getCommentsForArtPiece/:artPieceId')
  @UseGuards(UserGuard)
  async getComments(@Param('artPieceId') artPieceId: number) {
    return await this.commentService.getCommentsForArtPiece(artPieceId);
  }

  @Delete('deleteComment/:id')
  @UseGuards(UserGuard)
  async deleteComment(@Param('id') id: number) {
    return await this.commentService.deleteComment(id);
  }
}
