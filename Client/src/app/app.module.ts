import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environments';
import { HomeIsLoggedInComponent } from './home-is-logged-in/home-is-logged-in.component';
import { HomeIsNotLoggedInComponent } from './home-is-not-logged-in/home-is-not-logged-in.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import {
  allUsersReducer,
  profileReducers,
  reducers,
} from './store/reducers/user.reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user.effects';
import {
  artPieceReducers,
  artPieceUserReducers,
  singleArtPieceReducer,
} from './store/reducers/art-piece.reducers';
import { ArtPieceEffects } from './store/effects/art-piece.effects';
import { SingleArtPieceComponent } from './single-art-piece/single-art-piece.component';
import { commentReducers } from './store/reducers/comment.reducers';
import { CommentEffects } from './store/effects/comment.effects';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { OwnProfilePageComponent } from './own-profile-page/own-profile-page.component';
import { AddArtPieceComponent } from './add-art-piece/add-art-piece.component';
import { UpdateartpiecefromComponent } from './updateartpiecefrom/updateartpiecefrom.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { FilterPipe } from './searchbar/searchfilter.pipe';
import { ChallengesComponent } from './challenges/challenges.component';
import { challengeReducers, challengeUserReducers } from './store/reducers/challenge.reducers';
import { ChallengeEffects } from './store/effects/challenge.effects';
import { ChallengeCommentEffects } from './store/effects/challenge-comment.effets';
import { SingleChallengeComponent } from './single-challenge/single-challenge.component';
import { AddchallengecommentComponent } from './addchallengecomment/addchallengecomment.component';
import { challengeCommentReducers } from './store/reducers/challenge-comment.reducers';
import { AddChallengeComponent } from './add-challenge/add-challenge.component';
import { MobileNavComponent } from './mobile-nav/mobile-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    RegisterComponent,
    HomeIsLoggedInComponent,
    HomeIsNotLoggedInComponent,
    SingleArtPieceComponent,
    ProfilePageComponent,
    OwnProfilePageComponent,
    AddArtPieceComponent,
    UpdateartpiecefromComponent,
    ProfileInfoComponent,
    SearchbarComponent,
    FilterPipe,
    ChallengesComponent,
    SingleChallengeComponent,
    AddchallengecommentComponent,
    AddChallengeComponent,
    MobileNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    StoreModule.forRoot({
      user: reducers,
      artPiece: artPieceReducers,
      artPieceSingle: singleArtPieceReducer,
      artPiecesUser: artPieceUserReducers,
      comment: commentReducers,
      profile: profileReducers,
      allUsers: allUsersReducer,
      challenges: challengeReducers,
      challengeComment: challengeCommentReducers,
      challengesUser: challengeUserReducers,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !environment.production,
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    EffectsModule.forRoot([
      UserEffects,
      ArtPieceEffects,
      CommentEffects,
      ChallengeEffects,
      ChallengeCommentEffects,
    ]),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
