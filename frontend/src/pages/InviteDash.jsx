import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import InviteForm from "../components/InviteForm";
import InviteItem from "../components/InviteItem";
import Spinner from "../components/Spinner";
import { getInvites, reset } from "../features/invites/inviteSlice";

function InviteDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { invites, isLoading, isError, message } = useSelector(
    (state) => state.invites
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getInvites());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Invites Dashboard</p>
      </section>

      <InviteForm />

      <section className="content">
        {invites.length > 0 ? (
          <div className="invites">
            {invites.map((invite) => (
              <InviteItem key={invite._id} invite={invite} />
            ))}
          </div>
        ) : (
          <h3>You have not added any invites</h3>
        )}
      </section>
    </>
  );
}

export default InviteDashboard;
