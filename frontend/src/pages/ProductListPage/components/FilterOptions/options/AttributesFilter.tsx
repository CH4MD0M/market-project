import { memo, useCallback, useEffect } from 'react';
import { Form } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { setAttrsFromCategory, setAttrsFilter } from '@redux/modules/filterSlice';
import { shallowEqual } from 'react-redux';
import isEqual from 'lodash/isEqual';

const AttributesFilter = () => {
  const dispatch = useAppDispatch();

  const categoriesDataList = useAppSelector(state => state.category.categoriesDataList);
  const attrsFromCategory = useAppSelector(state => state.filter.attrsFromCategory);
  const categoryFilter = useAppSelector(state => state.filter.categoryFilter, shallowEqual);
  const attrsFilter = useAppSelector(state => state.filter.attrsFilter, isEqual);

  const attrOnchangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, attr: AttrsFromCategory, value: string) => {
      const { key } = attr;
      const { checked } = e.target;

      const updatedFilters = attrsFilter.map(filter => {
        // 필터의 키가 현재 클릭한 필터의 키와 다르면 그대로 반환
        if (filter.key !== key) return filter;

        // 필터의 키가 현재 클릭한 필터의 키와 같으면
        const valueSet = new Set(filter.value);
        // 현재 클릭한 필터의 value를 추가하거나 제거
        checked ? valueSet.add(value) : valueSet.delete(value);

        return { ...filter, value: Array.from(valueSet) };
      });

      // 필터의 value가 빈 배열이면 필터를 제거
      const usefulFilters = updatedFilters.filter(filter => filter.value.length > 0);

      // 현재 클릭한 필터의 value가 빈 배열이 아니면 필터를 추가(초기 필터가 없을 때)
      if (!usefulFilters.some(filter => filter.key === key) && checked) {
        usefulFilters.push({ key, value: [value] });
      }

      dispatch(setAttrsFilter(usefulFilters));
    },
    [attrsFilter, dispatch],
  );

  useEffect(() => {
    const applyCategoryFilters = (categoryFilters: any, categories: Category[]) => {
      if (Object.values(categoryFilters).every(item => !item)) {
        dispatch(setAttrsFromCategory([]));
        return;
      }

      for (const [category, checked] of Object.entries(categoryFilters)) {
        if (checked) {
          const matchedCategory = categories.find(item => item.name === category)?.attrs;

          dispatch(setAttrsFromCategory(matchedCategory));
        }
      }
    };

    applyCategoryFilters(categoryFilter, categoriesDataList);
  }, [categoryFilter, categoriesDataList]);

  return (
    <>
      {attrsFromCategory?.map((attr, idx) => (
        <div key={`attr-${idx}`}>
          <Form.Label>
            <b>{attr.key}</b>
          </Form.Label>
          {attr?.value.map(value => (
            <Form.Check
              className="mb-1"
              type="checkbox"
              label={value}
              key={`${idx}-${value}`}
              checked={attrsFilter?.some(
                item => item.key === attr.key && item.value.includes(value),
              )}
              onChange={e => attrOnchangeHandler(e, attr, value)}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default memo(AttributesFilter);
