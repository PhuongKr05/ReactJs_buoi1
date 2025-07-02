import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import photoReducer from './photoSlice'; 
export const store = configureStore({
  reducer: {
    users: userReducer,
    photos: photoReducer, 
  },
});
