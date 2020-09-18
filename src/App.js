import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Component/Header';
import TableView from './Component/TableView';

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <TableView />
      </div>
    </>
  );
}

export default App;
