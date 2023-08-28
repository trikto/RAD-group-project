import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import locationService from "./locationService";

const initialState = {
  locations: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new location
export const createLocation = createAsyncThunk(
  "locations/create",
  async (locationData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await locationService.createLocation(locationData, token);
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

// Update location
export const updateLocation = createAsyncThunk(
  "locations/update",
  async ({ id, locationData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await locationService.updateLocation(id, locationData, token);
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

// Get user locations
export const getLocations = createAsyncThunk(
  "locations/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await locationService.getLocations(token);
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

// Delete user location
export const deleteLocation = createAsyncThunk(
  "locations/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await locationService.deleteLocation(id, token);
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

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.locations.push(action.payload);
      })
      .addCase(createLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // const { id, text } = action.payload;
        // const updatedLocations = state.locations.map((location) => {
        //   if (location._id === id) {
        //     return { ...location, text };
        //   } else {
        //     return location;
        //   }
        // });
        // console.log(updatedLocations);
        // state.locations = updatedLocations;
      })
      .addCase(updateLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getLocations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLocations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.locations = action.payload;
      })
      .addCase(getLocations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.locations = state.locations.filter(
          (location) => location._id !== action.payload.id
        );
      })
      .addCase(deleteLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = locationSlice.actions;
export default locationSlice.reducer;
