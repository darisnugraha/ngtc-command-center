export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginFeedback {
  akses?: any;
  level?: string;
  token?: string;
  user_id?: string;
  user_name?: string;
}
