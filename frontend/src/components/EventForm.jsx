import { useState } from "react";
import { useDispatch } from "react-redux";
import { createEvent } from "../features/events/eventSlice";

function EventForm() {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createEvent({ text }));
    setText("");
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Event</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Event
          </button>
        </div>
      </form>
    </section>
  );
}

export default EventForm;
