type AttrsData = CategoryAttr[];

export interface FilterState {
  sortOption: string;
  priceFilter: PriceFilter;
  ratingFilter: number;
  categoryFilter: string;
  attrsFilter: AttrsFilter;
  attrsData: AttrsData;
}
