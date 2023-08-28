import { useState } from "react";
import { useDispatch } from "react-redux";
import { createDecoration } from "../features/decorations/decorationSlice";

function DecorationForm() {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createDecoration({ text }));
    setText("");
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Decoration</label>
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
            Add Decoration
          </button>
        </div>
      </form>
    </section>
  );
}

export default DecorationForm;
