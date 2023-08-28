import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  getInvites,
  updateInvite,
  deleteInvite,
} from "../features/invites/inviteSlice";

function InviteItem({ invite }) {
  const dispatch = useDispatch();
  const [update, setUpdate] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const updateData = {
      id: invite._id,
      inviteData: { text: update },
    };

    dispatch(updateInvite(updateData)).then(() => {
      dispatch(getInvites());
    });

    setUpdate("");
  };

  return (
    <div className="invite">
      <div>{new Date(invite.createdAt).toLocaleString("en-US")}</div>
      <h2>{invite.text}</h2>
      <button
        onClick={() => dispatch(deleteInvite(invite._id))}
        className="close"
      >
        X
      </button>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="updateInvite"
            id="updateInvite"
            value={update}
            onChange={(e) => setUpdate(e.target.value)}
          />
          <button className="btn btn-block" type="submit">
            Update Invite
          </button>
        </div>
      </form>
    </div>
  );
}

export default InviteItem;
