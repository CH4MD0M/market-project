const API_URL = {
  USER: {
    LOGIN: '/api/users/login',
    REGISTER: '/api/user/register',
    GET_ALL_USERS: '/api/users',
    DELETE_USER: (userId: string) => `/api/users/${userId}`,
  },
  CATEGORY: {},
  PRODUCT: {
    ADMIN_GET_PRODUCTS: '/api/products/admin',
    DELETE_PRODUCT: (productId: string) => `/api/products/admin/${productId}`,
  },
  ORDER: {
    ADMIN_GET_ORDERS: '/api/orders/admin',
    GET_ORDER_DETAILS: (orderId: string) => `/api/orders/user/${orderId}`,
    MARK_AS_DELIVERED: (orderId: string) => `/api/orders/delivered/${orderId}`,
  },
};

export { API_URL };
