import { Component, OnInit } from '@angular/core';
import { AllUsersState } from '../store/types/user.interface';
import { Store } from '@ngrx/store';
import { UserModel } from '../store/types/user';
import { selectAllUsers } from '../store/selectors/user.selectors';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  isDropdownOpen = false;
  searchText: any;
  users: UserModel[] = [];
  filteredUsers: UserModel[] = [];
  constructor(private store: Store<AllUsersState>) {}

  ngOnInit(): void {
    this.store.select(selectAllUsers).subscribe((users) => {
      this.users = users;
      this.filteredUsers = users;
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
