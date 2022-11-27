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

const sortTypes = ['descending', 'ascending'] as const;
export type SortTypes = typeof sortTypes;