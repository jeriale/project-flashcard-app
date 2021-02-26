import React from "react";
import { deleteDeck } from "../utils/api"

function DeckListItem({ deck = {} }) {

  const handleDeleteDeck = () => {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      deleteDeck(deck.id);
      window.location.reload(true);
    } 
  }

  return (
    <div className="list-group-item list-group-item-action flex-column align-items-start">
      <div className="d-flex w-100 justify-content-between">
        <h2 className="mb-1">{deck.name}</h2>
      </div>
      <p className="mb-1">{deck.description}</p>
      <a href={`/decks/${deck.id}`} className="btn btn-secondary mr-1"><span className="oi oi-eye"></span> View</a>
      <a href={`/decks/${deck.id}/study`} className="btn btn-primary"><span className="oi oi-book"></span> Study <span className="badge badge-light">{deck.cards.length} cards</span></a>
      <button type="delete" className="btn btn-danger float-right" onClick={handleDeleteDeck}><span className="oi oi-trash"></span></button>
    </div>
  );
}

export default DeckListItem;