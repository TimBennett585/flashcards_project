import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readCard, updateCard } from "../utils/api";

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
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCard;
