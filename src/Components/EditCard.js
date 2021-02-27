import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateCard, readCard } from "../utils/api";
import EditForm from "./EditForm";

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

    const handleCardUpdate = (formData) => {
        const updated = {
            front: formData.front,
            back: formData.back,
            id: cardId,
            deckId: parseInt(deckId)
        }
        updateCard(updated);
        history.push(`/decks/${deckId}`)
        window.location.reload(true);
    }

    if (card === null) {
        return <strong>Loading...</strong>;
    }

    return <EditForm data={card} name={name} event={handleCardUpdate} />;
}

export default EditCard;