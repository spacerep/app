import { Promise } from 'bluebird'
import database, { NoteCreationData, NoteData, TopicData } from '../database'
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
        await this.medias.put(mediaData)
      }
      const note = await this.notes.get(noteId) as NoteData
      return note
    } catch (error) {
      return null
    }
  },

  async list (topicId: number) {
    try {
      const notes = await this.whereTopic(topicId).toArray() as NoteData[]
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
  }
}
