import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ArtPieceDto,
  ArtPieceEntity,
  ArtPieceUpdateDto,
} from '../modules/art-piece.entity';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class ArtPieceService {
  constructor(
    @InjectRepository(ArtPieceEntity)
    private ArtPieceRepository: Repository<ArtPieceEntity>,
    private userService: UserService,
  ) {}

  async addArtPiece(artPieceDto: ArtPieceDto) {
    const artPiece = new ArtPieceEntity();
    artPiece.name = artPieceDto.name;
    artPiece.description = artPieceDto.description;
    artPiece.photo = artPieceDto.photo;

    console.log('id art piece service', artPieceDto.userId);

    const user = await this.userService.getUser(artPieceDto.userId);
    console.log(user);
    artPiece.user = user;

    return await this.ArtPieceRepository.save(artPiece);
  }
  async deleteArtPiece(id: number) {
    await this.ArtPieceRepository.delete(id);
  }
  async updateArtPiece(artPieceUpdateDto: ArtPieceUpdateDto) {
    const artPiece = await this.ArtPieceRepository.findOneBy({
      id: artPieceUpdateDto.id,
    });
    artPiece.name = artPieceUpdateDto.name;
    artPiece.description = artPieceUpdateDto.description;
    if (artPieceUpdateDto.photo !== '')
      artPiece.photo = artPieceUpdateDto.photo;

    await this.ArtPieceRepository.update(artPieceUpdateDto.id, artPiece);
    return artPiece;
  }

  async getAllArtPieces() {
    return await this.ArtPieceRepository.createQueryBuilder('artPiece')
      .leftJoinAndSelect('artPiece.user', 'user')
      .select([
        'artPiece.id',
        'artPiece.photo',
        'artPiece.description',
        'artPiece.name',
        'artPiece.createdAt',
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.username',
        'user.photo',
      ])
      .orderBy('artPiece.createdAt', 'DESC')
      .getMany();
  }

  async getArtPiecesForUser(id: number) {
    return await this.ArtPieceRepository.find({
      where: {
        user: { id: id },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getArtPieceById(id: number) {
    return this.ArtPieceRepository.createQueryBuilder('artPiece')
      .leftJoinAndSelect('artPiece.user', 'user')
      .where('artPiece.id = :id', { id })
      .getOne();
  }
}
