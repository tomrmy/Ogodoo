import { useState, useEffect } from 'react';
import '../styles/Input.css';  
import Table from './Table'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, } from '@fortawesome/free-solid-svg-icons'


function Input() {
    const [titre, setTitre] = useState("");
    const [prio, setprio] = useState(""); 
    const [statut, setStatut] = useState("");
    const [taches, setTaches] = useState([]);  
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const savedTaches = localStorage.getItem("taches");
        if (savedTaches) {
            setTaches(JSON.parse(savedTaches));
        }
    }, []);

    function addTaches() {
        if (titre.trim() === ""|| prio.trim() === "") {                 
            alert("Veuillez remplir tous les champs.");
            return;
        }

        const nouvelleTache = { titre, prio };

        const updatedTaches = [...taches, nouvelleTache];
        setTaches(updatedTaches);

        localStorage.setItem("taches", JSON.stringify(updatedTaches));

        setTitre("");
        setprio(""); 
    }

    function suppr(index) {
        if (window.confirm('Voulez vous vraiment supprimer ? ')){
            const updatedTaches = taches.filter((_, i) => i !== index);
            setTaches(updatedTaches);
            localStorage.setItem("taches", JSON.stringify(updatedTaches));
          }else{
            return;
          }
    }

    function edit(index) {
        setEditIndex(index);
    }

    function savetaches(index, newTitre, newPrio, newStatut) {
        const updatedTaches = [...taches];
        updatedTaches[index] = { titre: newTitre, prio: newPrio, statut: newStatut };
        setTaches(updatedTaches);
        localStorage.setItem("taches", JSON.stringify(updatedTaches));
        setEditIndex(null);
    }

    return (
        <div>
            <div className="input">
                <input className="add-input" type="text" placeholder="Titre" value={titre} onChange={(e) => setTitre(e.target.value)} />
                <select className="add-input" value={prio} onChange={(e) => setprio(e.target.value)}>
                    <option value="">Priorité de la tâche</option>
                    <option value="Faible">Faible</option>
                    <option value="Moyen">Moyen</option>
                    <option value="Fort">Fort</option>
                    <option value="Très fort">Très fort</option>
                </select> 
                    <button className="btn-submit" onClick={addTaches}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
            </div>
            <div className='table'>
                <Table taches={taches} suppr={suppr} edit={edit} savetaches={savetaches} editIndex={editIndex} />
            </div>
        </div>
    );
}

export default Input;
