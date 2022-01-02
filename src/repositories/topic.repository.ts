import database, { TopicCreationData } from '../database'

export default {
  topics: database.topics,

  async create (topicData: TopicCreationData) {
    try {
      const id = await this.topics.put(topicData)
      const topic = await this.topics.get(id)
      return topic
    } catch (error) {
      // TODO
    }
  }
}
