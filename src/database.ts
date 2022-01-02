import Dexie, { Table } from 'dexie'

export type MediaType = 'video' | 'audio' | 'image'

export interface TopicData {
  id: number
  title: string
  notesCount?: number
  notesLearnedCount?: number
  repetition?: RepetitionData
}

export interface RepetitionData {
  topicId: number
  count: number
  nextAt: string
}

export interface NoteData {
  id: number
  topicId: number
  heading: string
  content: string
  learned: boolean
}

export interface MediaData {
  noteId: number
  body: string
  type: MediaType
}

class Database extends Dexie {
  topics!: Table<TopicData>
  repetitions!: Table<RepetitionData>
  notes!: Table<NoteData>
  medias!: Table<MediaData>

  constructor () {
    super('spacerep')
    this.version(1).stores({
      topics: '++id, title',
      repetitions: 'topicId, count, nextAt',
      notes: '++id, topicId, heading, content, learned',
      medias: 'noteId, type'
    })
  }
}

export default new Database()
