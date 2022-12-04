import { configureStore } from '@reduxjs/toolkit'
import users from './modules/users'

export const store = configureStore({
  reducer: {users},
})