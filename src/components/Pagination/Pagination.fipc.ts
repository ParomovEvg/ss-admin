import { PaginationComponent$ } from './Pagination.component';

export interface PaginationHooks {
  useOnChange: () => (event: React.ChangeEvent<unknown>, value: number) => void;
  usePage: () => number;
  useCount: () => number;
}

export const Pagination$ = PaginationComponent$({
  $carry: true,
});
