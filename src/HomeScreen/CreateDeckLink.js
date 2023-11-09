import React from "react";
import { Link } from "react-router-dom";

function CreateDeckLink() {
  return (
    <>
      <Link className="btn btn-secondary my-2" to="/decks/new">
        &#43; Create Deck
      </Link>
    </>
  );
}

export default CreateDeckLink;
