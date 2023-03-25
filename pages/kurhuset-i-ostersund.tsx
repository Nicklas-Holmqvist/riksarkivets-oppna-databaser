import Head from 'next/head';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { InferGetServerSidePropsType } from 'next';
import React, { useEffect, useRef, useState } from 'react';

import Loader from '../components/Loader';
import Search from '../components/Search';
import TableList from '../components/TableList';
import Pagination from '../components/Pagination';
import NoSearchResult from '../components/NoSearchResult';
import { KurhusetIOstersund } from '../types/KurhusetIOstersund';

const Kurhuset = ({
  start,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [listData, setListData] = useState<KurhusetIOstersund[] | []>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(25);
  const [searchValue, setSearchValue] = useState<string>('');
  const [totalInList, setTotalInList] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const { push, pathname, query } = router;

  const search = query.search;
  const searchDB = 'kurhuset';
  const prevSearchValue = useRef('');

  function onInputChange(value: string) {
    setSearchValue(value);
    prevSearchValue.current = searchValue;
  }

  function handleResetEvent() {
    push(pathname + '?page=1&search=');
    setSearchValue('');
    prevSearchValue.current = '';
    resetSearch();
  }

  function handlePagination(page: number) {
    push(pathname + `?page=${page}&search=${searchValue}`);
    getPosts(page);
  }

  async function getPosts(page: number) {
    setLoading(true);
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchDB,
        search,
        pagination: { perPage: itemsPerPage, page: page },
      }),
    };
    const response = await fetch('/api/posts', options);
    const data = await response.json();
    setTotalInList(data.count);
    setListData(data.data);
    setLoading(false);
    return data;
  }

  async function handleSearchEvent() {
    setLoading(true);
    push(pathname + `?page=1&search=${searchValue}`);
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchDB,
        searchValue,
      }),
    };
    const response = await fetch('/api/search-posts', options);
    const data = await response.json();
    setTotalInList(data.count);
    setListData(data.data);
    setLoading(false);
    return data;
  }

  async function resetSearch() {
    setLoading(true);
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchDB,
      }),
    };
    const response = await fetch('/api/reset', options);
    const data = await response.json();

    setTotalInList(data.count);
    setListData(data.data);
    setLoading(false);
    return data;
  }

  useEffect(() => {
    if (query.page === undefined && query.search === undefined)
      setLoading(false);
    if (query.search === undefined) return;
    else setSearchValue(query.search as string);
    getPosts(Number(query.page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (prevSearchValue.current.length === 1 && searchValue === '') {
      handleResetEvent();
    } else return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  useEffect(() => {
    query.page ? getPosts(Number(query.page)) : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.page, query.search]);

  return (
    <MainSection>
      <Head>
        <title>Kurhuset i Östersund</title>
        <meta
          name="description"
          content="Sök i patientregistret från Kurhuset i Östersund som byggdes i början av 1800-talet för att inhysa de sjuka i sjukdomen Syfilis. Det var aktivt mellan 1817 och 1866."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <StyledPageTitle>Kurhuset i Östersund</StyledPageTitle>
      <SearchSection>
        <Search
          onInputChange={onInputChange}
          handleSearchEvent={handleSearchEvent}
          handleResetEvent={handleResetEvent}
          searchValue={searchValue}
          placeholder="Sök i databas"
          helper="Sökfält: För-, efternamn, socken, by, sjukdom och status"
          noResult={listData.length !== 0}
          maxLength={25}
        />
      </SearchSection>
      {loading ? (
        <Loader />
      ) : (
        <ListSection>
          <StyledListCount>Personer i urval: {totalInList}</StyledListCount>
          {listData.length !== 0 ? (
            <List>
              <TableList data={listData} />
              <Pagination
                totalItems={totalInList!}
                itemsPerPage={itemsPerPage}
                handlePagination={handlePagination}
                searchValue={searchValue}
              />
            </List>
          ) : (
            <NoSearchResult />
          )}
        </ListSection>
      )}
    </MainSection>
  );
};

export default Kurhuset;

export async function getServerSideProps() {
  const start = 'start';

  return {
    props: {
      start,
    },
  };
}

const MainSection = styled.section`
  height: 100%;
  margin-bottom: 0.5rem;
  @media (max-width: 1200px) {
    padding: 0 0.5rem;
  }
  @media (max-width: 800px) {
    padding-top: 5rem;
  }
`;

const ListSection = styled.article`
  height: 100%;
`;

const SearchSection = styled.article`
  text-align: center;
  padding-top: 1rem;
`;

const StyledListCount = styled.article`
  padding-bottom: 0.6rem;
  font-size: 0.8rem;
  font-weight: 600;
  @media (max-width: 800px) {
    padding-left: 1rem;
  }
`;

const List = styled.div``;

const StyledPageTitle = styled.h2`
  display: none;
  @media (max-width: 800px) {
    display: inline-block;
    padding-left: 1rem;
  }
`;
