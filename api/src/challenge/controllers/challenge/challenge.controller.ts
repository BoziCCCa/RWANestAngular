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
import {
  ChallengeDto,
  ChallengeUpdateDto,
} from 'src/challenge/models/challenge.entity';
import { ChallengeService } from 'src/challenge/services/challenge/challenge.service';
import { UserGuard } from 'src/guards/user-role.guard';

@Controller('challenge')
export class ChallengeController {
  constructor(private challengeService: ChallengeService) {}

  @Post('addChallenge')
  @UseGuards(UserGuard)
  create(@Body() challengeDto: ChallengeDto) {
    return this.challengeService.addChallenge(challengeDto);
  }

  @Put('updateChallenge')
  @UseGuards(UserGuard)
  update(@Body() challengeUpdateDto: ChallengeUpdateDto) {
    return this.challengeService.updateChallenge(challengeUpdateDto);
  }
  @Delete('deleteChallenge/:id')
  @UseGuards(UserGuard)
  delete(@Param('id') id: number) {
    return this.challengeService.deleteChallenge(id);
  }
  @Get('getAllChallenges')
  @UseGuards(UserGuard)
  getAllArtPieces() {
    return this.challengeService.getAllChallenges();
  }

  @Get('getChallengesForUser/:id')
  @UseGuards(UserGuard)
  getArtPiecesForUser(@Param('id') id: number) {
    return this.challengeService.getChallengesForUser(id);
  }

  @Get('getChallengeById/:id')
  @UseGuards(UserGuard)
  getArtPieceById(@Param('id') id: number) {
    return this.challengeService.getChallengeById(id);
  }
}
