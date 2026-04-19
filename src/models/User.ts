export interface NewUser {
  name: string
  email: string
  password: string
}

// remove password and add hashed one
export type NewUserWithHashedPass = Omit<NewUser, 'password'> & { hashed_password: string }


export interface User {
  id: number;
  name: string;
  email: string;
  hashed_password: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
}

export interface PublicUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface UpdateUser {
  id: number;
  name: string;
  email: string;
  hashed_password: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
