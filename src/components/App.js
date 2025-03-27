import React, { useState } from 'react';
import '../styles/App.css';
import Input from '../components/Input';
import Table from '../components/Table';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function getDate(date) {
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('fr-FR', options).charAt(0).toUpperCase() + 
         date.toLocaleDateString('fr-FR', options).slice(1);
}

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  function changeDay(days) {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  }
  return (
    <div className="App">
      <h1 className='main-title'>Orgodoo</h1>

      <div className='nav-date'>
        <button className='btn' onClick={() => changeDay(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button> 

        <div className="date-container">
          <h1>{getDate(currentDate)}</h1>
        </div>

        <button className='btn' onClick={() => changeDay(1)}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>

      <Table />
      <Input />
    </div>
  );
}

export default App;
