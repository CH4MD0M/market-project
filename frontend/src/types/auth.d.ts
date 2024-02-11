interface LoginFormData {
  email: string;
  password: string;
  doNotLogout?: boolean;
}

interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

interface UserData {
  _id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  doNotLogout: boolean;
}
