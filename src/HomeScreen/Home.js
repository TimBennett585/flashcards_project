import React from "react";
import CreateDeckLink from "./CreateDeckLink";
import DeckList from "./DeckList";

function Home() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <CreateDeckLink />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <DeckList />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
