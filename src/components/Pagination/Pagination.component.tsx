import React from 'react';
import { Pagination } from '@material-ui/lab';
import { createFipc } from 'react-fipc';

import { PaginationHooks } from './Pagination.fipc';

export interface PaginationComponentProps extends PaginationHooks {
  children?: any;
}

export const PaginationComponent: React.FC<PaginationComponentProps> = ({
  useOnChange,
  usePage,
  useCount,
}) => {
  const onChange = useOnChange();
  const page = usePage();
  const count = useCount();
  return (
    <Pagination
      onChange={onChange}
      page={page}
      count={count}
      variant="outlined"
      shape="rounded"
    />
  );
};

export const PaginationComponent$ = createFipc(PaginationComponent);
