const proceedFilters = (filters: Filters) => {
  let filtersUrl = '';

  const appendToUrl = (key: string, value: any) => {
    if (value) {
      filtersUrl += `&${key}=${value}`;
    }
  };

  Object.entries(filters).forEach(([key, value]) => {
    if (key === 'attrs' && Array.isArray(value) && value.length > 0) {
      const attrs = value.reduce((acc, item) => {
        return acc + item.key + '-' + item.value.join('-') + ',';
      }, '');
      // Remove last comma
      appendToUrl(key, attrs.slice(0, -1));
    } else if (key === 'price') {
      if (value.minPrice >= 0) appendToUrl('minPrice', value.minPrice);
      if (value.maxPrice >= 0) appendToUrl('maxPrice', value.maxPrice);
    } else {
      appendToUrl(key, value);
    }
  });

  return filtersUrl;
};

export default proceedFilters;
