import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import soundService from "./soundService";

const initialState = {
  sounds: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new sound
export const createSound = createAsyncThunk(
  "sounds/create",
  async (soundData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await soundService.createSound(soundData, token);
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

// Update sound
export const updateSound = createAsyncThunk(
  "sounds/update",
  async ({ id, soundData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await soundService.updateSound(id, soundData, token);
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

// Get user sounds
export const getSounds = createAsyncThunk(
  "sounds/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await soundService.getSounds(token);
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

// Delete user sound
export const deleteSound = createAsyncThunk(
  "sounds/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await soundService.deleteSound(id, token);
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

export const soundSlice = createSlice({
  name: "sound",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSound.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSound.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sounds.push(action.payload);
      })
      .addCase(createSound.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateSound.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSound.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // const { id, text } = action.payload;
        // const updatedSounds = state.sounds.map((sound) => {
        //   if (sound._id === id) {
        //     return { ...sound, text };
        //   } else {
        //     return sound;
        //   }
        // });
        // console.log(updatedSounds);
        // state.sounds = updatedSounds;
      })
      .addCase(updateSound.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSounds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSounds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sounds = action.payload;
      })
      .addCase(getSounds.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteSound.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSound.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sounds = state.sounds.filter(
          (sound) => sound._id !== action.payload.id
        );
      })
      .addCase(deleteSound.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = soundSlice.actions;
export default soundSlice.reducer;
