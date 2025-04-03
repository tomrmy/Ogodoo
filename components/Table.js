import '../styles/Table.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPencil} from '@fortawesome/free-solid-svg-icons'


function Table({ taches, suppr, edit, saveTaches, editIndex, validerTache}) {

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
                                        <option value="Facultatif">Facultatif</option>
                                        <option value="Standard">Standart</option>
                                        <option value="Prioritaire">Prioritaire</option>
                                        <option value="Critique">Critique</option>
                                    </select>
                                </td>
                                <td className='statut'>
                                       En cours
                                </td>
                                <td className='btn-modif'>
                                    <button 
                                        className="save-btn" 
                                        onClick={() => saveTaches(
                                                index,
                                            document.getElementById(`titre-${index}`).value,
                                            document.getElementById(`prio-${index}`).value
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
                                <td>En cours</td>
                                <td className="btn-modif">
                                    <button className="valid">
                                        <FontAwesomeIcon icon={faCheck} onClick={() => validerTache(index)}/>
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