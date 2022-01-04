import Dexie, { Table } from 'dexie'

export type MediaType = 'video' | 'audio' | 'image'

export interface TopicData {
  id: number
  title: string
  notesCount: number
  notesLearnedCount: number
  repetition: RepetitionData
}

export type TopicCreationData = Pick<TopicData, 'title'>

export interface RepetitionData {
  topicId: number
  count: number
  nextAt: string
}

export type RepetitionCreationData = RepetitionData

export interface NoteData {
  id: number
  topicId: number
  heading: string
  content: string
  learned: boolean
  media: MediaData
}

export type NoteCreationData = Omit<NoteData, 'id' | 'media'>

export interface MediaData {
  noteId: number
  body: string
  type: MediaType
}

export type MediaCreationData = MediaData

class Database extends Dexie {
  topics!: Table<TopicCreationData, number>
  repetitions!: Table<RepetitionCreationData>
  notes!: Table<NoteCreationData, number>
  medias!: Table<MediaCreationData>

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
