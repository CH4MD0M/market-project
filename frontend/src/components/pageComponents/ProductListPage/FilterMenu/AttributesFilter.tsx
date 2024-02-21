import { memo, useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { setAttrsFilter } from '@redux/modules/filterSlice';
import { getAllCategoriesThunk } from '@redux/modules/categorySlice/thunk';

import isEqual from 'lodash/isEqual';

const AttributesFilter = () => {
  const dispatch = useAppDispatch();

  const categoryDataList = useAppSelector(state => state.category.categoryDataList, isEqual);
  const attrsData = useAppSelector(state => state.filter.attrsData);
  const attrsFilter = useAppSelector(state => state.filter.attrsFilter, isEqual);

  const attrOnchangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, attr: CategoryAttr, value: string) => {
      const { key } = attr;
      const { checked } = e.target;

      const updatedFilters = attrsFilter.map(filter => {
        // if the key of the filter is different from the key of the currently clicked filter,
        // return as is
        if (filter.key !== key) return filter;

        // if the key of the filter is the same as the key of the currently clicked filter,
        const valueSet = new Set(filter.value);
        // if the checkbox is checked, add the value to the set Or remove the value from the set
        checked ? valueSet.add(value) : valueSet.delete(value);

        return { ...filter, value: Array.from(valueSet) };
      });

      // use only the filters that have a value
      const usefulFilters = updatedFilters.filter(filter => filter.value.length > 0);

      // if the filter is not in the usefulFilters array and the checkbox is checked,
      // add the filter to the usefulFilters array
      if (!usefulFilters.some(filter => filter.key === key) && checked) {
        usefulFilters.push({ key, value: [value] });
      }

      dispatch(setAttrsFilter(usefulFilters));
    },
    [attrsFilter, dispatch],
  );

  // get Categories Data if NOT exist
  useEffect(() => {
    if (categoryDataList.length === 0) dispatch(getAllCategoriesThunk());
  }, [dispatch, categoryDataList.length]);

  return (
    <div>
      {attrsData?.map((attr, idx) => (
        <div key={`attr-${idx}`} className="flex my-3 pb-3 border-b-[1px] lg:block">
          <span className="block font-semibold mr-[20px] flex-[0_0_100px] lg:mb-[10px]">
            {attr.key}
          </span>
          <div className="flex overflow-x-auto lg:flex-col">
            {attr?.value.map(value => (
              <div key={`${idx}-${value}`} className="flex-shrink-0 mr-[10px] lg:mb-[5px]">
                <input
                  className="mb-1"
                  type="checkbox"
                  checked={attrsFilter?.some(
                    item => item.key === attr.key && item.value.includes(value),
                  )}
                  onChange={e => attrOnchangeHandler(e, attr, value)}
                />
                <span className="ml-[7px]">{value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(AttributesFilter);
