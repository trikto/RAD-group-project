import { useState } from "react";
import { useDispatch } from "react-redux";
import { createInvite } from "../features/invites/inviteSlice";

function InviteForm() {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createInvite({ text }));
    setText("");
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Invite</label>
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
            Add Invite
          </button>
        </div>
      </form>
    </section>
  );
}

export default InviteForm;
