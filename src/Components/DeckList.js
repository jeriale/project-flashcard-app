import React, { useEffect, useState } from "react";
import DeckListItem from "../Components/DeckListItem";
import { listDecks } from "../utils/api";

function DeckList() {
  const [decks, setDecks] = useState(null);

  useEffect(() => {
    async function getDecks() {
      try {
        const response = await listDecks();
        setDecks(response);
      } catch (error) {
        console.log(error);
      }
    }
    getDecks();
  }, []);

  if (decks == null) {
    return <strong>Loading...</strong>
  }

  return (
    <>
      <a href={`/decks/new`} className="btn btn-secondary mb-2"><span className="oi oi-plus"></span> Create Deck</a>
      <div className="list-group">
          {decks.map((deck) => <DeckListItem key={deck.id} deck={deck} />)}
      </div>
    </>
  );
}

export default DeckList;