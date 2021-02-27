import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { updateDeck } from "../utils/api";
import EditForm from "./EditForm";


function EditDeck({ data = null }) {
    const { deckId } = useParams();
    const history = useHistory();

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

    if (data === null) {
      return <strong>Loading...</strong>;
    }

  return <EditForm type="Deck" data={data} event={handleDeckUpdate} />;
}

export default EditDeck;