import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SoundForm from "../components/SoundForm";
import SoundItem from "../components/SoundItem";
import Spinner from "../components/Spinner";
import { getSounds, reset } from "../features/sounds/soundSlice";

function SoundDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { sounds, isLoading, isError, message } = useSelector(
    (state) => state.sounds
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getSounds());

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
        <p>Sounds Dashboard</p>
      </section>

      <SoundForm />

      <section className="content">
        {sounds.length > 0 ? (
          <div className="sounds">
            {sounds.map((sound) => (
              <SoundItem key={sound._id} sound={sound} />
            ))}
          </div>
        ) : (
          <h3>You have not added any sounds</h3>
        )}
      </section>
    </>
  );
}

export default SoundDashboard;
