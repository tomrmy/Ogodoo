import React from 'react';
import '../styles/BoiteDeDialogue.css'; 
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, } from '@fortawesome/free-solid-svg-icons'

function BoiteDeDialogue({ show, onConfirm, onCancel }) {
  if (!show) {
    return null; 
  }

  return (
    <div className="boite-dialogue-overlay">
      <div className="boite-dialogue">
        <h2>Confirmer la suppression</h2>
        <p>Êtes-vous sûr de vouloir supprimer cette tâche ?</p>
        <div className="boite-dialogue-buttons">
          <button onClick={onCancel} className="btn-annuler"><FontAwesomeIcon icon={faXmark} /></button>
          <button onClick={onConfirm} className="btn-confirmer"><FontAwesomeIcon icon={faCheck} /></button>
        </div>
      </div>
    </div>
  );
}

export default BoiteDeDialogue;