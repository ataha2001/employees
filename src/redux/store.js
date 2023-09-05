import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
// import { jsonServerApi } from '../services/jsonServerApi'
import { firebaseApi } from '../services/firebaseApi'
import departmentReducr from '../redux/departmentSlice'
import empReducer from '../redux/dataSlice'
import userReducer from '../redux/userSlice'

export const store = configureStore({
  reducer: {
    departments : departmentReducr,
    empData : empReducer,
    userData : userReducer,
    // [jsonServerApi.reducerPath]: jsonServerApi.reducer,
    [firebaseApi.reducerPath]: firebaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(firebaseApi.middleware),
});

setupListeners(store.dispatch);