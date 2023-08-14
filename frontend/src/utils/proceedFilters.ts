export const proceedFilters = (filters: Filters) => {
  let filtersUrl = '';

  // Append to url if value is not empty
  const appendToUrl = (key: string, value: any) => {
    if (value) {
      filtersUrl += `&${key}=${value}`;
    }
  };

  // Process nested filters (rating, category)
  const processNestedFilters = (filterKey: string, filterValue: Record<string, any>) => {
    let filterValues = '';
    Object.keys(filterValue).forEach(key => {
      if (filterValue[key]) filterValues += `${key},`;
    });
    // Remove last comma
    appendToUrl(filterKey, filterValues.slice(0, -1));
  };

  // Process All filters
  Object.entries(filters).forEach(([key, value]) => {
    if (key === 'price') {
      appendToUrl(key, value);
    } else if (key === 'rating' || key === 'category') {
      if (typeof value === 'object' && value !== null) {
        processNestedFilters(key, value);
      }
    } else if (key === 'attrs' && Array.isArray(value) && value.length > 0) {
      const attrs = value.reduce((acc, item) => {
        return acc + item.key + '-' + item.value.join('-') + ',';
      }, '');
      // Remove last comma
      appendToUrl(key, attrs.slice(0, -1));
    }
  });

  return filtersUrl;
};
