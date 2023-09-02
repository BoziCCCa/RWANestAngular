import { getAllUsers } from './../store/actions/user.actions';
import { Store } from '@ngrx/store';
import { getAllArtPieces } from './../store/actions/art-piece.actions';
import { Component, OnInit } from '@angular/core';
import { ArtPieceState } from '../store/types/art-piece.interface';
import { Observable } from 'rxjs';
import { ArtPieceModel } from '../store/types/art-piece';
import {
  selectArtPieceLoading,
  selectArtPieces,
} from '../store/selectors/art-piece.selectors';
import { AllUsersState } from '../store/types/user.interface';

@Component({
  selector: 'app-home-is-logged-in',
  templateUrl: './home-is-logged-in.component.html',
  styleUrls: ['./home-is-logged-in.component.css'],
})
export class HomeIsLoggedInComponent implements OnInit {
  isLoading$: Observable<boolean>;
  artPieces$: Observable<ArtPieceModel[]>;
  constructor(
    private store: Store<ArtPieceState>,
    private uStore: Store<AllUsersState>
  ) {
    this.isLoading$ = this.store.select(selectArtPieceLoading);
    this.artPieces$ = this.store.select(selectArtPieces);
  }

  getAllArtPieces() {
    this.store.dispatch(getAllArtPieces());
  }

  getAllUsers() {
    this.uStore.dispatch(getAllUsers());
  }

  ngOnInit(): void {
    this.getAllArtPieces();
    this.getAllUsers();
  }
}
