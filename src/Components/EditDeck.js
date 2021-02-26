import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";


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

      const handleDeckUpdate = () => {
        const formData = new FormData(document.querySelector("form"));
        const update = {
            name: formData.get("name"),
            description: formData.get("description"),
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
            <form onSubmit={handleDeckUpdate}>
                <div className="form-group">
                    <label htmlFor="deckName">Name</label>
                    <textarea className="form-control" id="deckName" name="name" defaultValue={deck.name} />
                </div>
                <div className="form-group">
                    <label htmlFor="deckDescription">Description</label>
                    <textarea className="form-control" id="deckDescription" name="description" defaultValue={deck.description} />
                </div>
                <a href={`/decks/${deckId}`} className="btn btn-secondary mr-1">Cancel</a>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
}

export default EditDeck;