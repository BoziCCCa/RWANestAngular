import { Component, OnInit } from '@angular/core';
import { AllUsersState } from '../store/types/user.interface';
import { Store } from '@ngrx/store';
import { UserModel } from '../store/types/user';
import { selectAllUsers } from '../store/selectors/user.selectors';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
} from 'rxjs';
import { getAllUsersBySearch } from '../store/actions/user.actions';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  isDropdownOpen = false;
  searchText: any;
  user$: Observable<UserModel[]>;
  constructor(private store: Store<AllUsersState>) {
    this.user$ = this.store.select(selectAllUsers);
  }

  ngOnInit(): void {
    const inputElement = document.getElementById(
      'search-input'
    ) as HTMLInputElement;
    this.InputSearchInit(inputElement).subscribe((searchValue: string) => {
      this.store.dispatch(getAllUsersBySearch({ search: searchValue }));
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  InputSearchInit(input: HTMLInputElement): Observable<string> {
    return fromEvent(input, 'input').pipe(
      map((ev: Event) => {
        const inputValue = (ev.target as HTMLInputElement).value;
        return inputValue;
      }),
      debounceTime(1000),
      distinctUntilChanged()
    );
  }
}
