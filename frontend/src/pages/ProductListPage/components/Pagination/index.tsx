import React, { useMemo } from 'react';
import { Pagination } from 'react-bootstrap';

import { useAppSelector } from '@hooks/reduxHooks';
import { LinkContainer } from 'react-router-bootstrap';

interface PaginationProps {
  categoryName: string;
  searchQuery: string;
}

const PaginationComponent = ({ categoryName, searchQuery }: PaginationProps) => {
  const pageNum = useAppSelector(state => state.product.pageNum);
  const maxPageNum = useAppSelector(state => state.product.maxPageNum);

  const category = categoryName ? `category/${categoryName}/` : '';
  const search = searchQuery ? `search/${searchQuery}/` : '';
  const url = `/products/${category}${search}`;

  const pageNumbers = useMemo(() => [...Array(maxPageNum).keys()], [maxPageNum]);

  return (
    <Pagination>
      <LinkContainer to={`${url}${pageNum - 1}`}>
        <Pagination.Prev disabled={pageNum === 1} />
      </LinkContainer>
      {pageNumbers.map(x => (
        <LinkContainer key={x + 1} to={`${url}${x + 1}`}>
          <Pagination.Item active={x + 1 === pageNum}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}

      <LinkContainer to={`${url}${pageNum + 1}`}>
        <Pagination.Next disabled={pageNum === maxPageNum} />
      </LinkContainer>
    </Pagination>
  );
};

export default PaginationComponent;
