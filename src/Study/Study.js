import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function Study({ deck }) {
  console.log("deck: ", deck);
  let numberOfCards = deck.cards.length;
  const [count, setCount] = useState(0);
  const [front, setFront] = useState(true);
  const history = useHistory();

  function handleFlip() {
    setFront(!front);
  }

  function handleNext() {
    if (count + 1 < numberOfCards) {
      setFront(!front);
      setCount(count + 1);
    } else {
      const result = window.confirm(
        "You have reached the end of the deck. Would you like to restart?"
      );
      if (result) {
        setFront(!front);
        setCount(0);
      } else {
        history.push("/");
      }
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li class="breadcrumb-item">
                  <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Study
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h1>{deck.name}: Study</h1>
          </div>
        </div>
        {numberOfCards <= 2 ? (
          <>
            <h2>NOT ENOUGH CARDS!</h2>
            <p>{`You need at least 3 cards to study. There are ${numberOfCards} card(s) in this deck`}</p>
            <Link
              to={`/decks/${deck.id}/cards/new`}
              className="btn btn-primary"
            >
              Add Cards
            </Link>
          </>
        ) : (
          <div className="container-fluid card-flipper">
            <div className="row">
              <div className="col">
                <h3>
                  Card {count + 1} of {numberOfCards}
                </h3>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>
                  {front
                    ? `${deck.cards[count].front}`
                    : `${deck.cards[count].back}`}
                </p>
              </div>
            </div>
            <div className="col">
              <div className="col">
                {front ? (
                  <>
                    <button onClick={handleFlip} className="btn btn-secondary">
                      Flip
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={handleFlip} className="btn btn-secondary">
                      Flip
                    </button>
                    <button onClick={handleNext} className="btn btn-primary">
                      Next
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Study;
