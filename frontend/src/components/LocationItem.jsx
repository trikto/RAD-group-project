import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  getLocations,
  updateLocation,
  deleteLocation,
} from "../features/locations/locationSlice";

function LocationItem({ location }) {
  const dispatch = useDispatch();
  const [update, setUpdate] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const updateData = {
      id: location._id,
      locationData: { text: update },
    };

    dispatch(updateLocation(updateData)).then(() => {
      dispatch(getLocations());
    });

    setUpdate("");
  };

  return (
    <div className="location">
      <div>{new Date(location.createdAt).toLocaleString("en-US")}</div>
      <h2>{location.text}</h2>
      <button
        onClick={() => dispatch(deleteLocation(location._id))}
        className="close"
      >
        X
      </button>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="updateLocation"
            id="updateLocation"
            value={update}
            onChange={(e) => setUpdate(e.target.value)}
          />
          <button className="btn btn-block" type="submit">
            Update Location
          </button>
        </div>
      </form>
    </div>
  );
}

export default LocationItem;
