import { Promise } from 'bluebird'
import { compact } from 'lodash'
import database, {
  MediaCreationData,
  NoteCreationData,
  NoteData,
  TopicData
} from '../database'
import downloadUtil from '../utils/download.util'
import fileUtil from '../utils/file.util'

export default {
  notes: database.notes,
  medias: database.medias,

  whereTopic (topicId: number) {
    return this.notes.where({ topicId })
  },

  async withMedia (note: NoteData) {
    const { id: noteId } = note
    const media = await this.medias.where({ noteId }).first()
    if (media) note.media = media
    return note
  },

  withMediaEach (notes: NoteData[]) {
    return Promise.map(notes, note => this.withMedia(note))
  },

  async create (noteData: NoteCreationData, media: File | null) {
    try {
      const noteId = await this.notes.put(noteData)
      if (media) {
        const mediaData = {
          noteId,
          body: await fileUtil.toDataURL(media),
          type: fileUtil.getCategory(media)
        }
        await this.createMedia(mediaData)
      }
      const note = await this.notes.get(noteId) as NoteData
      return note
    } catch (error) {
      return null
    }
  },

  async createMedia (mediaData: MediaCreationData) {
    try {
      return this.medias.put(mediaData)
    } catch (error) {
      return null
    }
  },

  async replicate (note: NoteData, topicId: number) {
    try {
      const { heading, content, learned, media } = note
      const noteData = { topicId, heading, content, learned }
      const noteId = await this.notes.put(noteData)
      const noteCreated = await this.notes.get(noteId) as NoteData
      if (noteCreated && media) {
        const { id: noteId } = noteCreated
        const { body, type } = media
        const mediaData = { noteId, body, type }
        await this.createMedia(mediaData)
        return this.withMedia(noteCreated)
      }
      return noteCreated
    } catch (error) {
      return null
    }
  },

  async list (topicId: number) {
    try {
      const notes = await this.whereTopic(topicId)
        .reverse()
        .toArray() as NoteData[]
      return await this.withMediaEach(notes)
    } catch (error) {
      return null
    }
  },

  async export (topic: TopicData) {
    try {
      const { id: topicId, title } = topic
      const notes = await this.list(topicId)
      const filtename = `${title} notes.json`
      if (notes) downloadUtil.arrayDownload(notes, filtename)
    } catch (error) {
      return null
    }
  },

  async import (notesFile: File, topicId: number) {
    try {
      const content = await fileUtil.toContent(notesFile)
      const notes = JSON.parse(content) as NoteData[]
      const importedNotes = await Promise.map(notes, note => {
        return this.replicate(note, topicId)
      })
      return compact(importedNotes)
    } catch (error) {
      return null
    }
  }
}
