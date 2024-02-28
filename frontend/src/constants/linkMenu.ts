export interface LinkMenu {
  name: string;
  path: string;
}

const userMenus: LinkMenu[] = [
  {
    name: '나의 쇼핑',
    path: '/user/my-orders',
  },
  {
    name: '프로필 수정',
    path: '/user/edit-profile',
  },
];

const adminMenus: LinkMenu[] = [
  {
    name: '주문 관리',
    path: '/admin/orders',
  },
  {
    name: '상품 관리',
    path: '/admin/products',
  },
  {
    name: '사용자 관리',
    path: '/admin/users',
  },
];

export { userMenus, adminMenus };
