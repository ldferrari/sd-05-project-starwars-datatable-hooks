import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

// comondos a executar ao aparter o botão do filtro.
function clickDuplo(conteiner, filterByNumericValues,
  setFilterByNumericValues, setColumnFilter) {
  const colunas = ['COLUNAS', 'population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const set = [...filterByNumericValues, { ...conteiner }];
  set.forEach((Select) => {
    colunas.splice(colunas.indexOf(Select.column), 1);
    setColumnFilter(colunas);
  });
  setFilterByNumericValues(set);
}

function ButtonFilter(conteiner) {
  const { filterByNumericValues, setFilterByNumericValues,
    setColumnFilter } = useContext(StarWarsContext);
  return (
    <button
      data-testid="button-filter" onClick={() => {
        clickDuplo(conteiner, filterByNumericValues,
          setFilterByNumericValues, setColumnFilter);
      }}
    >
    Filtrar
    </button>
  );
}

// filtrar pela coluna.
function FilterValues() {
  const { columnFilter } = useContext(StarWarsContext);
  const comparação = [['COMPARAÇÃO'], ['maior que'], ['igual a'], ['menor que']];
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState('');
  const selectFilter = (event) => {
    if (event.target.name === 'column') {
      setColumn(event.target.value);
    } else if (event.target.name === 'comparison') {
      setComparison(event.target.value);
    } else {
      setValue(event.target.value);
    }
  };

  return (
    <div>
      <div>
        <select
          data-testid="column-filter" type="ComboBox"
          name="column" onChange={(event) => selectFilter(event)}
        >
          {(columnFilter.filter((parametro) => (parametro))).map((colunmValue) =>
            <option key={colunmValue}>{colunmValue}</option>)}
        </select>
        <select
          data-testid="comparison-filter" type="ComboBox"
          name="comparison" onChange={(event) => selectFilter(event)}
        >
          {comparação.map((comparacaoValue) => <option key={comparacaoValue}>
            {comparacaoValue}</option>)}
        </select>
      </div>
      <div>
        <input
          data-testid="value-filter" type="number" name="value"
          onChange={(event) => selectFilter(event)}
        />
      </div>
      <ButtonFilter column={column} comparison={comparison} value={value} />
    </div>
  );
}

// botão para remover a seleção.
function ButtonRemove() {
  const { filterByNumericValues, setFilterByNumericValues,
    setColumnFilter, columnFilter } = useContext(StarWarsContext);
  return (
    <div >
      {filterByNumericValues.map((filtro) => (
        <div data-testid="filter" className="removeFilterItem" key={filtro.column}>
          <button
            className="buttonRemove"
            onClick={async () => {
              (setFilterByNumericValues(filterByNumericValues
              .filter((elementRemove) => elementRemove.column !== filtro.column)));
              setColumnFilter([...columnFilter, filtro.column]);
            }}
          >
            X
          </button>
          <div>
            {filtro.column} {filtro.comparison} {filtro.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function Header() {
  const { setFilterByName, filterByNumericValues } = useContext(StarWarsContext);

  // excluir seleção.
  function removeFilter() {
    if (filterByNumericValues.length > 0) {
      return (
        <div>
          <div>
            <p className="textHeder">Filtros</p>
          </div>
          <ButtonRemove />
        </div>
      );
    }
    return ('');
  }

  // header visual para o usuário.
  return (
    <div className="header">
      <div className="prourarNome">
        <p className="textHeder">Procurar pelo nome:</p>
        <input
          data-testid="name-filter" type="text" name="name-filter"
          onChange={(event) => { setFilterByName({ name: event.target.value }); }}
        />
      </div>
      <div className="filtrarValorNumber">
        <FilterValues />
      </div>
      <div className="removeFilter">
        {removeFilter()}
      </div>
    </div>
  );
}

export default Header;
