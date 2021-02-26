import React from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck() {
    const history = useHistory();

    const handleDeckCreate = () => {
        const formData = new FormData(document.querySelector("form"));
        const created = {
            name: formData.get("name"),
            description: formData.get("description")
        }
        createDeck(created);
        history.push("/")
        window.location.reload(true);
    }

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/"><span className="oi oi-home"></span> Home</a></li>
                    <li className="breadcrumb-item text-secondary">Create Deck</li>
                </ol>
            </nav>
            <h2>Create Deck</h2>
            <form onSubmit={handleDeckCreate}>
                <div className="form-group">
                    <label htmlFor="deck-name">Name</label>
                    <input type="text" className="form-control" id="deck-name" name="name" placeholder="Deck name" />
                </div>
                <div className="form-group">
                    <label htmlFor="deck-description">Description</label>
                    <textarea className="form-control" id="deck-description" name="description" placeholder="Brief description of the deck" />
                </div>
                <a href="/" className="btn btn-secondary mr-1">Cancel</a>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
}

export default CreateDeck;