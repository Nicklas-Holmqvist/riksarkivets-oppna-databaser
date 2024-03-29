import Head from 'next/head';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import Search from '../components/Search';
import TableList from '../components/desktop/TableList';
import Pagination from '../components/Pagination';
import NoSearchResult from '../components/NoSearchResult';
import { KurhusetList } from '../types/KurhusetIOstersund';
import { SearchesProps } from '../components/searchHistory';
import LoadingSkeletonDesktop from '../components/loaders/LoadingSkeletonDesktop';
import LoadingSkeletonMobile from '../components/loaders/LoadingSkeletonMobile';

const databaseName = 'kurhuset';

const tableTitles: string[] = [
  'Nr',
  'Namn',
  'Inskrivning',
  'Ålder',
  'Sjukdom',
  'Utskrivning',
  'Status',
];

const Kurhuset = () => {
  const [listData, setListData] = useState<KurhusetList[] | []>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(25);
  const [searchValue, setSearchValue] = useState<string>('');
  const [totalInList, setTotalInList] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [localHistory, setLocalHistory] = useState<SearchesProps[] | null>(
    null
  );

  const router = useRouter();
  const { push, pathname, query } = router;

  const prevSearchValue = useRef('');
  const firstLoad = useRef(false);
  const hasSearchResult = useRef(false);

  const mobileView = useMediaQuery({
    query: '(max-width: 1024px)',
  });

  const onInputChange = useCallback(
    (value: string) => {
      setSearchValue(value);
      prevSearchValue.current = searchValue;
    },
    [searchValue]
  );

  const handleLocalStorage = useCallback(
    (value: string, count: number) => {
      const newSearchValue = { value: value, count: count };
      if (value === '') return;
      if (localHistory === null)
        return localStorage.setItem(
          'searchHistory',
          JSON.stringify([newSearchValue])
        );
      if (
        localHistory.find((value: SearchesProps) => value.value === searchValue)
      )
        return null;
      if (localHistory.length === 10) {
        localHistory.shift();
        localHistory.push(newSearchValue);
        localStorage.setItem('searchHistory', JSON.stringify(localHistory));
      } else {
        localHistory.push(newSearchValue);
        localStorage.setItem('searchHistory', JSON.stringify(localHistory));
      }
    },
    [localHistory, searchValue]
  );

  const getPosts = useCallback(
    async (page: number, search: string) => {
      setLoading(true);
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          databaseName,
          search,
          pagination: { perPage: itemsPerPage, page: page },
        }),
      };
      const response = await fetch('/api/posts', options);
      const data = await response.json();
      setTotalInList(data.count);
      setListData(data.data);
      setLoading(false);
      handleLocalStorage(searchValue, data.count);

      return data;
    },
    [handleLocalStorage, itemsPerPage, searchValue]
  );

  const handlePagination = useCallback(
    (page: number) => {
      push(pathname + `?page=${page}&search=${searchValue}`);
      getPosts(page, query.search as string);
    },
    [getPosts, pathname, push, query.search, searchValue]
  );

  const handleSearchEvent = useCallback(() => {
    hasSearchResult.current = true;
    push(pathname + `?page=1&search=${searchValue}`);
    getPosts(1, searchValue);
  }, [getPosts, pathname, push, searchValue]);

  const handleResetEvent = useCallback(() => {
    push(pathname + '?page=1&search=');
    setSearchValue('');
    hasSearchResult.current = false;
    prevSearchValue.current = '';
    getPosts(1, '');
  }, [getPosts, pathname, push]);

  const handleHistoryEvent = useCallback(
    (oldSearch: string) => {
      hasSearchResult.current = true;
      push(pathname + `?page=1&search=${oldSearch}`);
      getPosts(1, oldSearch);
    },
    [getPosts, pathname, push]
  );

  useEffect(() => {
    setLocalHistory(JSON.parse(`${localStorage.getItem('searchHistory')}`));
  }, [loading]);

  useEffect(() => {
    if (firstLoad.current === false) {
      if (query.page === undefined && query.search === undefined)
        setLoading(false);
      firstLoad.current = true;

      if (query.search === undefined) return;
      else setSearchValue(query.search as string);
      getPosts(Number(query.page), query.search as string);
      firstLoad.current = true;
    } else return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Run reset if search field is empty
   */
  useEffect(() => {
    hasSearchResult.current === false
      ? undefined
      : prevSearchValue.current.length === 1 && searchValue === ''
      ? handleResetEvent()
      : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  /**
   * Runs getPosts when user go back and forth in history with mouse or arrows in browser
   */
  useEffect(() => {
    if (query.page) {
      getPosts(Number(query.page), query.search as string);
      if (query.search === '') {
        setSearchValue('');
        hasSearchResult.current = false;
      } else {
        setSearchValue(query.search as string);
        hasSearchResult.current = true;
      }
    }
    return undefined;
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
          handleHistoryEvent={handleHistoryEvent}
          handleSetLocalHistory={setLocalHistory}
          localHistory={localHistory}
          searchValue={searchValue}
          placeholder="Sök i databas"
          helper="Sökfält: För-, efternamn, titel, socken, by, sjukdom och status"
          noResult={listData.length !== 0}
          maxLength={25}
        />
      </SearchSection>
      {loading ? (
        !mobileView ? (
          <LoadingSkeletonDesktop itemsPerPage={itemsPerPage} />
        ) : (
          <LoadingSkeletonMobile itemsPerPage={itemsPerPage} />
        )
      ) : (
        <ListSection>
          <StyledListCount>Personer i urval: {totalInList}</StyledListCount>
          {listData.length !== 0 ? (
            <List>
              <TableList
                data={listData}
                databaseName={databaseName}
                tableTitles={tableTitles}
                mobileView={mobileView}
              />
            </List>
          ) : (
            <NoSearchResult />
          )}
        </ListSection>
      )}
      <Pagination
        totalItems={totalInList!}
        itemsPerPage={itemsPerPage}
        handlePagination={handlePagination}
        searchValue={searchValue}
      />
    </MainSection>
  );
};

export default Kurhuset;

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
