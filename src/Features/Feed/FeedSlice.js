import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import uniqid from "uniqid";

export const asyncFeed = createAsyncThunk(
  "feed/asyncFeed",
  async (_, { rejectWithValue }) => {
    try {
      const feed = await axios.get(
        "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.khabaronline.ir%2Frss%2F&api_key=v2jsqyc9nbfl1jqqasf8acg5gdnihkgdhcc96caw&count=5"
      );
      const addKey = (obj) => {
        return obj.map((i) => {
          return {
            ...i,
            id: uniqid(),
            favorite: false,
            like: false,
            comments: [],
          };
        });
      };
      return addKey(feed.data.items);

      // add uniq id for items
    } catch (error) {
      return rejectWithValue([], error);
    }
  }
);

const initialData = {
  data: [],
  loading: false,
  err: null,
};
const local = JSON.parse(localStorage.getItem("data"));
const feedSlice = createSlice({
  name: "feed",
  initialState: initialData,
  reducers: {
    favorite: (state, action) => {
      const id = action.payload;
      const find = state.data.find((i) => {
        return i.id === id;
      });
      find.favorite = !find.favorite;
      console.log(find.favorite + " favorite");
      localStorage.setItem("data", JSON.stringify(state));
    },
    like: (state, action) => {
      const id = action.payload;
      const find = state.data.find((i) => {
        return i.id === id;
      });
      find.like = !find.like;
      console.log(find.like + " like");
      localStorage.setItem("data", JSON.stringify(state));
    },
    comment: (state, action) => {
      const items = action.payload;

      const find = state.data.findIndex((i) => {
        return i.id === items.id;
      });
      state.data[find].comments.push(items.state);
      localStorage.setItem("data", JSON.stringify(state));
    },
  },
  extraReducers: {
    [asyncFeed.fulfilled]: (state, action) => {
      return {
        ...state,
        data: local ? local.data : action.payload,
        loading: false,
        err: null,
      };
    },
    [asyncFeed.pending]: (state, action) => {
      return { ...state, data: [], loading: true, err: null };
    },
    [asyncFeed.rejected]: (state, action) => {
      return { ...state, data: [], loading: false, err: action.error };
    },
  },
});

export const { favorite, like, comment } = feedSlice.actions;
export default feedSlice.reducer;
