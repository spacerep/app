import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { NoteCreationData, NoteData, TopicData } from '../../database'
import noteRepository from '../../repositories/note.repository'

export interface NotesState {
  notes: NoteData[],
  visibility: boolean
}

interface NoteCreatePayload {
  noteData: NoteCreationData
  media: File | null
}

interface NotesImportPayload {
  notes: File
  topicId: number
}

const initialState: NotesState = {
  notes: [],
  visibility: true
}

export const createNote = createAsyncThunk(
  'notes/create',
  async (payload: NoteCreatePayload) => {
    const { noteData, media } = payload
    return await noteRepository.create(noteData, media)
  })

export const listNotes = createAsyncThunk(
  'notes/list',
  async (topicId: number) => {
    return await noteRepository.list(topicId)
  })

export const exportNotes = createAsyncThunk(
  'notes/export',
  async (topic: TopicData) => {
    return await noteRepository.export(topic)
  })

export const importNotes = createAsyncThunk(
  'notes/import',
  async (payload: NotesImportPayload) => {
    const { notes, topicId } = payload
    return await noteRepository.import(notes, topicId)
  })

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    toggleVisibility (state) {
      state.visibility = !state.visibility
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createNote.fulfilled, (state, action) => {
      const { payload: note } = action
      if (note) state.notes.unshift(note)
    })
    builder.addCase(listNotes.fulfilled, (state, action) => {
      const { payload: notes } = action
      if (notes) state.notes = notes
    })
    builder.addCase(importNotes.fulfilled, (state, action) => {
      const { payload: notes } = action
      if (notes) state.notes = notes
    })
  }
})

export const { toggleVisibility } = notesSlice.actions

export default notesSlice.reducer
