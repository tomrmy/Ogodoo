import '../styles/Table.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPencil} from '@fortawesome/free-solid-svg-icons'
import { faClock} from '@fortawesome/free-solid-svg-icons'


function Table({ taches, suppr, edit, savetaches, editIndex, validerTache}) {

    if (!Array.isArray(taches)) {
        return;
    }
    else{
        
    }

    if (taches)

    return (
        <table className='tableaux'>
            <thead>
                <tr>
                    <th className='nom'>Nom</th>
                    <th className='prio'>Priorité</th>
                    <th className='statut'>Statut</th>
                    <th className='date-limite'>Date Limite</th>
                    <th className='action'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {taches.map((tache, index) => (
                    <tr key={index}>
                        {editIndex === index ? (
                            <>
                                <td className='nom'>
                                    <input className="modif-input" type="text" defaultValue={tache.titre} id={`titre-${index}`} />
                                </td>
                                <td className='prio'>
                                    <select className="modif-input" defaultValue={tache.prio} id={`prio-${index}`}>
                                        <option value="Faible">Faible</option>
                                        <option value="Moyen">Moyen</option>
                                        <option value="Fort">Fort</option>
                                        <option value="Très fort">Très fort</option>
                                    </select>
                                </td>
                                <td className='statut'>
                                        <FontAwesomeIcon icon={faClock} />
                                </td>
                                <td className='date-limite'>
                                    <input className="modif-input" type="date" defaultValue={tache.dateLimite} id={`dateLimite-${index}`} />
                                </td>
                                <td className='btn-modif'>
                                    <button 
                                        className="save-btn" 
                                        onClick={() => savetaches(
                                                index,
                                            document.getElementById(`titre-${index}`).value,
                                            document.getElementById(`prio-${index}`).value,
                                            document.getElementById(`dateLimite-${index}`).value
                                        )}
                                    >
                                        <FontAwesomeIcon icon={faCheck} />
                                    </button>
                                </td>
                            </>
                        ) : (
                            
                            <>
                                <td>{tache.titre}</td>
                                <td>{tache.prio}</td>
                                <td><FontAwesomeIcon icon={faClock} /></td>
                                <td>{tache.dateLimite}</td>
                                <td className="btn-modif">
                                    <button className="valid"  onClick={() => validerTache(index)}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </button>
                                    <button className="modif" onClick={() => edit(index)}>
                                        <FontAwesomeIcon icon={faPencil} />
                                    </button>
                                    <button className="suppr" onClick={() => suppr(index)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;