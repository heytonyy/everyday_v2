import { createSlice } from "@reduxjs/toolkit";
import { StoreState } from "./types";
// import { Day } from "./types";

const initialState: StoreState = {
  mode: "light",
  user: null,
  token: null,
  days: [],
  chat: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setDays: (state, action) => {
      state.days = action.payload.days;
      //
      // TODO: tsx has serialization issues with Map... figure out a solution
      // const daysWithSerializedLikes = action.payload.days.map((day: Day) => ({
      //   ...day,
      //   likes: Array.from(day.likes.entries()),
      // }));
      // const daysWithDeserializedLikes = daysWithSerializedLikes.map(
      //   (day: Day) => ({
      //     ...day,
      //     likes: new Map(day.likes),
      //   })
      // );
      // state.days = daysWithDeserializedLikes;
    },
    setDay: (state, action) => {
      const updatedDays = state.days.map((day) => {
        if (day._id === action.payload.day._id) return action.payload.day;
        return day;
      });
      state.days = updatedDays;
    },
    setChats: (state, action) => {
      state.chat = action.payload.chat;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setDays,
  setDay,
  setChats,
} = authSlice.actions;
export default authSlice.reducer;

// OLD JAVASCRIPT CODE NO TYPESCRIPT
//
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   mode: "light",
//   user: null,
//   token: null,
//   days: [],
// };

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setMode: (state) => {
//       state.mode = state.mode === "light" ? "dark" : "light";
//     },
//     setLogin: (state, action) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//     },
//     setLogout: (state) => {
//       state.user = null;
//       state.token = null;
//     },
//     setFriends: (state, action) => {
//       if (state.user) {
//         state.user.friends = action.payload.friends;
//       } else {
//         console.error("user friends non-existent :(");
//       }
//     },
//     setDays: (state, action) => {
//       state.days = action.payload.days;
//     },
//     setDay: (state, action) => {
//       const updatedDays = state.days.map((day) => {
//         if (day._id === action.payload.day._id) return action.payload.day;
//         return day;
//       });
//       state.days = updatedDays;
//     },
//   },
// });

// export const { setMode, setLogin, setLogout, setFriends, setDays, setDay } =
//   authSlice.actions;
// export default authSlice.reducer;
