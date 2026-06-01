import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import agentReducer from "./agentSlice";

export const store = configureStore({
  //configureStore is a Redux function, to build a store
  reducer: {
    auth: authReducer, // register reducer from authSlice and naming it as auth
    agent: agentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
