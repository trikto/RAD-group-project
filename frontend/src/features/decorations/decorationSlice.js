import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import decorationService from "./decorationService";

const initialState = {
  decorations: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new decoration
export const createDecoration = createAsyncThunk(
  "decorations/create",
  async (decorationData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await decorationService.createDecoration(decorationData, token);
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

// Update decoration
export const updateDecoration = createAsyncThunk(
  "decorations/update",
  async ({ id, decorationData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await decorationService.updateDecoration(
        id,
        decorationData,
        token
      );
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

// Get user decorations
export const getDecorations = createAsyncThunk(
  "decorations/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await decorationService.getDecorations(token);
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

// Delete user decoration
export const deleteDecoration = createAsyncThunk(
  "decorations/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(id);
      return await decorationService.deleteDecoration(id, token);
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

export const decorationSlice = createSlice({
  name: "decoration",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDecoration.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDecoration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.decorations.push(action.payload);
      })
      .addCase(createDecoration.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateDecoration.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDecoration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // const { id, text } = action.payload;
        // const updatedDecorations = state.decorations.map((decoration) => {
        //   if (decoration._id === id) {
        //     return { ...decoration, text };
        //   } else {
        //     return decoration;
        //   }
        // });
        // console.log(updatedDecorations);
        // state.decorations = updatedDecorations;
      })
      .addCase(updateDecoration.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDecorations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDecorations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.decorations = action.payload;
      })
      .addCase(getDecorations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteDecoration.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDecoration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.decorations = state.decorations.filter(
          (decoration) => decoration._id !== action.payload.id
        );
      })
      .addCase(deleteDecoration.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = decorationSlice.actions;
export default decorationSlice.reducer;
