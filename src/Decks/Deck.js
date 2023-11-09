import React, { useEffect, useState } from "react";
import {
  Route,
  Switch,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { readDeck } from "../utils/api";
import Study from "../Study/Study";
import DeckPreview from "./DeckPreview";
import AddCard from "../Cards/AddCard";
import EditCard from "../Cards/EditCard";
import EditDeck from "./EditDeck";
import NotFound from "../Layout/NotFound";

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
        <Route path={`/decks/${deck.id}/study`}>
          <Study deck={deck} />
        </Route>
        <Route path={`${path}/cards/new`}>
          <AddCard deck={deck} loadDeck={loadDeck} />
        </Route>
        <Route path={`${path}/cards/:cardId/edit`}>
          <EditCard deck={deck} loadDeck={loadDeck} />
        </Route>
        <Route path={`${path}/edit`}>
          <EditDeck deck={deck} loadDeck={loadDeck} />
        </Route>
        <DeckPreview deck={deck} />
        <Route path="/notFound" >
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default Deck;
