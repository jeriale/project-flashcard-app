import React from "react";
import CardListItem from "../Components/CardListItem";

function CardList({ cards = null }) {
    
    if (cards == null) {
        return <strong>Loading...</strong>
    }

    return (
        <div className="list-group">
            <div className="card mb-2">
                {cards.map((card) => <CardListItem key={card.id} card={card} />)}
            </div>
        </div>
    );
}

export default CardList;