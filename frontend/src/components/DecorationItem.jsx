import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  getDecorations,
  updateDecoration,
  deleteDecoration,
} from "../features/decorations/decorationSlice";

function DecorationItem({ decoration }) {
  const dispatch = useDispatch();
  const [update, setUpdate] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const updateData = {
      id: decoration._id,
      decorationData: { text: update },
    };

    dispatch(updateDecoration(updateData)).then(() => {
      dispatch(getDecorations());
    });

    setUpdate("");
  };

  return (
    <div className="decoration">
      <div>{new Date(decoration.createdAt).toLocaleString("en-US")}</div>
      <h2>{decoration.text}</h2>
      <button
        onClick={() => dispatch(deleteDecoration(decoration._id))}
        className="close"
      >
        X
      </button>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="updateDecoration"
            id="updateDecoration"
            value={update}
            onChange={(e) => setUpdate(e.target.value)}
          />
          <button className="btn btn-block" type="submit">
            Update Decoration
          </button>
        </div>
      </form>
    </div>
  );
}

export default DecorationItem;
