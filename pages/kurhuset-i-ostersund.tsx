import React from 'react';
import ListItem from '../components/ListItem';

import kurhuset from '../data/kurhuset.json';

const Kurhuset = () => {
  const found = kurhuset.data.filter((person) =>
    person.förnamn?.toLowerCase().includes('vil')
  );
  return (
    <main>
      <section>search</section>
      <section>
        <ListItem data={found} />
      </section>
    </main>
  );
};

export default Kurhuset;
