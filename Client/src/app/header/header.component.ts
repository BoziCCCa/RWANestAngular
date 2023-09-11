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
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isHomePage: Boolean = false;
  currentRoute: string = '';
  isDropdownVisible: boolean = false;
  userId!: number;

  constructor(
    public authService: AuthService,
    private store: Store<UserState>,
    private router: Router
  ) {}

  logout() {
    this.store.dispatch(userActions.logout());
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.authService.isLoggedIn()) {
        var user = this.authService.getWithExpiry('loggedUser');
        if (user) {
          this.userId = user.id;
          this.currentRoute = event.url;
        }
      }
    });
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
}
