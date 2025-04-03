import React, { useState } from 'react';
import '../styles/App.css';
import Input from '../components/Input';
import Table from '../components/Table';
import Footer from './Footer';

function getDate(date) {
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('fr-FR', options).charAt(0).toUpperCase() + 
         date.toLocaleDateString('fr-FR', options).slice(1);
}

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  return (
    <div className="App">
      <h1 className='main-title'>Orgodoo</h1>
      <div className='nav-date'>
        <div className="date-container">
          <h1>{getDate(currentDate)}</h1>
        </div>
      </div>

      <Table />
      <Input />
      <Footer />
    </div>
  );
}

export default App;
