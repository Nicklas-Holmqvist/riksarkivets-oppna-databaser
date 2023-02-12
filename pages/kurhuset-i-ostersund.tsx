import styled, { css } from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

import Search from '../components/Search';
import kurhuset from '../data/kurhuset.json';
import TableList, { Person } from '../components/TableList';
import Pagination from '../components/Pagination';
import { sortDate } from '../utils/sortDate';
import NoSearchResult from '../components/NoSearchResult';
import DropdownFilter from '../components/DropdownFilter';

interface FilterProps {
  socken: string;
  by: string;
  titel: string;
  utskrivningsstatus: string;
}
[];

const baseFilter = {
  socken: '',
  by: '',
  titel: '',
  utskrivningsstatus: '',
};

interface StyledButtonProps {
  active: boolean;
}

const Kurhuset = () => {
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(25);
  const [searchValue, setSearchValue] = useState<string>('');
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filterValues, setFilterValues] = useState<FilterProps>(baseFilter);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = data.slice(indexOfFirstItem, indexOfLastItem);

  const dropdowns = {
    socken: GetDropdownValues('socken'),
    by: GetDropdownValues('by'),
    titel: GetDropdownValues('titel'),
    utskrivningsstatus: GetDropdownValues('status'),
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
      case 'status':
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
    else
      event.target.value.length === 0 && prevSearchValueRef.current.length <= 1;
    // return handleResetEvent();
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
    setFilterValues(baseFilter);
    prevDropdownValueRef.current = false;
  }

  function fetchSearchResult(searchValue: string) {
    const result = kurhuset.data.filter(
      (person) =>
        person.förnamn?.toLowerCase().includes(searchValue.toLowerCase()) ||
        person.efternamn?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setData(sortDate(result));
  }

  const prevDropdownValueRef = useRef(false);
  function onDropdownChange(id: string, value: string) {
    prevDropdownValueRef.current = false;
    switch (id) {
      case 'Socken':
        if (value === 'reset') {
          setFilterValues((oldState) => ({
            ...oldState,
            socken: '',
          }));
          prevDropdownValueRef.current = true;
          break;
        } else {
          setFilterValues((oldState) => ({
            ...oldState,
            socken: value,
          }));
          prevDropdownValueRef.current = true;
          break;
        }
      case 'By':
        if (value === 'reset') {
          setFilterValues((oldState) => ({
            ...oldState,
            by: '',
          }));
          prevDropdownValueRef.current = true;
          break;
        } else {
          setFilterValues((oldState) => ({
            ...oldState,
            by: value,
          }));
          prevDropdownValueRef.current = true;
          break;
        }
      case 'Titel':
        if (value === 'reset') {
          setFilterValues((oldState) => ({
            ...oldState,
            titel: '',
          }));
          prevDropdownValueRef.current = true;
          break;
        } else {
          setFilterValues((oldState) => ({
            ...oldState,
            titel: value,
          }));
          prevDropdownValueRef.current = true;
          break;
        }
      case 'Status':
        if (value === 'reset') {
          setFilterValues((oldState) => ({
            ...oldState,
            utskrivningsstatus: '',
          }));
          prevDropdownValueRef.current = true;
          break;
        } else {
          setFilterValues((oldState) => ({
            ...oldState,
            utskrivningsstatus: value,
          }));
          prevDropdownValueRef.current = true;
          break;
        }
      default:
        console.log('Inget värde!');
    }
  }

  useEffect(() => {
    if (prevDropdownValueRef.current === true) {
      console.log('WOOT');
      setData(
        data.filter(
          (person: Person) =>
            person.socken.includes(filterValues.socken) &&
            person.by.includes(filterValues.by) &&
            person.titel.includes(filterValues.titel) &&
            person.utskrivningsstatus.includes(filterValues.utskrivningsstatus)
        )
      );
      prevDropdownValueRef.current = false;
    } else return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValues]);

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
            searchValue={searchValue}
            placeholder="Sök på namn- eller efternamn"
            noResult={currentPosts.length !== 0}
            maxLength={25}
          />
        </SearchSection>
        <FilterSection>
          <StyledForm onSubmit={(event) => event.preventDefault()}>
            <StyledButton
              active={showFilter}
              onClick={() => setShowFilter(!showFilter)}
            >
              {showFilter ? 'Visa filter' : 'Dölj filter'}
            </StyledButton>
            <StyledResetButton type="reset" onClick={handleResetEvent}>
              Rensa sök och filter
            </StyledResetButton>
            {showFilter ? undefined : (
              <FilterContainer>
                <DropdownFilter
                  onDropdownChange={onDropdownChange}
                  data={dropdowns.socken}
                  id={'Socken'}
                  reset={onDropdownChange}
                />
                <DropdownFilter
                  onDropdownChange={onDropdownChange}
                  data={dropdowns.by}
                  id={'By'}
                  reset={onDropdownChange}
                />
                <DropdownFilter
                  onDropdownChange={onDropdownChange}
                  data={dropdowns.titel}
                  id={'Titel'}
                  reset={onDropdownChange}
                />
                <DropdownFilter
                  onDropdownChange={onDropdownChange}
                  data={dropdowns.utskrivningsstatus}
                  id={'Status'}
                  reset={onDropdownChange}
                />
              </FilterContainer>
            )}
          </StyledForm>
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
  padding-top: 1rem;
`;

const FilterSection = styled.section`
  padding-top: 1rem;
  @media (max-width: 800px) {
    padding: 1rem;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 0.5rem;
`;

const StyledListCount = styled.section`
  padding-bottom: 0.6rem;
  font-size: 0.8rem;
  font-weight: 600;
  @media (max-width: 800px) {
    padding-left: 1rem;
  }
`;

const StyledForm = styled.form`
  flex-direction: column;
  padding: 1rem 0;
  @media (max-width: 680px) {
    width: 100%;
    padding: 0.5rem 0;
  }
  label {
    padding: 0.2rem 0.5rem 0.2rem 0;
    font-size: 0.8rem;
    width: 4rem;
    font-weight: 600;
  }
  select {
    width: 15rem;
    padding: 0.2rem;
    @media (max-width: 680px) {
      width: 100%;
    }
  }
`;

const StyledResetButton = styled.button`
  padding: 0.2rem 0.6rem;
  background-color: transparent;
  cursor: pointer;
  font-weight: 600;
  background-color: #0d5c91;
  color: white;
  min-width: 80px;
  border: 1px solid #0d5c91;
  border-radius: 0.2rem;
  text-align: center;
  transition: all ease 0.2s;
  :active {
    background-color: white;
    color: #0d5c91;
  }
`;

const StyledButton = styled.button<StyledButtonProps>`
  padding: 0.2rem 0.6rem;
  background-color: transparent;
  cursor: pointer;
  font-weight: 600;
  min-width: 80px;
  border: 1px solid #0d5c91;
  border-radius: 0.2rem;
  text-align: center;
  margin-right: 1rem;
  ${({ active }) =>
    active
      ? css`
          background-color: #0d5c91;
          color: white;
        `
      : css`
      border: 1px solid #0d5c91;
          }
        `};
`;
