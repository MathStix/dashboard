export interface User {
  id: number | null,
  fullName: string | null,
  email: string | null,
  password: string | null,
}

export interface UpdateUser {
  id: number | null,
  fullName: string | null,
  email: string | null,
  password: string | null,
  oldPassword: string | null,
}