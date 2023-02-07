import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';

import Search from '../components/Search';
import kurhuset from '../data/kurhuset.json';
import TableList from '../components/TableList';
import Pagination from '../components/Pagination';
import NoSearchResult from '../components/NoSearchResult';

const Kurhuset = () => {
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const [searchValue, setSearchValue] = useState<string>('');

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

  const prevSearchValueRef = useRef(searchValue);

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
    prevSearchValueRef.current = searchValue;
    if (event.target.value.length > 3)
      return handleSearchEvent(event.target.value);
    if (
      event.target.value.length === 0 &&
      prevSearchValueRef.current.length <= 1
    )
      return handleSearchEvent('');
  }

  function handleSearchEvent(event: string) {
    return fetchSearchResult(event);
  }

  function handleResetEvent() {
    prevSearchValueRef.current = '';
    setSearchValue('');
    handleSearchEvent('');
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
        <Search
          onInputChange={onInputChange}
          handleResetEvent={handleResetEvent}
          searchValue={searchValue}
        />
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
