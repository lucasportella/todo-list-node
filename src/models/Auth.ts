export interface UserLogin {
  email: string;
  password: string;
}

export interface UserLoginAuth {
  id: number;
  email: string;
  name: string;
  role: string;
  hashed_password: string;
}
