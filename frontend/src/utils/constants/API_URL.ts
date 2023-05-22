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
    UPDATE_USER_NAME: '/api/users/profile/name',
    UPDATE_USER_ADDRESS: '/api/users/profile/address',
    UPDATE_USER_PHONE: '/api/users/profile/phone',
    UPDATE_USER_PASSWORD: '/api/users/profile/password',
  },

  CATEGORY: {
    GET_ALL_CATEGORIES: '/api/categories',
    ADD_NEW_CATEGORY: '/api/categories',
    DELETE_CATEGORY: (encodedCategory: string) => `/api/categories/${encodedCategory}`,
  },
  PRODUCT: {
    UPLOAD_PRODUCT_IMAGE: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_ID}/image/upload`,
    UPLOAD_PRODUCT_IMAGE_TO_SERVER: (productId: string) =>
      `/api/products/admin/upload?productId=${productId}`,
    DELETE_PRODUCT_IMAGE: (encodedImagePath: string, productId: string, imagePublicId: string) =>
      `/api/products/admin/image/${encodedImagePath}/${productId}/${imagePublicId}`,
    DELETE_CLOUDINARY_IMAGE: (publicId: string) => `/api/products/admin/cloudinary/${publicId}`,
    SAVE_ATTRIBUTES: '/api/categories/attr',
    ADMIN_GET_PRODUCTS: '/api/products/admin',
    GET_ALL_PRODUCTS: '/api/products',
    GET_SINGLE_PRODUCT: (productId: string) => `/api/products/get-one/${productId}`,
    CREATE_PRODUCT: '/api/products/admin',
    DELETE_PRODUCT: (productId: string) => `/api/products/admin/${productId}`,
    UPDATE_PRODUCT: (productId: string) => `/api/products/admin/${productId}`,
  },
  ORDER: {
    ADMIN_GET_ORDERS: '/api/orders/admin',
    USER_GET_ORDERS: '/api/orders',
    CREATE_ORDER: '/api/orders',
    GET_ORDER_DETAILS: (orderId: string) => `/api/orders/user/${orderId}`,
    MARK_AS_DELIVERED: (orderId: string) => `/api/orders/delivered/${orderId}`,
    UPDATE_AS_PAID: (orderId: string) => `/api/orders/paid/${orderId}`,
  },
};
