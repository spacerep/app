import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { NoteCreationData, NoteData } from '../../database'
import noteRepository from '../../repositories/note.repository'

export interface NotesState {
  notes: NoteData[],
}

interface NoteCreatePayload {
  noteData: NoteCreationData
  media: File | null
}

const initialState: NotesState = {
  notes: []
}

export const createNote = createAsyncThunk(
  'notes/create',
  async (payload: NoteCreatePayload) => {
    const { noteData, media } = payload
    return await noteRepository.create(noteData, media)
  })

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {}
})

export default notesSlice.reducer
