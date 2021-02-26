import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

function Study({ deckName, cards }) {

  const { deckId } = useParams();
  const history = useHistory();

  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    function validateCardData() {
      if (cards.length < 3) {
        setCardData({
          validDeck: false
        });
      } else {
        setCardData({
          validDeck: true,
          isFlipped: false,
          front: cards[0].front,
          back: cards[0].back,
          progress: 0
        });
      }
    }
    validateCardData();
  }, [cards]);

  const handleNextCard = () => {
    if (cards.length === cardData.progress) {
      if (window.confirm("Do you want to restart this deck?")) {
        setCardData({
          validDeck: true,
          isFlipped: false,
          front: cards[0].front,
          back: cards[0].back,
          progress: 0
        });
      } else {
        history.push("/");
      }
    } else {
      const nextCard = cards.find((ignore, index) => index === cardData.progress)
      setCardData({
        ...cardData,
        isFlipped: false,
        front: nextCard.front,
        back: nextCard.back,
        progress: cardData.progress + 1
      });
    }
  }

  const flipCurrentCard = () => {
    setCardData({
      ...cardData,
      isFlipped: !cardData.isFlipped
    });
  }

  if (cardData === null) {
    return <strong>Loading...</strong>
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/"><span className="oi oi-home"></span> Home</a></li>
            <li className="breadcrumb-item"><a href={`/decks/${deckId}`}>{deckName}</a></li>
            <li className="breadcrumb-item text-secondary">Study</li>
        </ol>
      </nav>
      <h2>Study: {deckName}</h2>
      {!cardData.validDeck ? (
        <>
          <div className="alert alert-danger" role="alert">
            <h3 className="alert-heading">Not enough cards...</h3>
            There needs to be at least 3 cards in a deck in order to study. There are {cardData.length} cards in this deck.
          </div>
          <button className="btn btn-primary"><span className="oi oi-plus"></span> Add Cards</button>
        </>
      ) : (
        <div className="card mb-2">
          <span className="p-3 mb-2 bg-dark text-white font-weight-bold">Card {cardData.progress + 1} of {cards.length}</span>
          {!cardData.isFlipped ? (
            <div className="card-body text-center">
              <h4 className="mt-4 mb-5 display-5">{cardData.front}</h4>
              <button className="btn btn-secondary mr-1" onClick={flipCurrentCard}>Flip</button>
            </div>
          ) : (
            <div className="card-body text-center">
              <h4 className="mt-4 mb-5 display-5">{cardData.back}</h4>
              <button className="btn btn-secondary mr-1" onClick={flipCurrentCard}>Flip</button>
              <button className="btn btn-primary" onClick={handleNextCard}>Next</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Study;