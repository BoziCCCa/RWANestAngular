import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserState } from '../store/types/user.interface';
import { logout } from '../store/actions/user.actions';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.css'],
})
export class MobileNavComponent implements OnInit {
  @Input() isDropdownVisible!: boolean;
  userId!: number;

  constructor(
    public authService: AuthService,
    private router: Router,
    private store: Store<UserState>
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('loggedUser');
    if (user) {
      const userr = JSON.parse(user!);
      this.userId = userr.id;
    }
  }
  closeDropdown(){
    this.isDropdownVisible=false;
  }
  logout() {
    this.isDropdownVisible = false;
    this.store.dispatch(logout());
  }
}
