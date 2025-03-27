import React from 'react';
import '../styles/TacheFini.css'

function TacheFini({ tachesFinies }) {
  return (
    <div className='tableaux'>
      {tachesFinies.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th className='nom'>Nom</th>
              <th className='prio'>Priorité</th>
              <th className='date-limite'>Date Limite</th>
            </tr>
          </thead>
          <tbody>
            {tachesFinies.map((tache, index) => (
              <tr key={index}>
                <td>{tache.titre}</td>
                <td>{tache.prio}</td>
                <td>{tache.dateLimite}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default TacheFini;
