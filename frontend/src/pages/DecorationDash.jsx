import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DecorationForm from "../components/DecorationForm";
import DecorationItem from "../components/DecorationItem";
import Spinner from "../components/Spinner";
import { getDecorations, reset } from "../features/decorations/decorationSlice";

function DecorationDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { decorations, isLoading, isError, message } = useSelector(
    (state) => state.decorations
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getDecorations());

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
        <p>Decorations Dashboard</p>
      </section>

      <DecorationForm />

      <section className="content">
        {decorations.length > 0 ? (
          <div className="decorations">
            {decorations.map((decoration) => (
              <DecorationItem key={decoration._id} decoration={decoration} />
            ))}
          </div>
        ) : (
          <h3>You have not added any decorations</h3>
        )}
      </section>
    </>
  );
}

export default DecorationDashboard;
