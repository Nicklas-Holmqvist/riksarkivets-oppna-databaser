import Head from 'next/head';
import styled from 'styled-components';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';
import { InferGetServerSidePropsType } from 'next';
import React, { useEffect, useRef, useState } from 'react';

import Search from '../components/Search';
import TableList from '../components/TableList';
import Pagination from '../components/Pagination';
import { sortDate } from '../utils/sortDate';
import NoSearchResult from '../components/NoSearchResult';
import { KurhusetIOstersund } from '../types/KurhusetIOstersund';
import Loader from '../components/Loader';

const Kurhuset = ({
  startData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [listData, setListData] = useState<KurhusetIOstersund[] | []>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(25);
  const [searchValue, setSearchValue] = useState<string>('');
  const [totalInList, setTotalInList] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { push, pathname, query } = router;

  const searchDB = 'kurhuset';
  const prevSearchValue = useRef('');

  function onInputChange(value: string) {
    setSearchValue(value);
    prevSearchValue.current = searchValue;
  }

  function handleResetEvent() {
    setSearchValue('');
    prevSearchValue.current = '';
    getAllPosts();
  }

  async function handleSearchEvent() {
    setLoading(true);
    push(pathname + '?page=1');
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchDB,
        searchValue,
      }),
    };
    const response = await fetch('/api/get-search-result', options);
    const data = await response.json();
    setTotalInList(data.count);
    setListData(data.data);
    setLoading(false);
    return data;
  }

  async function handlePagination() {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchDB,
        searchValue,
        pagination: { perPage: itemsPerPage, page: query.page },
      }),
    };
    const response = await fetch('/api/handle-pagination', options);
    const data = await response.json();
    setTotalInList(data.count);
    setListData(data.data);
    return data;
  }

  async function getAllPosts() {
    setLoading(true);
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchDB,
        searchValue,
      }),
    };
    const response = await fetch('/api/get-all-posts', options);
    const data = await response.json();

    setTotalInList(data.count);
    setListData(data.data);
    setLoading(false);
    return data;
  }

  useEffect(() => {
    setLoading(true);
    setListData(sortDate(startData.data));
    setTotalInList(startData.count!);
    setLoading(false);
    query.page
      ? push(`${pathname}?page=${query.page}`)
      : push(pathname + '?page=1');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (prevSearchValue.current.length === 1 && searchValue === '') {
      handleResetEvent();
    } else return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  useEffect(() => {
    query.page ? handlePagination() : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.page]);

  return (
    <>
      <Head>
        <title>Kurhuset i Östersund</title>
        <meta
          name="description"
          content="Sök i patientregistret från Kurhuset i Östersund som byggdes i början av 1800-talet för att inhysa de sjuka i sjukdomen Syfilis. Det var aktivt mellan 1817 och 1866."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <MainSection>
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
              <>
                <TableList data={listData} />
                <Pagination
                  totalItems={totalInList!}
                  itemsPerPage={itemsPerPage}
                  handlePagination={handlePagination}
                />
              </>
            ) : (
              <NoSearchResult />
            )}
          </ListSection>
        )}
      </MainSection>
    </>
  );
};

export default Kurhuset;

export async function getServerSideProps() {
  let { data, count, error } = await supabase
    .from('kurhuset')
    .select('*', { count: 'exact' })
    .order('list_order', { ascending: true })
    .range(0, 24);

  const startData = {
    data: data,
    count: count,
    error: error,
  };

  return {
    props: {
      startData,
    },
  };
}

const MainSection = styled.main`
  margin-bottom: 0.5rem;
  @media (max-width: 1200px) {
    padding: 0 0.5rem;
  }
  @media (max-width: 800px) {
    padding-top: 5rem;
  }
`;

const SearchSection = styled.section`
  text-align: center;
  padding-top: 1rem;
`;

const StyledListCount = styled.section`
  padding-bottom: 0.6rem;
  font-size: 0.8rem;
  font-weight: 600;
  @media (max-width: 800px) {
    padding-left: 1rem;
  }
`;

const StyledPageTitle = styled.h2`
  display: none;
  @media (max-width: 800px) {
    display: inline-block;
    padding-left: 1rem;
  }
`;

const ListSection = styled.section``;
