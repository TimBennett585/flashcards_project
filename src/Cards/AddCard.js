import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard } from "../utils/api";
import CardForm from "./CardForm";

function AddCard({ deck, loadDeck }) {
  const { deckId } = useParams();
  const createNewCard = {
    front: "",
    back: "",
  };
  const [newCard, setNewCard] = useState({ ...createNewCard });

  const handleChange = ({ target }) => {
    setNewCard({
      ...newCard,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    createCard(deck.id, newCard, abortController.signal)
      .then(setNewCard({ ...createNewCard }))
      .then(loadDeck);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <nav aria-label="breadCrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item current" aria-current="page">
                  Add Card
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h1>{deck.name}: Add Card</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <CardForm 
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              newCard={newCard}
              deckId={deckId}
              setNewCard={setNewCard}
              isEdit={false}
              />
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCard;
