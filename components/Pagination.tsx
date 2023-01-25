import Link from 'next/link';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

import { Icon } from './Icon';
import toEnd from '../public/toEnd.svg';
import toStart from '../public/toStart.svg';
import back from '../public/back.svg';
import forward from '../public/forward.svg';

interface StyledLiProps {
  active: boolean;
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
  let pageNumbers: number[] = [];

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
    const pageIndex = pageNumbers.findIndex((number) => number === currentPage);

    if (currentPage <= 6) {
      setStart(0);
      setEnd(7);
      return;
    }
    if (pageIndex + 3 >= pageNumbers.length) {
      const lastPages = pageNumbers.length;
      setStart(lastPages - 7);
      setEnd(lastPages);
      return;
    } else {
      setStart(currentPage - 4);
      setEnd(currentPage + 3);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, paginate]);

  const currentPages = pageNumbers.slice(start, end);

  function handlePaginationArrows(value: number) {
    paginate(value);
    router.push(`${pathname}?page=${value}`);
  }

  return (
    <nav>
      <StyledUl>
        <StyledArrows active={currentPage <= 1}>
          <Icon
            onClick={() =>
              currentPage <= 1 ? undefined : handlePaginationArrows(1)
            }
            src={toStart}
            alt="start"
            size={14}
          />
        </StyledArrows>
        <StyledArrows active={currentPage <= 1}>
          <Icon
            onClick={() =>
              currentPage <= 1
                ? undefined
                : handlePaginationArrows(currentPage - 1)
            }
            src={back}
            alt="start"
            size={14}
          />
        </StyledArrows>

        {currentPages.map((number: any) => (
          <Link key={number} href={`${pathname}?page=${number}`}>
            <StyledLi
              onClick={
                Number(query.page) === number
                  ? undefined
                  : () => paginate(number)
              }
              active={Number(query.page) === number}
            >
              {number}
            </StyledLi>
          </Link>
        ))}
        <StyledArrows active={currentPage >= pageNumbers.length}>
          <Icon
            onClick={() =>
              currentPage >= pageNumbers.length
                ? undefined
                : handlePaginationArrows(currentPage + 1)
            }
            src={forward}
            alt="slutet"
            size={14}
          />
        </StyledArrows>
        <StyledArrows active={currentPage >= pageNumbers.length}>
          <Icon
            onClick={
              currentPage >= pageNumbers.length
                ? undefined
                : () => handlePaginationArrows(pageNumbers.length)
            }
            src={toEnd}
            alt="slutet"
            size={14}
          />
        </StyledArrows>
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
  box-sizing: border-box;
  width: 3rem;
  height: 2.5rem;
  list-style-type: none;
  text-align: center;
  margin: 0 auto;
  padding: 0.7rem 0.9rem;
  background-color: white;
  transition: all ease 0.3s;
  :hover {
    color: white;
    background-color: black;
  }
  ${({ active: active }) =>
    active
      ? css`
          background-color: black;
          color: white;
        `
      : undefined}
`;

const StyledArrows = styled.li<StyledLiProps>`
  box-sizing: border-box;
  width: 3rem;
  height: 2.5rem;
  list-style-type: none;
  margin: auto;
  padding: 0.8rem 0.8rem;
  background-color: white;
  transition: all ease 0.3s;
  cursor: pointer;
  }
  ${({ active: active }) =>
    active
      ? css`
          background-color: #dbdbdb;
          cursor: unset;
          color: white;
        `
      : undefined}
`;
