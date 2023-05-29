export interface FilterState {
  filters: Filters;
  attrsFilter: AttrsFilter[];
  attrsFromFilter: AttrsFilter[];
  priceFromFilter: number;
  ratingsFromFilter: { [key: string]: boolean };
  categoriesFromFilter: { [key: string]: boolean };
  sortOption: string;
}
