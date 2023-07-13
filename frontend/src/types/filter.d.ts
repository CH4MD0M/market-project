interface RatingFilter {
  [rating: string]: boolean;
}

interface CategoryFilter {
  [categoryName: string]: boolean;
}

interface AttrsFromCategory {
  key: string;
  value: string[];
  _id?: string;
}

interface Filters {
  category: CategoryFilter;
  attrs: AttrsFromCategory[];
  price: number;
  rating: RatingFilter;
}
