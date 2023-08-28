import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LocationForm from "../components/LocationForm";
import LocationItem from "../components/LocationItem";
import Spinner from "../components/Spinner";
import { getLocations, reset } from "../features/locations/locationSlice";

function LocationDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { locations, isLoading, isError, message } = useSelector(
    (state) => state.locations
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getLocations());

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
        <p>Locations Dashboard</p>
      </section>

      <LocationForm />

      <section className="content">
        {locations.length > 0 ? (
          <div className="locations">
            {locations.map((location) => (
              <LocationItem key={location._id} location={location} />
            ))}
          </div>
        ) : (
          <h3>You have not added any locations</h3>
        )}
      </section>
    </>
  );
}

export default LocationDashboard;
