import { userPlaceholder } from '@/lib/placeholder/UserPlaceholder';
import { createSlice } from '@reduxjs/toolkit';

const initialState = userPlaceholder


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action.payload.user)
      state = {
        ...action.payload.user,
        birthDate: "2002-02-03"
      };
    },
    logout: (state) => {
      state = userPlaceholder;
    },
    addUser: (state, action) => {
      return action.payload;
    },
    editUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetUser: () => {
      return initialState;
    },




  },
});

export const {
  login,
  logout,
  addUser,
  editUser,
  resetUser,

} = authSlice.actions;
export default authSlice.reducer;