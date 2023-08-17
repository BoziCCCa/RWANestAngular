import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import * as userActions from '../store/actions/user.actions';
import { Observable } from 'rxjs';
import {
  selectIsLoggedIn,
  selectLoggedIn,
} from '../store/selectors/user.selectors';
import { UserState } from '../store/types/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  
  constructor(
    public authService: AuthService,
    private store: Store<UserState>
  ) {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    console.log(this.isLoggedIn$);
  }

  logout() {
    this.store.dispatch(userActions.logout());
  }

  ngOnInit(): void {}
}
