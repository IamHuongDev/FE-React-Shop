import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  avatar: '',
  password: '',
  id: '',
  access_token: '',
  isAdmin: false
}

export const UserSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initiaUser: (state, action) => {
        const {name = '', email = '', avatar = '', address = '',phone  = '', access_token = '', _id='', password= '', isAdmin } = action.payload
        state.name = name;
        state.email = email;
        state.phone = phone;
        state.address = address;
        state.avatar = avatar;
        state.id = _id;
        state.password = password;
        state.access_token = access_token;
        state.isAdmin = isAdmin;
    },
    resetUser: (state) => {
        state.name ='';
        state.email = '';
        state.phone = '';
        state.address = '';
        state.avatar = '';
        state.id = '';
        state.password = '';
        state.access_token = '';
        state.isAdmin = false;
    },
  },
})

export const { initiaUser, resetUser} = UserSlide.actions

export default UserSlide.reducer
