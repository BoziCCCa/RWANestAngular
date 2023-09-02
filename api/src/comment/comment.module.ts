import { Module } from '@nestjs/common';
import { CommentController } from './controllers/comment/comment.controller';
import { CommentService } from './services/comment/comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './models/comment.entity';
import UserModule from 'src/user/user.module';
import { ArtPieceModule } from 'src/art-piece/art-piece.module';
import { UserGuard } from 'src/guards/user-role.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [CommentController],
  providers: [CommentService,UserGuard],
  imports: [
    TypeOrmModule.forFeature([CommentEntity]),
    UserModule,
    ArtPieceModule,
    JwtModule.register({
      secret: 'process.env.JWT_SECRET',
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class CommentModule {}
