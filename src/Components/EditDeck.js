import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import EditForm from "./EditForm";


function EditDeck() {
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});

    useEffect(() => {
        async function getDeck() {
          try {
            const response = await readDeck(deckId);
            setDeck(response);
          } catch (error) {
            console.log(error);
          }
        }
        getDeck();
      }, [deckId]);

      const handleDeckUpdate = (formData) => {
        const update = {
            name: formData.name,
            description: formData.description,
            id: deckId
        }
        updateDeck(update);
        history.push(`/decks/${deckId}`);
        window.location.reload(true);
      }

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/"><span className="oi oi-home"></span> Home</a></li>
                    <li className="breadcrumb-item"><a href={`/decks/${deckId}`}>{deck.name}</a></li>
                    <li className="breadcrumb-item text-secondary">Edit Deck</li>
                </ol>
            </nav>
            <h2>Edit Deck</h2>
            <EditForm data={deck} event={handleDeckUpdate} />
        </>
    );
}

export default EditDeck;