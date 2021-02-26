import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import DeckList from "../Components/DeckList";
import Deck from "../Components/Deck";
import CreateDeck from "../Components/CreateDeck";
import NotFound from "../Layout/NotFound";

function Layout() {
  return (
    <>
      <Header />
      <main className="container">
        <Switch>
          <Route exact={true} path={`/`}>
            <DeckList />
          </Route>
          <Route path={"/decks/new"}>
            <CreateDeck />
          </Route>
          <Route path={"/decks/:deckId"}>
            <Deck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default Layout;
