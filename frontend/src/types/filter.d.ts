type AttrsFilter = CategoryAttr[];

type PriceFilter = {
  minPrice: number;
  maxPrice: number;
};

interface RatingFilter {
  [rating: string]: boolean;
}

interface Filters {
  category: string;
  attrs: AttrsFilter;
  price: PriceFilter;
  rating: number;
}

interface RadioBtnOption {
  label: string;
  name: string;
  optionValue: string;
}

type FilterTagType = 'attrs' | 'rating' | 'price';
interface FilterTag {
  type: FilterTagType;
  label: string;
  key: string;
}
