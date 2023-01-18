import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

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
  const { page } = router.query;
  let pageNumbers = [];

  const [pages, setPages] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(7);

  const currentPage: number = Number(page);
  const minimumPaginationCollapse: number = 5;
  const collapsedPaginationNumber: number = 3;

  const collapsedHigherCurrentPage = (): number => {
    return Number(page) + 3;
  };

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    if (currentPage <= 5) {
      setStart(0);
      setEnd(7);
    } else {
      setStart(currentPage - 4);
      setEnd(currentPage + 3);
    }
  }, [currentPage, paginate]);
  console.log(currentPage, start, end);

  const currentPages = pageNumbers.slice(start, end);

  return (
    <nav>
      <ol>
        {currentPages.map((number: any) => (
          <li
            key={number}
            value={Number(page) === number ? number : 0}
            onClick={() => paginate(number)}
          >
            <Link href={`/kurhuset-i-ostersund?page=${number}`}>{number}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Pagination;
