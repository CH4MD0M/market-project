import { Link } from 'react-router-dom';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

import { useAppSelector } from '@hooks/reduxHooks';
import { selectItemsCount } from '@redux/modules/cartSlice/selector';
import { useScrollActive } from '@hooks/useScrollActive';
import cn from '@utils/cn';

// Components
import Profile from './Profile';
import HoverCard from '@components/atoms/HoverCard';

const Header = () => {
  const active = useScrollActive(400);
  const itemsCount = useAppSelector(selectItemsCount);

  return (
    <nav
      className={cn(
        'block fixed backdrop-blur-[10px] transition-[top] duration-[0.5s] ease-[ease-in-out] z-[400] p-3 inset-x-0 bg-[hsla(0,0%,100%,0.8)] shadow-[0px_5px_5px_0px_rgba(0,0,0,0.05)]',
        active ? 'top-[-100px]' : 'top-0',
      )}
    >
      <div className="max-w-[1200px] flex items-center justify-between mx-auto">
        <div className="text-3xl font-semibold tracking-[0.15rem] cursor-pointer">
          <Link to="/">MSG market</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to={'/cart'} className="flex">
            {itemsCount ? (
              <>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full p-2.5 relative">
                  <ShoppingBagIcon className="w-6 h-6" />
                  <span className="absolute right-2 top-2 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">
                    {itemsCount}
                  </span>
                </div>
              </>
            ) : (
              <HoverCard
                logo={<ShoppingBagIcon className="w-6 h-6" />}
                title="장바구니가 비었습니다."
                description="상품을 추가해주세요!"
                direction="bottom"
              />
            )}
          </Link>
          <Profile />
        </div>
      </div>
    </nav>
  );
};

export default Header;
