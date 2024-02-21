import { useMemo } from 'react';
import { Link } from 'react-router-dom';

// Components
import Button from '@components/atoms/Button';

interface PaginationProps {
  categoryName?: string;
  currentPage: number;
  maxPage: number;
}

const Pagination = ({ categoryName, currentPage, maxPage }: PaginationProps) => {
  const categoryPath = categoryName ? `category/${categoryName}/` : '';
  const baseProductUrl = `/products/${categoryPath}`;

  const paginationArray = useMemo(() => {
    if (maxPage <= 5) {
      // if maxPage is less than 5, show all page numbers
      return Array.from({ length: maxPage }, (_, idx) => idx + 1);
    } else {
      const pages: (number | string)[] = [1];
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(maxPage - 1, currentPage + 1);

      if (currentPage > 2) pages.push('...');

      // add pages from startPage to endPage
      for (let i = startPage; i <= endPage; i++) pages.push(i);

      // if currentPage is less than maxPage - 1, add '...' to the end
      if (currentPage < maxPage - 1) pages.push('...');

      // add maxPage to the end
      pages.push(maxPage);
      return pages;
    }
  }, [currentPage, maxPage]);

  return (
    <div className="flex gap-2 mt-10">
      <Button variant="pagination" size="full" hovercolor="default" disabled={currentPage === 1}>
        <Link to={`${baseProductUrl}${currentPage - 1}`}>Prev</Link>
      </Button>

      {paginationArray.map((page, index) => (
        <Button
          variant="pagination"
          size="full"
          hovercolor="default"
          disabled={page === '...'}
          className={currentPage === page ? 'bg-stone-800 text-white' : ''}
          key={index}
        >
          <Link to={`${baseProductUrl}${page}`}>{page}</Link>
        </Button>
      ))}

      <Button
        variant="pagination"
        size="full"
        hovercolor="default"
        disabled={currentPage === maxPage}
      >
        <Link to={`${baseProductUrl}${currentPage + 1}`}>Next</Link>
      </Button>
    </div>
  );
};

export default Pagination;
