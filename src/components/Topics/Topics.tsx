import React, { Component } from 'react'
import { TopicData } from '../../database'
import topicRepository from '../../repositories/topic.repository'
import Topic from '../Topic/Topic'

interface TopicsProps {}

interface TopicsState {
  topics: TopicData[]
  activeId: number | null
}

export default class Topics extends Component<TopicsProps, TopicsState> {
  constructor (props: TopicsProps) {
    super(props)
    this.state = {
      topics: [],
      activeId: 0
    }
    this.topic = this.topic.bind(this)
    this.handleTopicClick = this.handleTopicClick.bind(this)
  }

  async listTopics () {
    const topics = await topicRepository.list()
    if (topics) this.setState({ topics })
  }

  isActive (topic: TopicData) {
    return this.state.activeId === topic.id
  }

  topic (topic: TopicData) {
    const { repetition, notesCount, notesLearnedCount } = topic
    return (
      <Topic
        key={topic.id}
        id={topic.id}
        title={topic.title}
        repetitions={repetition.count}
        nextRepetitionAt={repetition.nextAt}
        notesCount={notesCount}
        notesLearnedCount={notesLearnedCount}
        active={this.isActive(topic)}
        onClick={this.handleTopicClick} />
    )
  }

  setActiveId (activeId: number) {
    this.setState({ activeId })
  }

  handleTopicClick (activeId: number) {
    this.setActiveId(activeId)
  }

  componentDidMount () {
    this.listTopics()
  }

  render () {
    return this.state.topics.map(this.topic)
  }
}
