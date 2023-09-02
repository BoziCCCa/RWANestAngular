import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ChallengeCommentDto } from 'src/challenge-comment/models/challenge-comment.entity';
import { ChallengeCommentService } from 'src/challenge-comment/services/challenge-comment/challenge-comment.service';
import { UserGuard } from 'src/guards/user-role.guard';

@Controller('challenge-comment')
export class ChallengeCommentController {
  constructor(private challengeCommentService: ChallengeCommentService) {}

  @Post('addChallangeComment')
  @UseGuards(UserGuard)
  addComment(@Body() commentDto: ChallengeCommentDto) {
    return this.challengeCommentService.addChallengeComment(commentDto);
  }

  @Get('getChallengeCommentsForChallenge/:challengeId')
  @UseGuards(UserGuard)
  async getComments(@Param('challengeId') challengeId: number) {
    return await this.challengeCommentService.getChallengeCommentsForChallenge(
      challengeId,
    );
  }

  @Delete('deleteChallengeComment/:id')
  @UseGuards(UserGuard)
  async deleteComment(@Param('id') id: number) {
    return await this.challengeCommentService.deleteChallengeComment(id);
  }
}
