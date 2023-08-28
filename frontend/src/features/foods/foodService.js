import axios from "axios";

const API_URL = "/api/events/foods/";

// Create new food
const createFood = async (foodData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, foodData, config);

  return response.data;
};

// Update food
const updateFood = async (foodId, foodData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + foodId, foodData, config);
  return response.data;
};

// Get user foods
const getFoods = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete user food
const deleteFood = async (foodId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + foodId, config);

  return response.data;
};

const foodService = {
  createFood,
  getFoods,
  deleteFood,
  updateFood,
};

export default foodService;
