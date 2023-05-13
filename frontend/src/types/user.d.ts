interface UserProfileFormData {
  name: string;
  phoneNumber: string;
  address: string;
  zipCode: string;
  password: string;
}

interface UserAddressInfo {
  address?: string;
  zipCode?: string;
  phoneNumber?: string;
}

interface UpdateUserNameFormData {
  name: string;
}

interface UpdateUserPhoneFormData {
  phoneNumber: string;
}

interface UpdateUserAddressFormData {
  address: string;
  zipCode: string;
}

interface UpdateUserPasswordFormData {
  password: string;
}
