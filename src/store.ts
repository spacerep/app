import { configureStore } from '@reduxjs/toolkit'
import topicAdd from './slices/topicAdd.slice'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: {
    topicAdd
  }
})
