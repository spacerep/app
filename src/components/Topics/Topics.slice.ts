import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { find } from 'lodash'
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
  if (!title) return
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
  (activeId, checkId) => checkId === activeId
)

export const activeTopic = createSelector(
  [
    (state: RootState) => state.topics.topics,
    (state: RootState) => state.topics.activeId
  ],
  (topics, activeId) => {
    const topic = find(topics, topic => topic.id === activeId)
    return topic || null
  }
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
