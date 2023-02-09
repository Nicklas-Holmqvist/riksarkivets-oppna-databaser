import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

import Search from '../components/Search';
import kurhuset from '../data/kurhuset.json';
import TableList from '../components/TableList';
import Pagination from '../components/Pagination';
import NoSearchResult from '../components/NoSearchResult';
import { sortDate } from '../utils/sortDate';

const Kurhuset = () => {
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(25);
  const [searchValue, setSearchValue] = useState<string>('');

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = data.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setData(sortDate(kurhuset.data));
  }, []);

  const prevSearchValueRef = useRef(searchValue);

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
    prevSearchValueRef.current = searchValue;
    if (event.target.value.length >= 3)
      return handleSearchEvent(event.target.value);
    if (
      event.target.value.length === 0 &&
      prevSearchValueRef.current.length <= 1
    )
      return handleResetEvent();
  }

  function handleSearchEvent(event: string) {
    return fetchSearchResult(event);
  }

  function handleResetEvent() {
    prevSearchValueRef.current = '';
    setSearchValue('');
    setData(sortDate(kurhuset.data));
    setCurrentPage(1);
  }

  function fetchSearchResult(searchValue: string) {
    const result = kurhuset.data.filter(
      (person) =>
        person.förnamn?.toLowerCase().includes(searchValue.toLowerCase()) ||
        person.efternamn?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setData(sortDate(result));
  }

  function paginate(pageNumber: number) {
    return setCurrentPage(pageNumber);
  }

  return (
    <>
      <Head>
        <title>Kurhuset i Östersund</title>
        <meta
          name="description"
          content="Kurhuset i Östersund byggdes i början av 1800-talet för att inhysa de sjuka i sjukdomen Syfilis. Det var aktivt mellan 1817 och 1866"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <MainSection>
        <SearchSection>
          <Search
            onInputChange={onInputChange}
            handleResetEvent={handleResetEvent}
            searchValue={searchValue}
          />
        </SearchSection>
        <section>
          <StyledListCount>Personer i urval: {data.length}</StyledListCount>
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
      </MainSection>
    </>
  );
};

export default Kurhuset;

const MainSection = styled.main`
  @media (max-width: 1200px) {
    padding: 0 0.5rem;
  }
`;

const SearchSection = styled.section`
  box-sizing: border-box;
  text-align: center;
  padding: 1rem 0;
`;

const StyledListCount = styled.section`
  padding-bottom: 0.6rem;
  font-size: 0.8rem;
  font-weight: 600;
  @media (max-width: 800px) {
    padding-left: 1rem;
  }
`;
