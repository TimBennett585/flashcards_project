import React from "react";
import { Link } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function DeckView({ deck, loadDecks }) {
  if (deck) {
    function handleDelete() {
      const abortController = new AbortController();
      const result = window.confirm("Delete this deck");
      if (result) {
        deleteDeck(deck.id, abortController.signal).then(loadDecks);
      }
    }

    return (
      <>
        <div className="container card-list">
          <li className="home">
            <div className="row justify-content-between">
              <h3>{deck.name}</h3>
              <p>{deck.cards.length} cards</p>
            </div>
            <div className="row">
              <p>{deck.description}</p>
            </div>
            <div className="row justify-content-between">
              <div>
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
                  View
                </Link>
                <Link
                  to={`/decks/${deck.id}/study`}
                  className="btn btn-primary mx-1"
                >
                  Study
                </Link>
              </div>
              <div>
                <button onClick={handleDelete}>Delete Deck</button>
              </div>
            </div>
          </li>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }
}

export default DeckView;
