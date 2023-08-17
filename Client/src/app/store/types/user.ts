export interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  photo?: string;
  password?: string;
  dateOfBirth?: Date;
}
export class UserModel implements User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  photo: string;
  password: string;
  dateOfBirth: Date;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    photo: string,
    password: string,
    dateOfBirth: Date
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.photo = photo;
    this.password = password;
    this.dateOfBirth = dateOfBirth;
  }
}
