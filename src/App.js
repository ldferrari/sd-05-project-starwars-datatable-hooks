import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Header from './components/header';
import Table from './components/Table';

function App() {
  return (
    <div className="App">
      <Provider>
        <Header />
        <Table />
      </Provider>
    </div>
  );
}

export default App;
