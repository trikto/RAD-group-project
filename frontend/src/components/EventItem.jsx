import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  getEvents,
  updateEvent,
  deleteEvent,
} from "../features/events/eventSlice";

function EventItem({ event }) {
  const dispatch = useDispatch();
  const [update, setUpdate] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const updateData = {
      id: event._id,
      eventData: { text: update },
    };

    dispatch(updateEvent(updateData)).then(() => {
      dispatch(getEvents());
    });

    setUpdate("");
  };

  return (
    <div className="event">
      <div>{new Date(event.createdAt).toLocaleString("en-US")}</div>
      <h2>{event.text}</h2>
      <button
        onClick={() => dispatch(deleteEvent(event._id))}
        className="close"
      >
        X
      </button>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="updateEvent"
            id="updateEvent"
            value={update}
            onChange={(e) => setUpdate(e.target.value)}
          />
          <button className="btn btn-block" type="submit">
            Update Event
          </button>
        </div>
      </form>
    </div>
  );
}

export default EventItem;
