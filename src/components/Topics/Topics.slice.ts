import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TopicData } from '../../database'
import topicRepository from '../../repositories/topic.repository'

export interface TopicsState {
  topics: TopicData[]
}

const initialState: TopicsState = {
  topics: []
}

export const createTopic = createAsyncThunk('topics/create', async (title: string) => {
  const topicData = { title }
  return await topicRepository.create(topicData)
})

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
    builder.addCase(createTopic.fulfilled, (state, action) => {
      const { payload: topic } = action
      if (topic) state.topics.unshift(topic)
    })
  }
})

export default topicsSlice.reducer
