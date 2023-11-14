import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readCard, updateCard } from "../utils/api";
import CardForm from "./CardForm";

function EditCard({ deck, loadDeck }) {
  const { cardId } = useParams();
  const history = useHistory();
  const updatedCard = {
    front: "",
    back: "",
  };

  const [newCard, setNewCard] = useState({ ...updatedCard });

  const handleChange = ({ target }) => {
    setNewCard({
      ...newCard,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateCard(newCard)
      .then(loadDeck)
      .then(history.push(`/decks/${deck.id}`));
  };

  useEffect(() => {
    readCard(cardId).then(setNewCard);
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <nav aria-label="breadCrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Edit Card {cardId}
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h1>Edit Card</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <CardForm
            cardId={cardId}
            deckId={deck.id}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            newCard={newCard}
            isEdit={true}
          />
        </div>
      </div>
    </div>
  );
}

export default EditCard;
