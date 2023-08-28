import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import inviteService from "./inviteService";

const initialState = {
  invites: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new invite
export const createInvite = createAsyncThunk(
  "invites/create",
  async (inviteData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await inviteService.createInvite(inviteData, token);
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

// Update invite
export const updateInvite = createAsyncThunk(
  "invites/update",
  async ({ id, inviteData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await inviteService.updateInvite(id, inviteData, token);
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

// Get user invites
export const getInvites = createAsyncThunk(
  "invites/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await inviteService.getInvites(token);
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

// Delete user invite
export const deleteInvite = createAsyncThunk(
  "invites/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await inviteService.deleteInvite(id, token);
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

export const inviteSlice = createSlice({
  name: "invite",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInvite.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createInvite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.invites.push(action.payload);
      })
      .addCase(createInvite.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateInvite.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateInvite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // const { id, text } = action.payload;
        // const updatedInvites = state.invites.map((invite) => {
        //   if (invite._id === id) {
        //     return { ...invite, text };
        //   } else {
        //     return invite;
        //   }
        // });
        // console.log(updatedInvites);
        // state.invites = updatedInvites;
      })
      .addCase(updateInvite.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getInvites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInvites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.invites = action.payload;
      })
      .addCase(getInvites.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteInvite.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteInvite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.invites = state.invites.filter(
          (invite) => invite._id !== action.payload.id
        );
      })
      .addCase(deleteInvite.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = inviteSlice.actions;
export default inviteSlice.reducer;
