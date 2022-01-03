import { createSlice } from '@reduxjs/toolkit'
import { TopicActionFormName } from './TopicActionForm'

export interface TopicActionFormState {
  activeForm: TopicActionFormName | null
}

const initialState: TopicActionFormState = {
  activeForm: null
}

export const topicActionFormSlice = createSlice({
  name: 'topicActionForm',
  initialState,
  reducers: {
    toggleActiveForm: (state, action) => {
      const { payload: activeForm } = action
      state.activeForm = state.activeForm === activeForm ? null : activeForm
    }
  }
})

export const { toggleActiveForm } = topicActionFormSlice.actions

export default topicActionFormSlice.reducer
