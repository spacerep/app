import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { TopicData } from '../../database'
import topicRepository from '../../repositories/topic.repository'
import { RootState } from '../../store'

export interface TopicsState {
  topics: TopicData[]
  activeId: number | null
}

const initialState: TopicsState = {
  topics: [],
  activeId: null
}

export const createTopic = createAsyncThunk('topics/create', async (title: string) => {
  const topicData = { title }
  return await topicRepository.create(topicData)
})

export const listTopics = createAsyncThunk('topics/list', async () => {
  return await topicRepository.list()
})

export const isActiveTopic = createSelector(
  [
    (state: RootState) => state.topics.activeId,
    (state: RootState, checkId: number) => checkId
  ],
  (activeId: number, checkId: number) => checkId === activeId
)

export const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    setActiveId (state, { payload: activeId }) {
      state.activeId = activeId
    }
  },
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

export const { setActiveId } = topicsSlice.actions

export default topicsSlice.reducer
