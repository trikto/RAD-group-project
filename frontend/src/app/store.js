import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import eventReducer from "../features/events/eventSlice";
import foodReducer from "../features/foods/foodSlice";
import inviteReducer from "../features/invites/inviteSlice";
import locationReducer from "../features/locations/locationSlice";
import soundReducer from "../features/sounds/soundSlice";
import decorationReducer from "../features/decorations/decorationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    foods: foodReducer,
    invites: inviteReducer,
    locations: locationReducer,
    sounds: soundReducer,
    decorations: decorationReducer,
  },
});
