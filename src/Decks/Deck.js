import React, { useEffect, useState } from "react";
import {
  Route,
  Link,
  Switch,
  useRouteMatch,
  useHistory,
  Redirect,
  useParams,
} from "react-router-dom";
import { readDeck } from "../utils/api";
import Study from "../Study/Study";
import DeckPreview from "./DeckPreview";

/* This component controls the state of deck, and makes the API calls */

// useHistory to get the value for deckId
// useState for deck
// useEffect and fetch for readDeck by id

function Deck() {
  const { path } = useRouteMatch();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });
  const abortController = new AbortController();

  function loadDeck() {
    readDeck(deckId, abortController.signal).then(setDeck);
  }

  useEffect(() => {
    loadDeck();

    return () => abortController.abort();
  }, []);

  return (
    <div>
      <Switch>
        {/* Deck information here (header and description) */
        /* Buttons: Edit, Study, Add Cards, and Trash/Delete */}
        <DeckPreview deck={deck} />
        {/* Cards Header */
        /* .map on deck cards showing the following info
      Front and Back text
  Buttons: Edit and Delete */}
        <Route to="/decks/:deckId/study">
          <Study deck={deck} />
        </Route>
        {/* </CardList> (contains the .map) */
        /* </EditCards> */
        /* </AddCards> */}
      </Switch>
    </div>
  );
}

export default Deck;
