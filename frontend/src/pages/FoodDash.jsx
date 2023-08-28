import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FoodForm from "../components/FoodForm";
import FoodItem from "../components/FoodItem";
import Spinner from "../components/Spinner";
import { getFoods, reset } from "../features/foods/foodSlice";

function FoodDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { foods, isLoading, isError, message } = useSelector(
    (state) => state.foods
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getFoods());

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
        <p>Foods Dashboard</p>
      </section>

      <FoodForm />

      <section className="content">
        {foods.length > 0 ? (
          <div className="foods">
            {foods.map((food) => (
              <FoodItem key={food._id} food={food} />
            ))}
          </div>
        ) : (
          <h3>You have not added any foods</h3>
        )}
      </section>
    </>
  );
}

export default FoodDashboard;
