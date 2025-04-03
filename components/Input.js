import { useState, useEffect } from 'react';
import '../styles/Input.css';  
import Table from './Table'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import BoiteDeDialogue from './BoiteDeDialogue';
import TacheFini from './TacheFini';

function Input() {
    const [showInput, setShowInput] = useState(false);
    const [titre, setTitre] = useState("");
    const [prio, setPrio] = useState(""); 
    const [taches, setTaches] = useState([]);  
    const [editIndex, setEditIndex] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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

        setIsLoading(true);

        setTimeout(() => {
            const nouvelleTache = {titre, prio };
            setTaches(prevTaches => {
                const updatedTaches = [...prevTaches, nouvelleTache];
                localStorage.setItem("taches", JSON.stringify(updatedTaches));
                return updatedTaches;
            });
            setTimeout(() => {
                setTitre("");
                setPrio(""); 
                setShowInput(false);
                setIsLoading(false);
            }, 200);
        }, 200); 
    }

    function suppr(index) {
        setDeleteIndex(index);
        setShowDialog(true);
    }

    function handleConfirmDelete() {
        setTaches(prevTaches => {
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

    function saveTaches(index, newTitre, newPrio) {
        if (index < 0 || index >= taches.length) {
            console.error("Index de tâche invalide :", index);
            return;
        }
        setTaches(prevTaches => {
            const updatedTaches = [...prevTaches];
            updatedTaches[index] = { titre: newTitre, prio: newPrio,};
            localStorage.setItem("taches", JSON.stringify(updatedTaches));
            return updatedTaches;
        });
        setEditIndex(null);
    }
    
    function validerTache(index) {
        setTachesFinies((prevTachesFinies) => [...prevTachesFinies, taches[index]]);
        setTaches((prevTaches) => {
            const updatedTaches = prevTaches.filter((_, i) => i !== index);
            localStorage.removeItem("taches", JSON.stringify(updatedTaches));
            return updatedTaches;
        });
    }

    return (
        <div className='container'>
            <div className='add-task'>
                <h1>Vous avez {taches.length} tâche{taches.length > 1 ? "s" : ""} à faire</h1>
                <button className='add-btn' onClick={toggleInputVisibility}>
                    {showInput ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faPlus} />}
                </button>
            </div>
            
            {showInput && (
                <div className="input-container">
                    <div className="input-group">
                        <label>Titre de la tâche</label>
                            <input type="text" placeholder="Ex : Faire les courses" value={titre} onChange={(e) => setTitre(e.target.value)} />
                    </div>

                    <div className="input-group">
                        <label>Priorité</label>
                            <select value={prio} onChange={(e) => setPrio(e.target.value)}>
                                <option value="">Sélectionnez une priorité</option>
                                <option value="Facultatif">Facultatif</option>
                                <option value="Standard">Standart</option>
                                <option value="Prioritaire">Prioritaire</option>
                                <option value="Critique">Critique</option>
                            </select>
                    </div>

                    <button className="btn-submit" onClick={addTaches}>
                        {isLoading ? (
                            <span className="loading-spinner"></span>
                        ) : (
                            <FontAwesomeIcon icon={faCheck} />
                        )}
                    </button>
                </div>
            )}

            <BoiteDeDialogue show={showDialog} onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
            
            <div className='table'>
                {taches.length > 0 && (
                    <Table taches={taches} suppr={suppr} edit={edit} saveTaches={saveTaches} editIndex={editIndex} validerTache={validerTache}/>
                )}
            </div>
            <div className='table-fini'>
                <TacheFini tachesFinies={tachesFinies} />
            </div>
        </div>
    );
}

export default Input;
