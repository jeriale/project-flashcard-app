import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateCard, readCard } from "../utils/api";

function EditCard({ name }) {
    const history = useHistory();
    const { deckId, cardId } = useParams();

    const [card, setCard] = useState(null);

    useEffect(() => {
        async function getCard() {
            try {
                const response = await readCard(cardId);
                setCard(response);
            } catch (error) {
                console.log(error);
            }
        }
        getCard();
    }, [cardId]);

    const handleCardUpdate = () => {
        const formData = new FormData(document.querySelector("form"));
        const updated = {
            front: formData.get("front"),
            back: formData.get("back"),
            id: cardId,
            deckId: deckId
        }
        updateCard(updated);
        history.push(`/decks/${deckId}`)
        window.location.reload(true);
    }

    if (card === null) {
        return <strong>Loading...</strong>
    }

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/"><span className="oi oi-home"></span> Home</a></li>
                    <li className="breadcrumb-item"><a href={`/decks/${deckId}`}>{name}</a></li>
                    <li className="breadcrumb-item text-secondary">Edit Card {cardId}</li>
                </ol>
            </nav>
            <h2>Edit Card</h2>
            <form onSubmit={handleCardUpdate}>
                <div className="form-group">
                    <label htmlFor="card-front">Question</label>
                    <textarea className="form-control" id="card-front" name="front" defaultValue={card.front} />
                </div>
                <div className="form-group">
                    <label htmlFor="card-back">Answer</label>
                    <textarea className="form-control" id="card-back" name="back" defaultValue={card.back} />
                </div>
                <a href={`/decks/${deckId}`} className="btn btn-secondary mr-1">Cancel</a>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
}

export default EditCard;