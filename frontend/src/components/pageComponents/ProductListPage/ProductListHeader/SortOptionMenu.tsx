import { BarsArrowDownIcon } from '@heroicons/react/24/outline';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { setSortOption } from '@redux/modules/filterSlice';
import { useDropdown } from '@hooks/useDropdown';
import useAnimation from '@hooks/useAnimation';
import { sortRadioOptions } from '@constants/.';

// Components
import DropdownMenu from '@components/atoms/DropdownMenu';
import RadioBtnGroup from '@components/atoms/RadioBtnGroup';

const SortOptionMenu = () => {
  const dispatch = useAppDispatch();
  const { isOpen, dropdownRef, toggleDropdown } = useDropdown(false);
  const [shouldRenderSortoption, handleTransitionEnd, triggerAnimation] = useAnimation(isOpen);

  const sortOption = useAppSelector(state => state.filter.sortOption);

  const sortOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSortOption(e.target.value));
  };

  return (
    <div
      ref={dropdownRef}
      onClick={toggleDropdown}
      className="relative flex gap-1 items-center cursor-pointer float-right mt-3 mr-3 lg:m-0"
    >
      정렬
      <BarsArrowDownIcon
        width={18}
        height={18}
        transform={isOpen ? 'rotate(180)' : ''}
        className="duration-300"
      />
      {shouldRenderSortoption && (
        <DropdownMenu
          onTransitionEnd={handleTransitionEnd}
          triggerAnimation={triggerAnimation}
          className="p-3"
        >
          <RadioBtnGroup
            optionList={sortRadioOptions}
            value={sortOption}
            onChange={sortOnChangeHandler}
          />
        </DropdownMenu>
      )}
    </div>
  );
};

export default SortOptionMenu;
