import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import PlanetHeder from './planetHeder';
import Planet from './planet';
import '../App.css';

function Table() {
  const { planets, filterByName, filterByNumericValues } = useContext(StarWarsContext);

  if (!planets) { return <h1>Loading...</h1>; }
  let planetas = planets;
  if (filterByName.name !== {}) {
    planetas = planetas.filter((planeta) => planeta.name.includes(filterByName.name));
  }
  filterByNumericValues.forEach((filtro) => {
    const { column, comparison, value } = filtro;
    if (column !== 'COLUNAS' && comparison === 'maior que' && value !== '') {
      planetas = planetas.filter((planeta) => (planeta[column] > Number(value)));
    } else if (column !== 'COLUNAS' && comparison === 'menor que' && value !== '') {
      planetas = planetas.filter((planeta) => (planeta[column] < Number(value)));
    } else if (column !== 'COLUNAS' && comparison === 'igual a' && value !== '') {
      planetas = planetas.filter((planeta) => (Number(planeta[column]) === Number(value)));
    }
  });
  return (
    <div>
      <table className="table">
        <thead>
          <PlanetHeder />
        </thead>
        <tbody>
          {planetas.map((planet) => <Planet planet={planet} key={planet.name} />)}
        </tbody>
      </table>
      {planets.isFetching && 'Loading...'}
      {!planets.isFetching && planets.error}
    </div>
  );
}

export default Table;
