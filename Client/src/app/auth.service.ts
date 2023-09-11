import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User, UserModel } from './store/types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: AngularFireStorage
  ) {}

  login(credentials: any): Observable<string> {
    return this.http.post<string>(
      'http://localhost:3000/user/login',
      credentials,
      {
        withCredentials: true,
      }
    );
  }

  async register(info: any) {
    const filePath = `profile_images/${Date.now()}_${info.photo.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, info.photo);
    task
      .snapshotChanges()
      .pipe(
        finalize(async () => {
          const downloadURL = await fileRef.getDownloadURL().toPromise();
          info.photo = downloadURL;
          this.http.post('http://localhost:3000/user/addUser', info).subscribe(
            (response) => {
              this.router.navigate(['/login']);
            },
            (error) => {
              alert('error: ' + error);
            }
          );
        })
      )
      .subscribe();
  }

  getLoggedUser() {
    return this.http.get('http://localhost:3000/user/getLoggedUser', {
      withCredentials: true,
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedUser');
  }

  logout(): Observable<any> {
    // localStorage.removeItem('loggedUser');
    return this.http.post(
      'http://localhost:3000/user/logout',
      {},
      {
        withCredentials: true,
      }
    );
  }

  getUserById(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(
      `http://localhost:3000/user/getUser/${id}`,
      {
        withCredentials: true,
      }
    );
  }

  updateUser(user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    photo: string;
    dateOfBirth: Date;
  }): Observable<UserModel> {
    return this.http.put<UserModel>(
      `http://localhost:3000/user/updateUser`,
      user,
      {
        withCredentials: true,
      }
    );
  }

  getAllUSersBySearch(search: string): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(
      `http://localhost:3000/user/getAllUsersBySearch/${search}`,
      {
        withCredentials: true,
      }
    );
  }

  getWithExpiry(key: string) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expDate) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }
}
