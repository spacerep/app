import Promise from 'bluebird'
import database, { NoteData, TopicCreationData, TopicData } from '../database'
import datetimeUtil from '../utils/datetime.util'

export default {
  topics: database.topics,
  repetitions: database.repetitions,
  notes: database.notes,
  medias: database.medias,

  async readRepetition (topic: TopicData) {
    const { id: topicId } = topic
    const repetition = await this.repetitions.get({ topicId })
    if (repetition) topic.repetition = repetition
    return topic
  },

  async readNotesCount (topic: TopicData) {
    const { id: topicId } = topic
    topic.notesCount = await this.notes.where({ topicId }).count()
    return topic
  },

  async readNotesLearnedCount (topic: TopicData) {
    const { id: topicId } = topic
    topic.notesLearnedCount = await this.notes
      .where({ topicId, learned: true })
      .count()
    return topic
  },

  async withEagerLoad (topic: TopicData) {
    topic = await this.readRepetition(topic)
    topic = await this.readNotesCount(topic)
    topic = await this.readNotesLearnedCount(topic)
    return topic
  },

  async withEagerLoadEach (topics: TopicData[]) {
    return Promise.map(topics, topic => this.withEagerLoad(topic))
  },

  async create (topicData: TopicCreationData) {
    try {
      const topicId = await this.topics.put(topicData)
      const repetition = {
        topicId,
        count: 0,
        nextAt: datetimeUtil.nextRepetitionAt(0)
      }
      await this.repetitions.put(repetition)
      const topic = await this.topics.get(topicId) as TopicData
      return this.withEagerLoad(topic)
    } catch (error) {
      // TODO
      return null
    }
  },

  async list () {
    try {
      const topics = await this.topics
        .reverse()
        .toArray() as TopicData[]
      return this.withEagerLoadEach(topics)
    } catch (error) {
      return null
    }
  },

  async delete (id: number) {
    try {
      const topic = await this.topics.get(id)
      const notesQuery = () => this.notes.where({ topicId: id })
      const notes = await notesQuery().toArray() as NoteData[]
      const noteIds = notes.map(note => note.id)
      await this.medias.where('noteId').anyOf(noteIds).delete()
      await notesQuery().delete()
      await this.repetitions.where({ topicId: id }).delete()
      await this.topics.delete(id)
      return topic as TopicData
    } catch (error) {
      return null
    }
  }
}
