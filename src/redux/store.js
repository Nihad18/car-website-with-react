import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './reducers/loginSlice'
import registerSlice from './reducers/registerSlice'
import toggleSlice from './reducers/toggleSlice'


export const store = configureStore({
  reducer: {
   login: loginSlice,
   register: registerSlice,
   toggle: toggleSlice,
  },
})