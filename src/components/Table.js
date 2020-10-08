import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import getPlanets from '../apiPlanet';
import Cabecalho from '../components/Cabecalho';
import Infos from '../components/Infos';

const aplicaComparacao = (planet, filter) => {
  const { column, comparison, value } = filter;
  if (comparison === 'maior que') {
    return Number(planet[column]) > Number(value);
  } else if (comparison === 'menor que') {
    return Number(planet[column]) < Number(value);
  } else if (comparison === 'igual a') {
    return Number(planet[column]) === Number(value);
  }
  return planet;
};

const ordenaPlaneta = (planetas, filterOrder) => {
  const numericColumn = [
    'rotation_period',
    'orbital_period',
    'diameter',
    'surface_water',
    'population',
  ];
  const { column, sort } = filterOrder;
  if (numericColumn.includes(column.toLowerCase())) {
    if (sort === 'ASC') {
      return planetas.sort((a, b) => a[column.toLowerCase()] - b[column.toLowerCase()]);
    }
    return planetas.sort((a, b) => b[column.toLowerCase()] - a[column.toLowerCase()]);
  }
  if (sort === 'ASC') {
    return planetas.sort((a, b) => (a[column.toLowerCase()] < b[column.toLowerCase()] ? -1 : 1));
  }
  return planetas.sort((a, b) => (b[column.toLowerCase()] < a[column.toLowerCase()] ? -1 : 1));
};

const Table = () => {
  const {
    data,
    setData,
    isFetching,
    setIsFetching,
    nombreProcurado,
    filterByNumericValues,
    filterOrder,
  } = useContext(StarWarsContext);

  useEffect(() => {
    // componentDidMount no redux
    getPlanets().then((resultado) => {
      setData(resultado.results);
      setIsFetching(false);
    });
  }, []);
  let planetas = data;
  planetas = data.filter(
    (planeta) => planeta.name.toLowerCase().indexOf(nombreProcurado.toLowerCase()) >= 0,
  );
  filterByNumericValues.forEach((filtro) => {
    planetas = planetas.filter((planeta) => aplicaComparacao(planeta, filtro));
  });
  planetas = ordenaPlaneta(planetas, filterOrder);
  return (
    <div>
      StarWars Datatable with Filters
      <table>
        <Cabecalho />
        {
          // if ternário
          isFetching === false ? planetas.map((batatinha) => <Infos batatinha={batatinha} />) : null
        }
      </table>
    </div>
  );
};

export default Table;

/*
class Table extends React.Component {

  render() {
    // results e isFetching estão vindo do mapStateToProps
  }
}

// mapStateToProps -> faz o papel do subscribe no redux
// e no React faz o papel do render()

const mapStateToProps = (state) => ({ // é executada toda vez que a store é alterada
  apiplanetReducer -> reducer/index.js | isFetching -> actions/actionApi.js
  isFetching: state.apiPlanetReducer.isFetching,
  results: state.apiPlanetReducer.batatinhaResults,
  nombreProcurado: state.filters.filterByName.name, // filterByname.
  numericFilter: state.filters.filterByNumericValues,
}); // o Objeto retornado é uma props acessível no componente Table

const mapDispatchToProps = (dispatch) => ({
  getPlanets: () => dispatch(fetchPlanets()),
});

// currying - conceito de programação funcional
export default connect(mapStateToProps, mapDispatchToProps)(Table);
// o primeiro parâmetro do connect é esperado o mapStateToProps e depois o mapDispatchToProps

Table.propTypes = {
  isFetching: propTypes.bool.isRequired,
  results: propTypes.arrayOf(propTypes.instanceOf(Object)).isRequired,
  getPlanets: propTypes.func.isRequired,
  nombreProcurado: propTypes.string.isRequired,
  numericFilter: propTypes.arrayOf(propTypes.instanceOf(Object)).isRequired,
};
 */
