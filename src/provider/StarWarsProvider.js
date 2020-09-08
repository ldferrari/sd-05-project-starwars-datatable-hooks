import React, { useState } from 'react';
import propTypes from 'prop-types';
import StarWarsContext from '../context/StarWarsContext';

const StarWarsProvider = ({ children }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState({
    filterByName: {
      name: '',
    },
  });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  // const [order, setOrder] = useState({
  //   column: 'Name',
  //   sort: 'ASC',
  // });

  const states = {
    isFetching,
    setIsFetching,
    data,
    setData,
    filterText: filterText.filterByName,
    setFilterText,
    filterByNumericValues,
    setFilterByNumericValues,
    // order,
    // setOrder
  };

  return (
    <StarWarsContext.Provider value={states}>
      {children}
    </StarWarsContext.Provider>
  );
};

export default StarWarsProvider;

StarWarsProvider.propTypes = {
  children: propTypes.string.isRequired,
};
