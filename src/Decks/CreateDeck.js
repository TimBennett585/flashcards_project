import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck() {
  const history = useHistory();
  const createNewDeck = {
    name: "",
    description: "",
  };
  const [newDeck, setNewDeck] = useState({ ...createNewDeck });

  const handleChange = ({ target }) => {
    setNewDeck({
      ...newDeck,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    createDeck(newDeck, abortController.signal).then((response) => {
      history.push(`/decks/${response.id}`);
    });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Create Deck
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h1>Create Deck</h1>
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
                    placeholder="Deck Name"
                    value={newDeck.name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="description">
                  Description
                  <textarea
                    id="description"
                    name="description"
                    required
                    placeholder="Brief description of the deck"
                    value={newDeck.description}
                    onChange={handleChange}
                    className="form-control"
                  />
                </label>
              </div>
              <Link to="/" className="btn btn-secondary mx-1">
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateDeck;
