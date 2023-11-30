interface LoginFormData {
  email: string;
  password: string;
  doNotLogout?: boolean;
}

interface UserInfo {
  _id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  doNotLogout: boolean;
}

interface UserData {
  _id: string;
  email: string;
  name: string;
  doNotLogout: boolean;
  isAdmin: boolean;
}

interface LoginResponse {
  success: string;
  userInfo: UserInfo;
}

interface SignupFormData {
  name: string;
  email: string;
  password: string;
}
