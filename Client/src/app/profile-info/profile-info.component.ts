import { userInfo } from 'os';
import { ChangeDetectorRef, Component, OnInit, isDevMode } from '@angular/core';
import { UserProfileState } from '../store/types/user.interface';
import { Store } from '@ngrx/store';
import { getUserForProfile, updateUser } from '../store/actions/user.actions';
import { selectUserProfile } from '../store/selectors/user.selectors';
import { UserModel } from '../store/types/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css'],
})
export class ProfileInfoComponent implements OnInit {
  userId: number;
  user$!: UserModel | null;
  myForm: FormGroup;
  isDisabled: boolean = true;

  constructor(
    private store: Store<UserProfileState>,
    private formBuilder: FormBuilder,
    private fireStorage: AngularFireStorage
  ) {
    const userString = localStorage.getItem('loggedUser');
    if (userString !== null) var user = JSON.parse(userString);
    this.userId = user.id;

    this.myForm = this.formBuilder.group({
      username: [{ value: '', disabled: true }, Validators.required],
      firstName: [{ value: '', disabled: true }, Validators.required],
      lastName: [{ value: '', disabled: true }, Validators.required],
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
      dateOfBirth: [{ value: '', disabled: true }, Validators.required],
      photo: [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(getUserForProfile({ userId: this.userId }));

    this.store.select(selectUserProfile).subscribe((user) => {
      this.user$ = user;
      this.updateFormValues();
    });
  }

  updateFormValues() {
    if (this.user$) {
      const dateOfBirthDateOnly = new Date(this.user$.dateOfBirth)
        .toISOString()
        .split('T')[0];
      console.log(this.user$);
      this.myForm.patchValue({
        username: this.user$.username,
        firstName: this.user$.firstName,
        lastName: this.user$.lastName,
        email: this.user$.email,
        dateOfBirth: dateOfBirthDateOnly,
      });
    }
  }
  changeIsDisabled() {
    if (this.isDisabled === true) {
      this.isDisabled = false;
      this.enableAllControls();
    } else {
      this.isDisabled = true;
      this.disableAllControls();
    }
  }
  enableAllControls() {
    Object.keys(this.myForm.controls).forEach((controlName) => {
      this.myForm.get(controlName)?.enable();
    });
    this.updateFormValues();
  }

  disableAllControls() {
    Object.keys(this.myForm.controls).forEach((controlName) => {
      this.myForm.get(controlName)?.disable();
    });
    this.updateFormValues();
  }

  handleSubmit() {
    if (this.myForm.valid) {
      if (this.myForm.value.photo != '') {
        console.log('TEST', this.myForm.value.photo.name);
        const filePath = `profile-images/${Date.now()}_${
          this.myForm.value.photo.name
        }`;
        const fileRef = this.fireStorage.ref(filePath);
        const task = this.fireStorage.upload(filePath, this.myForm.value.photo);
        task
          .snapshotChanges()
          .pipe(
            finalize(async () => {
              const downloadURL = await fileRef.getDownloadURL().toPromise();
              console.log(downloadURL);
              this.store.dispatch(
                updateUser({
                  user: {
                    id: this.userId,
                    firstName: this.myForm.value.firstName,
                    lastName: this.myForm.value.lastName,
                    email: this.myForm.value.email,
                    username: this.myForm.value.username,
                    photo: downloadURL,
                    dateOfBirth: this.myForm.value.dateOfBirth,
                  },
                })
              );
            })
          )
          .subscribe();
      } else {
        console.log({
          user: {
            id: this.userId,
            firstName: this.myForm.value.firstName,
            lastName: this.myForm.value.lastName,
            email: this.myForm.value.email,
            username: this.myForm.value.username,
            photo: '',
            dateOfBirth: this.myForm.value.dateOfBirth,
          },
        });
        this.store.dispatch(
          updateUser({
            user: {
              id: this.userId,
              firstName: this.myForm.value.firstName,
              lastName: this.myForm.value.lastName,
              email: this.myForm.value.email,
              username: this.myForm.value.username,
              photo: '',
              dateOfBirth: this.myForm.value.dateOfBirth,
            },
          })
        );
      }
    }
  }

  handleFileChange(event: any) {
    this.myForm.value.photo = event.target.files[0];
    if (this.myForm.value.photo) {
      console.log(this.myForm.value);
    }
  }
}
