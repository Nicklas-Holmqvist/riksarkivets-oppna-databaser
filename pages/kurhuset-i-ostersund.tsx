import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

import Search from '../components/Search';
import kurhuset from '../data/kurhuset.json';
import TableList, { Person } from '../components/TableList';
import Pagination from '../components/Pagination';
import { sortDate } from '../utils/sortDate';
import NoSearchResult from '../components/NoSearchResult';
import Filter from '../components/Filter';
import DropdownFilter from '../components/DropdownFilter';

const Kurhuset = () => {
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(25);
  const [searchValue, setSearchValue] = useState<string>('');

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = data.slice(indexOfFirstItem, indexOfLastItem);

  const dropdowns = {
    socken: GetDropdownValues('socken') || [],
    by: GetDropdownValues('by') || [],
    titel: GetDropdownValues('titel') || [],
    utskrivningsstatus: GetDropdownValues('utskrivningsstatus') || [],
  };

  function GetDropdownValues(dropdownValue: string) {
    const dropdownValues: string[] = [];

    switch (dropdownValue) {
      case 'socken':
        data.forEach((person: Person) => {
          dropdownValues.push(person.socken);
        });
        break;
      case 'by':
        data.forEach((person: Person) => {
          dropdownValues.push(person.by);
        });
        break;
      case 'titel':
        data.forEach((person: Person) => {
          dropdownValues.push(person.titel);
        });
        break;
      case 'utskrivningsstatus':
        data.forEach((person: Person) => {
          dropdownValues.push(person.utskrivningsstatus);
        });
        break;
      default:
        console.log('Inget värde!');
    }

    const filteredDropdownValues = dropdownValues.filter(
      (dropdown: string, index: number) => {
        return dropdownValues.indexOf(dropdown) === index;
      }
    );
    return filteredDropdownValues.sort();
  }

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
    setCurrentPage(1);
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

  function filterData() {
    const filter = {
      socken: '',
      by: '',
      titel: 'Flickan',
      utskrivningsstatus: '',
    };
    setData(
      data.filter(
        (person: Person) =>
          person.socken.includes(filter.socken) &&
          person.by.includes(filter.by) &&
          person.titel.includes(filter.titel) &&
          person.utskrivningsstatus.includes(filter.utskrivningsstatus)
      )
    );
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
            placeholder="Sök på namn- eller efternamn"
            noResult={currentPosts.length !== 0}
            maxLength={25}
          />
        </SearchSection>
        <FilterSection>
          <Filter filterData={filterData} />
          <FilterContainer>
            <DropdownFilter data={dropdowns.socken} id={'Socken'} />
            <DropdownFilter data={dropdowns.by} id={'By'} />
            <DropdownFilter data={dropdowns.titel} id={'Titel'} />
            <DropdownFilter data={dropdowns.utskrivningsstatus} id={'Status'} />
          </FilterContainer>
        </FilterSection>
        <section>
          <StyledListCount>Personer i urval: {data.length}</StyledListCount>
          {currentPosts.length !== 0 ? (
            <>
              <TableList data={currentPosts} />
              <Pagination
                totalItems={data.length}
                itemsPerPage={itemsPerPage}
                paginate={paginate}
              />
            </>
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
  @media (max-width: 800px) {
    padding-top: 4.5rem;
  }
`;

const SearchSection = styled.section`
  text-align: center;
  padding: 1rem 0;
`;

const FilterSection = styled.section`
  padding: 1rem;
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const StyledListCount = styled.section`
  padding-bottom: 0.6rem;
  font-size: 0.8rem;
  font-weight: 600;
  @media (max-width: 800px) {
    padding-left: 1rem;
  }
`;
