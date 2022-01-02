import database, { TopicCreationData, TopicData } from '../database'

export default {
  topics: database.topics,

  async create (topicData: TopicCreationData): Promise<TopicData | null> {
    try {
      const id = await this.topics.put(topicData)
      const topic = await this.topics.get(id) as TopicData
      return topic
    } catch (error) {
      // TODO
      return null
    }
  }
}
