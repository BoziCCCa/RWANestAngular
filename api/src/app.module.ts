import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserModule from './user/user.module';
import { ArtPieceModule } from './art-piece/art-piece.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { ChallengeModule } from './challenge/challenge.module';
import { ChallengeCommentModule } from './challenge-comment/challenge-comment.module';
import { JwtModule } from '@nestjs/jwt';
import { UserGuard } from './guards/user-role.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    ArtPieceModule,
    AuthModule,
    CommentModule,
    ChallengeModule,
    ChallengeCommentModule,
    JwtModule.register({
      secret: 'process.env.JWT_SECRET',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserGuard],
})
export class AppModule {}
