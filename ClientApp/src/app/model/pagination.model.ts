export interface Pagination {
  collectionType?: CollectionType,
  page?: number,
  itemsPerPage?: number,
  totalItems?: number,
  totalPages?: number,
  ids?: number[],
  sort?: SortTypes,
  search?: string
}

export type CollectionType = 'all' | 'tag' | 'favorites';

export const sortTypes = ['newest', 'oldest'] as const;
export type SortTypes = typeof sortTypes[number];