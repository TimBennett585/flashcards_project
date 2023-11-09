import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../HomeScreen/Home";
import Deck from "../Decks/Deck";
import CreateDeck from "../Decks/CreateDeck";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/decks">
            <Redirect to="/" />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId">
            {/* <Deck /> will handle child routes */}
            <Deck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
