import React from "react";
import { useParams } from "react-router-dom";
import { createCard } from "../utils/api";
import CreateForm from "./CreateForm";

function CreateCard({ name }) {
    const { deckId } = useParams();

    const handleCardCreate = () => {
        const formData = new FormData(document.querySelector("form"));
        const created = {
            front: formData.get("front"),
            back: formData.get("back")
        }
        createCard(deckId, created);
        window.location.reload(true);
    }

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/"><span className="oi oi-home"></span> Home</a></li>
                    <li className="breadcrumb-item"><a href={`/decks/${deckId}`}>{name}</a></li>
                    <li className="breadcrumb-item text-secondary">Add Card</li>
                </ol>
            </nav>
            <h2>{name}: Add Card</h2>
            <CreateForm type="card" event={handleCardCreate} />
        </>
    );
}

export default CreateCard;