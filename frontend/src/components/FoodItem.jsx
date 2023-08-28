import { useDispatch } from "react-redux";
import { useState } from "react";
import { getFoods, updateFood, deleteFood } from "../features/foods/foodSlice";

function FoodItem({ food }) {
  const dispatch = useDispatch();
  const [update, setUpdate] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const updateData = {
      id: food._id,
      foodData: { text: update },
    };

    dispatch(updateFood(updateData)).then(() => {
      dispatch(getFoods());
    });

    setUpdate("");
  };

  return (
    <div className="food">
      <div>{new Date(food.createdAt).toLocaleString("en-US")}</div>
      <h2>{food.text}</h2>
      <button onClick={() => dispatch(deleteFood(food._id))} className="close">
        X
      </button>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="updateFood"
            id="updateFood"
            value={update}
            onChange={(e) => setUpdate(e.target.value)}
          />
          <button className="btn btn-block" type="submit">
            Update Food
          </button>
        </div>
      </form>
    </div>
  );
}

export default FoodItem;
