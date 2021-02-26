import React from "react";
import { useRouteMatch } from "react-router-dom";
import { deleteCard } from "../utils/api"

function CardListItem({ card = {} }) {
    const { url } = useRouteMatch();
  
    const handleDeleteCard = (id) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
        deleteCard(id);
        window.location.reload(true);
    }
    }

    return (
            <div className="card-body d-flex">
              <div className="col-6">
                <strong>Question</strong>
                <div className="alert alert-primary">
                  {card.front}
                </div>
              </div>
              <div className="col-6">
                <strong>Answer</strong>
                <div className="alert alert-success">
                  {card.back}
                </div>
                  <button type="delete" className="btn btn-danger float-right" onClick={() => handleDeleteCard(card.id)}><span className="oi oi-trash"></span></button>
                  <a href={`${url}/cards/${card.id}/edit`} className="btn btn-secondary mr-1 float-right">Edit</a>
              </div>
            </div>
    );
}

export default CardListItem;