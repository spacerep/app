import { createSlice } from '@reduxjs/toolkit'

export interface TopicAddState {
  opened: boolean
}

const initialState: TopicAddState = {
  opened: false
}

export const topicAddSlice = createSlice({
  name: 'topicAdd',
  initialState,
  reducers: {
    toggle: (state) => {
      state.opened = !state.opened
    }
  }
})

export const { toggle } = topicAddSlice.actions

export default topicAddSlice.reducer
