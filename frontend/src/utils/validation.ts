const validateEmail = (email: string) => {
  const emailRegex = /@/g;
  return emailRegex.test(email);
};

const validatePassword = (password: string) => {
  const passwdRegex = /.{6,}/;
  return passwdRegex.test(password);
};

const validateName = (name: string) => {
  const nameRegex = /^[가-힣]{2,30}$/;
  return nameRegex.test(name);
};

const validatePhoneNumber = (phone: string) => {
  const phoneRegex = /^01[016789]\d{7,8}$/;
  return phoneRegex.test(phone);
};

const validateAddress = (address: string) => {
  const addressRegex = /^[가-힣0-9]+$/;
  return addressRegex.test(address);
};

export { validateEmail, validatePassword, validateName, validatePhoneNumber, validateAddress };
