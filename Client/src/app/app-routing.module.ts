import { SingleChallengeComponent } from './single-challenge/single-challenge.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SingleArtPieceComponent } from './single-art-piece/single-art-piece.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { OwnProfilePageComponent } from './own-profile-page/own-profile-page.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ChallengesComponent } from './challenges/challenges.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'single-art-piece/:id', component: SingleArtPieceComponent },
  { path: 'profile-page/:id', component: ProfilePageComponent },
  { path: 'my-profile-page/:id', component: OwnProfilePageComponent },
  { path: 'my-profile-info', component: ProfileInfoComponent },
  { path: 'challenges', component: ChallengesComponent },
  { path: 'single-challenge/:id', component: SingleChallengeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
