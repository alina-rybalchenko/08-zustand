// components/Pagination/Pagination.tsx

import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css';

interface PaginationProps {
  totalPages: number;
  page: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  page,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={4}
      marginPagesDisplayed={1}
      nextLabel="→"
      previousLabel="←"
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={Math.max(0, page - 1)}
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      breakLabel="..."
      disableInitialCallback={true}
      renderOnZeroPageCount={undefined}
    />
  );
}
