import React from "react";
import { useParams } from "react-router-dom";
import { createCard } from "../utils/api";

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
            <form onSubmit={handleCardCreate}>
                <div className="form-group">
                    <label htmlFor="card-front">Question</label>
                    <textarea className="form-control" id="card-front" name="front" placeholder="Question" />
                </div>
                <div className="form-group">
                    <label htmlFor="card-back">Answer</label>
                    <textarea className="form-control" id="card-back" name="back" placeholder="Answer" />
                </div>
                <a href="/" className="btn btn-secondary mr-1">Cancel</a>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
}

export default CreateCard;