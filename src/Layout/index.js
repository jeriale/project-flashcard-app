import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import Header from "./Header";
import DeckList from "../Components/DeckList";
import Deck from "../Components/Deck";
import CreateForm from "../Components/CreateForm";
import NotFound from "../Layout/NotFound";

function Layout() {
  const history = useHistory();

  const handleDeckCreate = (formData) => {
    const created = {
        name: formData.name,
        description: formData.description
    }
    createDeck(created);
    history.push("/");
    window.location.reload(true);
  }

  return (
    <>
      <Header />
      <main className="container">
        <Switch>
          <Route exact={true} path={`/`}>
            <DeckList />
          </Route>
          <Route path={"/decks/new"}>
            <CreateForm type="Deck" event={handleDeckCreate} />
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
