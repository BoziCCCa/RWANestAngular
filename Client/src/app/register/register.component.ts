import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';

function MyCustomValidator(control: AbstractControl) {
  const password = control.value;
  const confirmPassword = control.parent?.get('password')?.value;
  return password === confirmPassword ? null : { passwordsNotMatching: true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: FormGroup;
  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.form = this.fb.group({
      username: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', [Validators.required, MyCustomValidator]),
      email: new FormControl('', Validators.email),
      dateOfBirth: new FormControl('', Validators.required),
      photo: new FormControl('', Validators.required),
    });
  }
  register() {
    if (this.form.valid) {
      this.authService.register(this.form.value);
    }
  }
  handleFileChange(event: any) {
    this.form.value.photo = event.target.files[0];
  }
}
