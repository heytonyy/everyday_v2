import { createSlice } from "@reduxjs/toolkit";
import { StoreState } from "./types";

const initialState: StoreState = {
  mode: "light",
  user: null,
  token: null,
  days: [],
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
    },
    setDay: (state, action) => {
      const updatedDays = state.days.map((day) => {
        if (day._id === action.payload.day._id) return action.payload.day;
        return day;
      });
      state.days = updatedDays;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setDays, setDay } =
  authSlice.actions;
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
