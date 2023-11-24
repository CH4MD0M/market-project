import { useMemo } from 'react';
import { Pagination } from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';

interface PaginationProps {
  categoryName: string;
  searchQuery: string;
  currentPageNumber: number;
  totalPages: number;
}

const PaginationComponent = ({
  categoryName,
  searchQuery,
  currentPageNumber,
  totalPages,
}: PaginationProps) => {
  const categoryPath = categoryName ? `category/${categoryName}/` : '';
  const searchPath = searchQuery ? `search/${searchQuery}/` : '';
  const baseProductUrl = `/products/${categoryPath}${searchPath}`;

  const paginationArray = useMemo(
    () => Array.from({ length: totalPages }, (_, idx) => idx),
    [totalPages],
  );

  return (
    <Pagination>
      <LinkContainer to={`${baseProductUrl}${currentPageNumber - 1}`}>
        <Pagination.Prev disabled={currentPageNumber === 1} />
      </LinkContainer>
      {paginationArray.map(x => (
        <LinkContainer key={x + 1} to={`${baseProductUrl}${x + 1}`}>
          <Pagination.Item active={x + 1 === currentPageNumber}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}

      <LinkContainer to={`${baseProductUrl}${currentPageNumber + 1}`}>
        <Pagination.Next disabled={currentPageNumber === totalPages} />
      </LinkContainer>
    </Pagination>
  );
};

export default PaginationComponent;
