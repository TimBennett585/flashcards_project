import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard } from "../utils/api";

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
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="front">
                        Front
                        <textarea
                            id="front"
                            name="front"
                            required
                            placeholder="Front side of card"
                            onChange={handleChange}
                            value={newCard.front}
                            className="form-control"
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="back">
                        Front
                        <textarea
                            id="back"
                            name="back"
                            required
                            placeholder="Back side of card"
                            onChange={handleChange}
                            value={newCard.back}
                            className="form-control"
                        />
                    </label>
                </div>
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary mx-1">
                    Done
                </Link>
                <button type="submit" className="btn btn-primary">
                    Save
                </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCard;
