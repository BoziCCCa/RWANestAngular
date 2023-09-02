import { Module } from '@nestjs/common';
import { ChallengeService } from './services/challenge/challenge.service';
import { ChallengeController } from './controllers/challenge/challenge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengeEntity } from './models/challenge.entity';
import UserModule from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { UserGuard } from 'src/guards/user-role.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChallengeEntity]),
    UserModule,
    JwtModule.register({
      secret: 'process.env.JWT_SECRET',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [ChallengeService, UserGuard],
  controllers: [ChallengeController],
  exports: [ChallengeService],
})
export class ChallengeModule {}
