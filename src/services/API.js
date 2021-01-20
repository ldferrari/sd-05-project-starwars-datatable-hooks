const STARWARS_BASE_API = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getCurrentSW = () => (
  fetch(STARWARS_BASE_API)
    .then((response) => (
      response.json()
        .then((planets) => (response.ok ? (planets.results) : (planets.results)))
        .catch((error) => error)
    ))
);

export default getCurrentSW;
