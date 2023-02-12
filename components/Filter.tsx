import React from 'react';

interface FilterProps {
  filterData: () => void;
}

const Filter: React.FC<FilterProps> = ({ filterData }) => {
  return <div onClick={filterData}>Filter</div>;
};

export default Filter;
