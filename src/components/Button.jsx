import React, { useContext } from 'react';
import propTypes from 'prop-types';
import StarWarsContext  from '../context/StarWarsContext';

const Button = ({ data }) => {
  const { 
  data: planets,
  currentFilter,
  addFilter,
  sortingColumn,
  order,
} = useContext(StarWarsContext);
  
  function checkClickedButton(value) {
    if (value === 'button-filter') {
      addFilter(currentFilter)
    }
    else if (value === 'column-sort-button') {
      const {column, sort} = order;
      sortingColumn(planets, sort, column);
    }
  }
  
    return (
      <button
        data-testid={data}
        name={data}
        type="button"
        onClick={() => checkClickedButton(data)}
      >
        Filtrar
      </button>
    );
  }

export default Button;

Button.propTypes = {
  data: propTypes.string,
  planets: propTypes.arrayOf(propTypes.object),
  buttonToSorting: propTypes.func.isRequired,
  buttonToFiltering: propTypes.func.isRequired,
  order: propTypes.shape({
    sort: propTypes.string.isRequired,
    column: propTypes.string.isRequired,
  }).isRequired,
};

Button.defaultProps = {
  data: 'button',
  planets: [{}],
};
