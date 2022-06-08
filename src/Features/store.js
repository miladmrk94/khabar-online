import { configureStore } from "@reduxjs/toolkit";
import FeedSlice from "./Feed/FeedSlice";

const store = configureStore({
  reducer: {
    feed: FeedSlice,
  },
});

export default store;
