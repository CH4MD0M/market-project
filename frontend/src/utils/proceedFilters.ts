export const proceedFilters = (filters: Filters) => {
  let filtersUrl = '';
  Object.keys(filters).map((key, index) => {
    if (key === 'price') {
      if (filters[key]) {
        filtersUrl += `&price=${filters[key]}`;
      }
      return '';
    } else if (key === 'rating') {
      let rat = '';
      Object.keys(filters[key]).map((key2, index2) => {
        if (filters[key][key2]) rat += `${key2},`;
        return '';
      });
      filtersUrl += '&rating=' + rat;
    } else if (key === 'category') {
      let cat = '';
      Object.keys(filters[key]).map((key3, index3) => {
        if (filters[key][key3]) cat += `${key3},`;
        return '';
      });
      filtersUrl += '&category=' + cat;
    } else if (key === 'attrs') {
      if (filters[key].length > 0) {
        let val = filters[key].reduce((acc, item) => {
          let key = item.key;
          let val = item.value.join('-');
          return acc + key + '-' + val + ',';
        }, '');
        filtersUrl += '&attrs=' + val;
      }
    }
    return '';
  });

  return filtersUrl;
};
