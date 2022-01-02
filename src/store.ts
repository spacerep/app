import { configureStore } from '@reduxjs/toolkit'
import topicAdd from './components/TopicAdd/TopicAdd.slice'
import topics from './components/Topics/Topics.slice'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: {
    topicAdd,
    topics
  }
})