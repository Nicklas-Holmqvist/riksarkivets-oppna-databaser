import styled from 'styled-components';
import React, { useEffect, useState } from 'react';

import Search from '../components/Search';
import kurhuset from '../data/kurhuset.json';
import Pagination from '../components/Pagination';
import TableList from '../components/TableList';
import NoSearchResult from '../components/NoSearchResult';

const Kurhuset = () => {
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = data.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setData(
      kurhuset.data.sort(
        (a, b) =>
          Date.parse(a.inskrivningsdatum) - Date.parse(b.inskrivningsdatum)
      )
    );
  }, []);

  function handleSearchEvent(searchValue: string) {
    return fetchSearchResult(searchValue);
  }

  function paginate(pageNumber: number) {
    return setCurrentPage(pageNumber);
  }

  function fetchSearchResult(searchValue: string) {
    const result = kurhuset.data.filter((person) =>
      person.förnamn?.toLowerCase().includes(searchValue)
    );
    setData(
      result.sort(
        (a, b) =>
          Date.parse(a.inskrivningsdatum) - Date.parse(b.inskrivningsdatum)
      )
    );
  }

  return (
    <main>
      <SearchSection>
        <Search handleSearchEvent={handleSearchEvent} />
      </SearchSection>
      <section>
        {currentPosts.length !== 0 ? (
          <TableList data={currentPosts} />
        ) : undefined}
        {currentPosts.length !== 0 ? (
          <Pagination
            totalItems={data.length}
            itemsPerPage={itemsPerPage}
            paginate={paginate}
          />
        ) : (
          <NoSearchResult />
        )}
      </section>
    </main>
  );
};

export default Kurhuset;

const SearchSection = styled.section`
  box-sizing: border-box;
  text-align: center;
  padding: 1rem 0;
`;
