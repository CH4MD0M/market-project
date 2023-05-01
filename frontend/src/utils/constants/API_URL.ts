const API_URL = {
  USER: {
    LOGIN: '/api/user/login',
    REGISTER: '/api/user/register',
    GET_ALL_USERS: '/api/users',
    DELETE_USER: (userId: string) => `/api/users/${userId}`,
  },
  CATEGORY: {},
  PRODUCT: {},
  ORDER: {},
};

export { API_URL };
