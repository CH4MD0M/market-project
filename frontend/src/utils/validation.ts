export const validateEmail = (email: string) => {
  const emailRegex = /@/g;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  const passwdRegex = /.{6,}/;
  return passwdRegex.test(password);
};
