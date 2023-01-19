import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';

interface StyledLiProps {
  activePage: boolean;
}
interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  paginate,
}) => {
  const router = useRouter();
  const { query, push, pathname, asPath } = router;
  let pageNumbers = [];

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(7);

  const currentPage: number = Number(query.page);

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    if (asPath === 'page=1') return;
    push(pathname + '?page=1');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems]);

  useEffect(() => {
    if (currentPage <= 5) {
      setStart(0);
      setEnd(7);
    } else {
      setStart(currentPage - 4);
      setEnd(currentPage + 3);
    }
  }, [currentPage, paginate]);

  const currentPages = pageNumbers.slice(start, end);

  return (
    <nav>
      <StyledUl>
        {currentPages.map((number: any) => (
          <StyledLi
            key={number}
            onClick={() => paginate(number)}
            activePage={Number(query.page) === number}
          >
            <Link href={`/kurhuset-i-ostersund?page=${number}`}>{number}</Link>
          </StyledLi>
        ))}
      </StyledUl>
    </nav>
  );
};

export default Pagination;

const StyledUl = styled.ul`
  width: 20rem;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 1rem 0;
`;

const StyledLi = styled.li<StyledLiProps>`
  width: 2rem;
  list-style-type: none;
  text-align: center;
  padding: 0.5rem 1.4rem 0.5rem 1rem;
  transition: all ease 0.1s;
  :hover {
    background-color: white;
  }
  ${({ activePage }) =>
    activePage
      ? css`
          background-color: black;
          color: white;
          :hover {
            color: black;
          }
        `
      : undefined}
`;
