export const API_URL = {
  TOKEN: {
    GET_TOKEN: '/api/get-token',
  },
  USER: {
    LOGIN: '/api/users/login',
    SIGNUP: '/api/users/register',
    LOGOUT: '/api/logout',
    REGISTER: '/api/user/register',
    GET_ALL_USERS: '/api/users',
    GET_SINGLE_USER: (userId: string) => `/api/users/profile/${userId}`,
    DELETE_USER: (userId: string) => `/api/users/${userId}`,
    UPDATE_USER: '/api/users/profile',
  },

  CATEGORY: {},
  PRODUCT: {
    ADMIN_GET_PRODUCTS: '/api/products/admin',
    GET_ALL_PRODUCTS: '/api/products',
    GET_SINGLE_PRODUCT: (productId: string) => `/api/products/get-one/${productId}`,
    DELETE_PRODUCT: (productId: string) => `/api/products/admin/${productId}`,
  },
  ORDER: {
    ADMIN_GET_ORDERS: '/api/orders/admin',
    CREATE_ORDER: '/api/orders',
    GET_ORDER_DETAILS: (orderId: string) => `/api/orders/user/${orderId}`,
    MARK_AS_DELIVERED: (orderId: string) => `/api/orders/delivered/${orderId}`,
  },
};
