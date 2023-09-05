import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email:'',
    active:false,
    name:'',
    createdAt:'',
    id: '',
    image:''
  },
  reducers: {
    setNewUser: (state, action) => {
        state.email = action.payload.user.email;
        state.active = action.payload.user.active;
        state.name = action.payload.user.name;
        state.id = action.payload.user.id;
        state.createdAt = action.payload.user.createdAt;
        state.image = action.payload.user.image;

        // state.userEmail = "ashraf taha";
        // user.auth.currentUser.email
    //   return action.payload;
    
    console.log("state.userEmail",action.payload);
    },
    logout: (state) => {
      // state.isLoggedIn = false;
      // state.user = null;
      state.email = ''
      state.active = false;
      state.name = '';
      state.id = '';
      state.createdAt = '';
      // console.log('check stat', state)
    },
  },
  
});

export const { setNewUser,logout } = userSlice.actions;

export default userSlice.reducer;