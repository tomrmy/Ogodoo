import React from 'react';
import '../styles/Table.css'

function TacheFini({ tachesFinies }) {
  return (
    <div className='tableaux'>
      {tachesFinies.length > 0 ? (
        <div>
        <h1>Tâches terminées récemment</h1>
        <table>
          <thead className='head-fini'>
            <tr>
              <th className='nom-fini'>Nom</th>
              <th className='statut-fini'>Statut</th>
              <th className='prio-fini'>Priorité</th>

            </tr>
          </thead>
          <tbody>
            {tachesFinies.map((tache, index) => (
              <tr key={index}>
                <td>{tache.titre}</td>
                <td>Terminer</td>
                <td>{tache.prio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default TacheFini;