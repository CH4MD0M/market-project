export interface AuthState {
  user: UserInfo | null;
  loading: boolean;
  error: boolean;
  isLogin: boolean;
  role: string;
}
