interface UserAddressInfo {
  address?: string;
  zipCode?: string;
  phoneNumber?: string;
}

interface UserName {
  name: string;
  doNotLogout: boolean;
}

interface UserPhone {
  phoneNumber: string;
}

interface UserAddress {
  address: string;
  zipCode: string;
}

interface UserPassword {
  password: string;
}

type UserProfileFormData = UserName & UserPhone & UserAddress & UserPassword;
type UpdateUserNameFormData = UserName;
type UpdateUserPhoneFormData = UserPhone;
type UpdateUserAddressFormData = UserAddress;
type UpdateUserPasswordFormData = UserPassword;

interface EditUserFormData {
  name: string;
  email: string;
  isAdmin: boolean;
}
