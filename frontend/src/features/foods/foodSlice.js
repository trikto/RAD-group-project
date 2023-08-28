import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import foodService from "./foodService";

const initialState = {
  foods: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new food
export const createFood = createAsyncThunk(
  "foods/create",
  async (foodData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await foodService.createFood(foodData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update food
export const updateFood = createAsyncThunk(
  "foods/update",
  async ({ id, foodData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await foodService.updateFood(id, foodData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user foods
export const getFoods = createAsyncThunk(
  "foods/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await foodService.getFoods(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user food
export const deleteFood = createAsyncThunk(
  "foods/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await foodService.deleteFood(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFood.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.foods.push(action.payload);
      })
      .addCase(createFood.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateFood.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // const { id, text } = action.payload;
        // const updatedFoods = state.foods.map((food) => {
        //   if (food._id === id) {
        //     return { ...food, text };
        //   } else {
        //     return food;
        //   }
        // });
        // console.log(updatedFoods);
        // state.foods = updatedFoods;
      })
      .addCase(updateFood.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFoods.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFoods.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.foods = action.payload;
      })
      .addCase(getFoods.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteFood.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.foods = state.foods.filter(
          (food) => food._id !== action.payload.id
        );
      })
      .addCase(deleteFood.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = foodSlice.actions;
export default foodSlice.reducer;
