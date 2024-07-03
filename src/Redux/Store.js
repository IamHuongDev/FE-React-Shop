
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './Slides/counterSlice'
import userReducer from './Slides/UserSlide'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
})
