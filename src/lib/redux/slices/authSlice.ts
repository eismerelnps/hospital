import { USER_ROLE, UserType } from '@/lib/types/User/UserType';
import { createSlice } from '@reduxjs/toolkit';

const initialState: UserType = {
  _id: '',
  role: USER_ROLE.PATIENT,
  email: '',
  name: '',
  image: '',
  surnames: '',
  birthDate: undefined,
  address: undefined,
  gender: 'OTHER',
  phone: ''
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state = action.payload.user;
    },
    logout: (state) => {
      state = initialState;
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