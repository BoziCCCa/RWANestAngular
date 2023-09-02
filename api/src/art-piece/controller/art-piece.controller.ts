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
import { ArtPieceService } from '../services/art-piece.service';
import { ArtPieceDto, ArtPieceUpdateDto } from '../modules/art-piece.entity';
import { UserGuard } from 'src/guards/user-role.guard';

@Controller('art-piece')
export class ArtPieceController {
  constructor(private artPieceService: ArtPieceService) {}

  @Post('addArtPiece')
  @UseGuards(UserGuard)
  create(@Body() artPieceDto: ArtPieceDto) {
    return this.artPieceService.addArtPiece(artPieceDto);
  }

  @Put('updateArtPiece')
  @UseGuards(UserGuard)
  update(@Body() artPieceUpdateDto: ArtPieceUpdateDto) {
    return this.artPieceService.updateArtPiece(artPieceUpdateDto);
  }
  @Delete('deleteArtPiece/:id')
  @UseGuards(UserGuard)
  delete(@Param('id') id: number) {
    return this.artPieceService.deleteArtPiece(id);
  }
  @Get('getAllArtPieces')
  @UseGuards(UserGuard)
  getAllArtPieces() {
    return this.artPieceService.getAllArtPieces();
  }

  @Get('getArtPiecesForUser/:id')
  @UseGuards(UserGuard)
  getArtPiecesForUser(@Param('id') id: number) {
    return this.artPieceService.getArtPiecesForUser(id);
  }

  @Get('getArtPieceById/:id')
  @UseGuards(UserGuard)
  getArtPieceById(@Param('id') id: number) {
    return this.artPieceService.getArtPieceById(id);
  }
}
