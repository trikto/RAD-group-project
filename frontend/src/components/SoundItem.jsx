import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  getSounds,
  updateSound,
  deleteSound,
} from "../features/sounds/soundSlice";

function SoundItem({ sound }) {
  const dispatch = useDispatch();
  const [update, setUpdate] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const updateData = {
      id: sound._id,
      soundData: { text: update },
    };

    dispatch(updateSound(updateData)).then(() => {
      dispatch(getSounds());
    });

    setUpdate("");
  };

  return (
    <div className="sound">
      <div>{new Date(sound.createdAt).toLocaleString("en-US")}</div>
      <h2>{sound.text}</h2>
      <button
        onClick={() => dispatch(deleteSound(sound._id))}
        className="close"
      >
        X
      </button>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="updateSound"
            id="updateSound"
            value={update}
            onChange={(e) => setUpdate(e.target.value)}
          />
          <button className="btn btn-block" type="submit">
            Update Sound
          </button>
        </div>
      </form>
    </div>
  );
}

export default SoundItem;
