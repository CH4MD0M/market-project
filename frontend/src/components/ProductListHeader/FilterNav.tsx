import { memo, useCallback, useEffect, useState } from 'react';
import { ArrowUturnLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import isEqual from 'lodash/isEqual';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import {
  resetFilter,
  setAttrsFilter,
  setPriceFilter,
  setRatingFilter,
} from '@redux/modules/filterSlice';
import addCommasToNumber from '@utils/addCommasToNumber';

interface FilterNavItemProps {
  label: string;
  onRemove: () => void;
}

const FilterNavItem = ({ label, onRemove }: FilterNavItemProps) => {
  return (
    <li className="box-border inline-block overflow-hidden mx-[2px] py-[4px] cursor-pointer">
      <button
        onClick={onRemove}
        className="flex items-center py-[6px] px-[12px] bg-[#37507d] text-white text-[14px] rounded-[18px]"
      >
        {label}
        <XMarkIcon width={20} height={20} />
      </button>
    </li>
  );
};

const FilterNav = () => {
  const dispatch = useAppDispatch();
  const [tags, setTags] = useState<FilterTag[]>([]);

  const minPrice = useAppSelector(state => state.filter.priceFilter.minPrice);
  const maxPrice = useAppSelector(state => state.filter.priceFilter.maxPrice);
  const ratingFilter = useAppSelector(state => state.filter.ratingFilter);
  const attrsFilter = useAppSelector(state => state.filter.attrsFilter, isEqual);

  useEffect(() => {
    const attrsTags = attrsFilter.flatMap(filter =>
      filter.value.map(value => ({
        label: `${filter.key}:${value}`,
        type: 'attrs' as const,
        key: filter.key,
      })),
    );
    const ratingTags = ratingFilter
      ? [
          {
            label: `별점: ${ratingFilter}점 이상`,
            type: 'rating' as const,
            key: 'rating',
          },
        ]
      : [];

    const priceTags =
      minPrice !== 0 && maxPrice !== 0
        ? [
            {
              label: `가격: ${addCommasToNumber(minPrice)}원 - ${addCommasToNumber(maxPrice)}원`,
              type: 'price' as const,
              key: 'price',
            },
          ]
        : [];

    setTags([...attrsTags, ...ratingTags, ...priceTags]);
  }, [ratingFilter, attrsFilter, minPrice, maxPrice]);

  const removeTagActionHandlers = {
    attrs: (key: string, label: string) => {
      const newAttrsFilter = attrsFilter
        .map(attrs => {
          if (attrs.key === key) {
            const newValue = attrs.value.filter(value => value !== label.split(':')[1]);
            return { ...attrs, value: newValue };
          }
          return attrs;
        })
        .filter(attrs => attrs.value.length > 0);

      dispatch(setAttrsFilter(newAttrsFilter));
    },
    rating: () => {
      dispatch(setRatingFilter(0));
    },
    price: () => {
      dispatch(setPriceFilter({ minPrice: 0, maxPrice: 0 }));
    },
  };

  const removeTag = (filterTag: FilterTag): void => {
    const actionHandler = removeTagActionHandlers[filterTag.type];
    if (actionHandler) actionHandler(filterTag.key, filterTag.label);
    else console.error('Invalid type');
  };

  // Reset all filters Handler
  const resetFilterHandler = useCallback(() => {
    dispatch(resetFilter());
  }, []);

  return (
    <>
      {tags.length !== 0 && (
        <div className="flex items-start bg-slate-200 rounded-sm mb-4">
          <div className="flex-1 relative min-w-0">
            <ul className="py-[8px] px-[14px] leading-[0]">
              {tags.map((filterTag: FilterTag, index) => (
                <FilterNavItem
                  key={index}
                  label={filterTag.label}
                  onRemove={() => removeTag(filterTag)}
                />
              ))}
            </ul>
          </div>
          <button
            onClick={resetFilterHandler}
            className="w-fit flex gap-1 py-[18px] px-[24px] cursor-pointer duration-100 hover:text-gray-400"
          >
            <ArrowUturnLeftIcon width={20} height={20} />
            초기화
          </button>
        </div>
      )}
    </>
  );
};

export default memo(FilterNav);
