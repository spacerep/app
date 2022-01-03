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
    setActiveForm: (state, action) => {
      const { payload: activeForm } = action
      state.activeForm = activeForm
    }
  }
})

export const { setActiveForm } = topicActionFormSlice.actions

export default topicActionFormSlice.reducer
