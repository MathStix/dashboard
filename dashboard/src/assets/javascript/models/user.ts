export interface User {
  _id: number | null,
  fullName: string | null,
  email: string | null,
  password: string | null,
}

export interface UpdateUser {
  _id: number | null,
  fullName: string | null,
  email: string | null,
  password: string | null,
  oldPassword: string | null,
}

export class Teacher implements User {
  _id: number | null;
  fullName: string | null;
  email: string | null;
  password: string | null;

  constructor(id: number | null, name: string, email: string, password: string){
    this._id = id;
    this.fullName = name;
    this.email = email;
    this.password = password;
  }
}


export class UpdateTeacher implements UpdateUser {
  _id: number | null;
  fullName: string | null;
  email: string | null;
  password: string | null;
  oldPassword: string | null;

  constructor(id: number, name: string, email: string, password: string, oldPass: string){
    this._id = id;
    this.fullName = name;
    this.email = email;
    this.password = password;
    this.oldPassword = oldPass;
  }
}