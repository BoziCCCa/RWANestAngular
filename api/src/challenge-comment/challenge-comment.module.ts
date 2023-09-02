import { Module } from '@nestjs/common';
import { ChallengeCommentService } from './services/challenge-comment/challenge-comment.service';
import { ChallengeCommentController } from './controllers/challenge-comment/challenge-comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengeCommentEntity } from './models/challenge-comment.entity';
import UserModule from 'src/user/user.module';
import { ChallengeModule } from 'src/challenge/challenge.module';
import { UserGuard } from 'src/guards/user-role.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChallengeCommentEntity]),
    UserModule,
    ChallengeModule,
    JwtModule.register({
      secret: 'process.env.JWT_SECRET',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [ChallengeCommentService, UserGuard],
  controllers: [ChallengeCommentController],
})
export class ChallengeCommentModule {}
