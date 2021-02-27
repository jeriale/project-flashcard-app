import React, { useEffect, useState } from "react";
import { Switch, Route, useParams, useRouteMatch } from "react-router-dom";
import CardList from "../Components/CardList";
import Study from "../Components/Study";
import EditDeck from "../Components/EditDeck";
import CreateForm from "../Components/CreateForm";
import EditCard from "../Components/EditCard";
import { readDeck, deleteDeck, createCard } from "../utils/api";

function Deck() {
  const { deckId } = useParams();
  const { url } = useRouteMatch();

  const [deck, setDeck] = useState(null);

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

  const handleDeleteDeck = () => {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      deleteDeck(deckId);
      window.location.reload(true);
    } 
  }

  const handleCardCreate = (formData) => {
    const created = {
        front: formData.front,
        back: formData.back
    }
    createCard(deckId, created);
    window.location.reload(true);
  }

  if (deck == null) {
    return <strong>Loading...</strong>
  }

  return (
    <Switch>
      <Route exact={true} path={`${url}`}>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/"><span className="oi oi-home"></span> Home</a></li>
            <li className="breadcrumb-item"><a href={`/decks/${deckId}`}>{deck.name}</a></li>
          </ol>
        </nav>
        <div className="card mb-4">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h2>{deck.name}</h2>
                </div>
                <p>{deck.description}</p>
                <a href={`/decks/${deckId}/study`} className="btn btn-primary mr-1"><span className="oi oi-book"></span> Study <span className="badge badge-light">{deck.cards.length}</span></a>
                <a href={`/decks/${deckId}/edit`} className="btn btn-secondary mr-1"><span className="oi oi-cog"></span> Edit</a>
                <a href={`/decks/${deckId}/cards/new`} className="btn btn-secondary"><span className="oi oi-plus"></span> Add Cards</a>
                <button type="delete" className="btn btn-danger float-right" onClick={handleDeleteDeck}><span className="oi oi-trash"></span></button>
            </div>
        </div>
        <h3>Cards</h3>
        <CardList cards={deck.cards} />
      </Route>
      <Route path={`/decks/:deckId/study`}>
        <Study deckName={deck.name} cards={deck.cards} />
      </Route>
      <Route path={`/decks/:deckId/edit`}>
        <EditDeck name={deck.name} data={deck} />
      </Route>
      <Route path={`/decks/:deckId/cards/new`}>
        <CreateForm type="Card" name={deck.name} event={handleCardCreate} />
      </Route>
      <Route path={`/decks/:deckId/cards/:cardId/edit`}>
        <EditCard name={deck.name} />
      </Route>
    </Switch>
  );
}

export default Deck;