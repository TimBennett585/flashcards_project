import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck({ deck, loadDeck }) {
  const { deckId } = useParams();
  const history = useHistory();
  const updatedDeck = {
    name: "",
    description: "",
  };

  const [newDeck, setNewDeck] = useState({ ...updatedDeck });

  const handleChange = ({ target }) => {
    setNewDeck({
      ...newDeck,
      [target.name]: target.value,
      id: deckId,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateDeck(newDeck)
      .then(loadDeck)
      .then(history.push(`/decks/${deckId}`));
  };

  useEffect(() => {
    readDeck(deckId).then(setNewDeck);
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
                <Link to={`/decks/${deckId}`}>{deck.name}</Link>
              </li>
              <li className="breadcrumb-item current" aria-current="page">
                Edit Deck
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h1>Edit Deck</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  onChange={handleChange}
                  value={newDeck.name}
                  className="form-control"
                />
              </label>
            </div>
            <label htmlFor="description">
              Description
              <textarea
                id="description"
                name="description"
                required
                onChange={handleChange}
                value={newDeck.description}
                className="form-control"
              />
            </label>
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

export default EditDeck;
