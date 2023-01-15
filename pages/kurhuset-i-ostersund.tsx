import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ListItem from '../components/ListItem';
import Search from '../components/Search';

import kurhuset from '../data/kurhuset.json';

const Kurhuset = () => {
  const [data, setData] = useState<any>([]);

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
        <ListItem data={data} />
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
