import database, { NoteCreationData, NoteData } from '../database'
import fileUtil from '../utils/file.util'

export default {
  notes: database.notes,
  medias: database.medias,

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
  }
}
