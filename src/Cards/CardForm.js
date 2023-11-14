import React from "react";
import { Link } from "react-router-dom";

function CardForm({ handleSubmit, handleChange, newCard, deckId, isEdit }) {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">
            Front
            <textarea
              id="front"
              name="front"
              required
              placeholder="Front side of card"
              onChange={handleChange}
              value={newCard.front}
              className="form-control"
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="back">
            Back
            <textarea
              id="back"
              name="back"
              required
              placeholder="Back Side of Card"
              onChange={handleChange}
              value={newCard.back}
              className="form-control"
            />
          </label>
        </div>

        <Link to={`/decks/${deckId}`} className="btn btn-secondary mx-1">
          {isEdit ? (<>Cancel</>) : (<>Done</>)}
        </Link>

        <button type="submit" className="btn btn-primary">
          {isEdit ? (<>Submit</>) : (<>Save</>)}
        </button>
      </form>
    </>
  );
}

export default CardForm;
