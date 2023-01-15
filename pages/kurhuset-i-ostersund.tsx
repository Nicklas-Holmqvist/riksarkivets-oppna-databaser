import React from 'react';

import kurhuset from '../data/kurhuset.json';

const Kurhuset = () => {
  const found = kurhuset.data.filter((person) =>
    person.efternamn?.toLowerCase().includes('gun')
  );
  return (
    <main>
      <section>search</section>
      <section>list</section>
    </main>
  );
};

export default Kurhuset;
