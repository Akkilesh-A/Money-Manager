import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  userData: any | null;
}

const initialState: UserState = {
  userData: localStorage.getItem("money-manager-userData")
    ? JSON.parse(localStorage.getItem("money-manager-userData") || "")
    : null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem(
        "money-manager-userData",
        JSON.stringify(action.payload),
      );
    },
    clearUser: (state) => {
      state.userData = null;
      localStorage.removeItem("money-manager-userData");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
