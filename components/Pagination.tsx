import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import React, { useEffect, useState } from 'react';

import { Icon } from './Icon';
import back from '../public/back.svg';
import toEnd from '../public/toEnd.svg';
import toStart from '../public/toStart.svg';
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

  const baseStart: number = 0;
  const baseEnd: number = 5;

  const [start, setStart] = useState(baseStart);
  const [end, setEnd] = useState<number>(baseEnd);

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

    if (currentPage <= 5) {
      setStart(baseStart);
      setEnd(baseEnd);
      return;
    }
    if (pageIndex + 2 >= pageNumbers.length) {
      const lastPages = pageNumbers.length;
      setStart(lastPages - 5);
      setEnd(lastPages);
      return;
    } else {
      setStart(currentPage - 3);
      setEnd(currentPage + 2);
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
    <StyledNavigation>
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
    </StyledNavigation>
  );
};

export default Pagination;

const StyledNavigation = styled.nav`
  padding: 1rem 0;
`;

const StyledUl = styled.ul`
  display: flex;
  max-width: 25rem;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  @media (max-width: 800px) {
  }
  a {
    width: 100%;
  }
`;

const StyledLi = styled.li<StyledLiProps>`
  height: 2.5rem;
  list-style-type: none;
  background-color: white;
  transition: all ease 0.3s;
  text-align: center;
  padding-top: 0.7rem;
  :hover {
    color: white;
    background-color: black;
  }
  @media (max-width: 800px) {
    heigth: 2rem;
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
  padding: 0.8rem 0.8rem;
  background-color: white;
  transition: all ease 0.3s;
  cursor: pointer;
  }
  @media (max-width: 800px) {
    width: 3rem;
    heigth: 2rem;
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
