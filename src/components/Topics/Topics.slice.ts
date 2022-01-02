import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TopicData } from '../../database'
import topicRepository from '../../repositories/topic.repository'

export interface TopicsState {
  topics: TopicData[]
}

const initialState: TopicsState = {
  topics: []
}

export const listTopics = createAsyncThunk('topics/list', async () => {
  return await topicRepository.list()
})

export const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(listTopics.fulfilled, (state, action) => {
      const { payload: topics } = action
      if (topics) state.topics = topics
    })
  }
})

export default topicsSlice.reducer
