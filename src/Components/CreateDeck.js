import React from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import CreateForm from "./CreateForm";

function CreateDeck() {
    const history = useHistory();

    const handleDeckCreate = (formData) => {
        const created = {
            name: formData.name,
            description: formData.description
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
            <CreateForm type="deck" event={handleDeckCreate} />
        </>
    );
}

export default CreateDeck;