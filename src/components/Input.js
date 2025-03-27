import { useState, useEffect } from 'react';
import '../styles/Input.css';  
import Table from './Table'; 
import TacheFini from './TacheFini';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import BoiteDeDialogue from './BoiteDeDialogue';

function Input() {
    const [showInput, setShowInput] = useState(false);
    const [titre, setTitre] = useState("");
    const [prio, setPrio] = useState(""); 
    const [dateLimite, setDateLimite] = useState("");
    const [taches, setTaches] = useState([]);  
    const [editIndex, setEditIndex] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [tachesFinies, setTachesFinies] = useState([]);

    useEffect(() => {
        const savedTaches = localStorage.getItem("taches");
        if (savedTaches) {
            try {
                setTaches(JSON.parse(savedTaches) || []);
            } catch (error) {
                console.error("Erreur de parsing des tâches :", error);
                setTaches([]);
            }
        }
    }, []);

    function toggleInputVisibility() {
        setShowInput(!showInput);
    }

    function addTaches() {
        if (titre.trim() === "" || prio.trim() === "") {                 
            alert("Veuillez remplir tous les champs.");
            return;
        }
        const nouvelleTache = { titre, prio, dateLimite };
        const updatedTaches = [...taches, nouvelleTache];
        setTaches(updatedTaches);
        localStorage.setItem("taches", JSON.stringify(updatedTaches));
        setTitre("");
        setPrio(""); 
        setDateLimite("");
    }

    function suppr(index) {
        setDeleteIndex(index);
        setShowDialog(true);
    }

    function handleConfirmDelete() {
        setTaches((prevTaches) => {
            const updatedTaches = prevTaches.filter((_, i) => i !== deleteIndex);
            localStorage.setItem("taches", JSON.stringify(updatedTaches));
            return updatedTaches;
        });
        setShowDialog(false);
    }

    function handleCancelDelete() {
        setShowDialog(false);
    }

    function edit(index) {
        setEditIndex(index);
    }

    function saveTaches(index, newTitre, newPrio, newDateLimite) {
        const updatedTaches = [...taches];
        updatedTaches[index] = { titre: newTitre, prio: newPrio, dateLimite: newDateLimite };
        setTaches(updatedTaches);
        localStorage.setItem("taches", JSON.stringify(updatedTaches));
        setEditIndex(null);
    }

    function validerTache(index) {
        setTachesFinies((prevTachesFinies) => [...prevTachesFinies, taches[index]]);
        setTaches((prevTaches) => {
            const updatedTaches = prevTaches.filter((_, i) => i !== index);
            localStorage.setItem("taches", JSON.stringify(updatedTaches));
            return updatedTaches;
        });
    }

    return (
        <div>
            <div className='add-task'>
                <h1>Vous avez {taches.length} tâche{taches.length > 1 ? "s" : ""} à faire</h1>
                <button className='add-btn' onClick={toggleInputVisibility}>
                    {showInput ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faPlus} />}
                </button>
            </div>
            
            {showInput && (
                <div className="input">
                    <input className="add-input" type="text" placeholder="Titre" value={titre} onChange={(e) => setTitre(e.target.value)} />
                    <select className="add-input" value={prio} onChange={(e) => setPrio(e.target.value)}>
                        <option value="">Priorité de la tâche</option>
                        <option value="Faible">Faible</option>
                        <option value="Moyen">Moyen</option>
                        <option value="Fort">Fort</option>
                        <option value="Très fort">Très fort</option>
                    </select> 
                    <input className="add-input" type='date' value={dateLimite} onChange={(e) => setDateLimite(e.target.value)} />
                    <button className="btn-submit" onClick={addTaches}>Valider</button>
                </div>
            )}

            <div>
                <BoiteDeDialogue show={showDialog} onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
            </div>

            <div className='table'>
                {Array.isArray(taches) && taches.length > 0 && (
                    <Table taches={taches} suppr={suppr} edit={edit} saveTaches={saveTaches} editIndex={editIndex} validerTache={validerTache} />
                )}
            </div>

            <div className='table-fini'>
                <h1>Tâches Terminées</h1>
                <TacheFini tachesFinies={tachesFinies} />
            </div>
        </div>
    );
}

export default Input;
