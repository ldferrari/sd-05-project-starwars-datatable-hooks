import React, { useState } from 'react';
import propTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

const StarWarsProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [textInput, setTextInput] = useState('');

  const mainState = {
    loading,
    data,
    textInput,
    setLoading,
    setData,
    setTextInput,
  };

  return <StarWarsContext.Provider value={mainState}>{children}</StarWarsContext.Provider>;
};

export default StarWarsProvider;

StarWarsProvider.propTypes = {
  children: propTypes.string.isRequired,
};
