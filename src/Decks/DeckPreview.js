import React from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";
import CardList from "./CardList";

function DeckPreview({ deck, loadDeck }) {
  const { url } = useRouteMatch();
  const history = useHistory();

  function handleDeleteDeck() {
    const abortController = new AbortController();
    const result = window.confirm("Delete this deck?");
    if (result) {
      deleteDeck(deck.id, abortController.signal).then(history.push("/"));
    }
  }

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
                <li className="breadcrumb-item active">{deck.name}</li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="container-fluid m-1">
          <div className="row">
            <div className="col">
              <h2>{deck.name}</h2>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>{deck.description}</p>
            </div>
          </div>
          <div className="row justify-content-between">
            <div className="col">
              <Link to={`${url}/edit`} className="btn btn-secondary">
                Edit
              </Link>
              <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mx-1">
                Study
              </Link>
              <Link to={`${url}/cards/new`} className="btn btn-primary">
                Add Cards
              </Link>
            </div>
            <div className="col-1">
              <button
                type="delete"
                onClick={handleDeleteDeck}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col m-1">
            <h2>Cards</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <CardList deck={deck} loadDeck={loadDeck} />
          </div>
        </div>
      </div>
    </>
  );
}

export default DeckPreview;
