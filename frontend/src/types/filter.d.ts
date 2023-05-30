interface AttrsFilter {
  key: string;
  value: string[];
  _id?: string;
}

interface Filters {
  price: number;
  rating: {
    [key: string]: boolean;
  };
  category: {
    [key: string]: boolean;
  };
  attrs: AttrsFilter[];
}
