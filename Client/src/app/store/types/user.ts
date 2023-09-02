export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  photo?: string;
  password?: string;
  dateOfBirth?: Date;
}
export class UserModel implements User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  photo: string;
  password: string;
  dateOfBirth: Date;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    photo: string,
    password: string,
    dateOfBirth: Date
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.photo = photo;
    this.password = password;
    this.dateOfBirth = dateOfBirth;
  }
}
