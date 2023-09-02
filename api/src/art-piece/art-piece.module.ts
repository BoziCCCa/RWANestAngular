import { Module } from '@nestjs/common';
import { ArtPieceService } from './services/art-piece.service';
import { ArtPieceController } from './controller/art-piece.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtPieceEntity } from './modules/art-piece.entity';
import UserModule from 'src/user/user.module';
import { UserGuard } from 'src/guards/user-role.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArtPieceEntity]),
    UserModule,
    JwtModule.register({
      secret: 'process.env.JWT_SECRET',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [ArtPieceService, UserGuard],
  controllers: [ArtPieceController],
  exports: [ArtPieceService],
})
export class ArtPieceModule {}
