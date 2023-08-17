import { UserState } from './../store/types/user.interface';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { logInUser } from '../store/actions/user.actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private store: Store<UserState>
  ) {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  
  submitLogin() {
    if (this.form.valid) {
      this.store.dispatch(
        logInUser({
          user: {
            username: this.form.value.username,
            password: this.form.value.password,
          },
        })
      );
    }
  }
}
