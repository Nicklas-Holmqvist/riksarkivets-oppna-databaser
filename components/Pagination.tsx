import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import { LuChevronLeft } from '@metamist/lucide-react';
import { LuChevronLast } from '@metamist/lucide-react';
import { LuChevronFirst } from '@metamist/lucide-react';
import { LuChevronRight } from '@metamist/lucide-react';
import React, { useEffect, useState } from 'react';

interface StyledLiProps {
  active: boolean;
}
interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  handlePagination: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  handlePagination,
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
  }, [currentPage, handlePagination]);

  const currentPages = pageNumbers.slice(start, end);

  function handlePaginationArrows(value: number) {
    handlePagination();
    router.push(`${pathname}?page=${value}`);
  }

  return (
    <StyledNavigation>
      <StyledUl>
        <StyledArrows active={currentPage <= 1}>
          <LuChevronFirst
            onClick={() =>
              currentPage <= 1 ? undefined : handlePaginationArrows(1)
            }
            color={currentPage <= 1 ? 'lightgrey' : 'black'}
            size={24}
          />
        </StyledArrows>
        <StyledArrows active={currentPage <= 1}>
          <LuChevronLeft
            onClick={() =>
              currentPage <= 1
                ? undefined
                : handlePaginationArrows(currentPage - 1)
            }
            color={currentPage <= 1 ? 'lightgrey' : 'black'}
            size={24}
          />
        </StyledArrows>

        {currentPages.map((number: any) => (
          <StyledLi
            key={number}
            onClick={
              Number(query.page) === number
                ? undefined
                : () => handlePagination()
            }
          >
            <StyledLink
              href={`${pathname}?page=${number}`}
              active={Number(query.page) === number}
            >
              {number}
            </StyledLink>
          </StyledLi>
        ))}
        <StyledArrows active={currentPage >= pageNumbers.length}>
          <LuChevronRight
            onClick={() =>
              currentPage >= pageNumbers.length
                ? undefined
                : handlePaginationArrows(currentPage + 1)
            }
            color={currentPage >= pageNumbers.length ? 'lightgrey' : 'black'}
            size={24}
          />
        </StyledArrows>
        <StyledArrows active={currentPage >= pageNumbers.length}>
          <LuChevronLast
            onClick={
              currentPage >= pageNumbers.length
                ? undefined
                : () => handlePaginationArrows(pageNumbers.length)
            }
            color={currentPage >= pageNumbers.length ? 'lightgrey' : 'black'}
            size={24}
          />
        </StyledArrows>
      </StyledUl>
    </StyledNavigation>
  );
};

export default Pagination;

const StyledNavigation = styled.nav`
  padding: 1rem 0;
  @media (max-width: 800px) {
    2rem;
  }
`;

const StyledUl = styled.ul`
  display: flex;
  justfify-content: center;
  align-items: center;
  place-content: center;
  height: 100%;
  margin: 0 auto;
  a {
    width: 100%;
  }
`;

const StyledLi = styled.li`
  list-style-type: none;
  transition: all ease 0.3s;
  width: 3rem;
  @media (max-width: 800px) {
    width: 2rem;
  }
  :hover {
    color: white;
  }
`;

const StyledLink = styled(Link)<StyledLiProps>`
  display: block;
  height: 100%;
  padding: 0 0.4rem 0 0.4rem;
  text-align: center;
  ${({ active: active }) =>
    active
      ? css`
          font-size: 1.4rem;
          @media (max-width: 800px) {
            font-size: 1.2rem;
            :hover {
              font-size: 1.2rem;
            }
          }
        `
      : undefined}
  :hover {
    font-size: 1.4rem;
  }
  @media (max-width: 800px) {
    2rem;
    :hover {
      font-size: 1.2rem;
    }
  }
`;
const StyledArrows = styled.li<StyledLiProps>`
display: flex;
align-items:center;
justify-content: center;
  list-style-type: none;
  transition: all ease 0.3s;
  margin: 0 0.7rem;
  cursor: pointer;
  }
  ${({ active: active }) =>
    active
      ? css`
          cursor: unset;
        `
      : undefined}
`;
