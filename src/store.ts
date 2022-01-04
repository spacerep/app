import { configureStore } from '@reduxjs/toolkit'
import topicAdd from './components/TopicAdd/TopicAdd.slice'
import topics from './components/Topics/Topics.slice'
import topicActionForm from './components/TopicActionForm/TopicActionForm.slice'
import notes from './components/Notes/Notes.slice'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: {
    topicAdd,
    topics,
    topicActionForm,
    notes
  }
})
