import React, { Component } from 'react'
import { TopicData } from '../../database'
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
  }

  isActive (topic: TopicData) {
    return this.state.activeId === topic.id
  }

  topic (topic: TopicData) {
    const { repetition, notesCount, notesLearnedCount } = topic
    return repetition && notesCount && notesLearnedCount &&
      <Topic
        title={topic.title}
        repetitions={repetition.count}
        nextRepetitionAt={repetition.nextAt}
        notesCount={notesCount}
        notesLearnedCount={notesLearnedCount}
        active={this.isActive(topic)} />
  }

  listTopics () {
    // TODO
    this.setState({
      topics: [
        {
          id: 1,
          title: 'C++ Primer',
          repetition: {
            topicId: 1,
            count: 0,
            nextAt: new Date('Jan 10 2022').toISOString()
          },
          notesCount: 10,
          notesLearnedCount: 6
        },
        {
          id: 2,
          title: 'English House - Grammer',
          repetition: {
            topicId: 2,
            count: 3,
            nextAt: new Date('June 19 2022').toISOString()
          },
          notesCount: 10,
          notesLearnedCount: 9
        }
      ]
    })
  }

  componentDidMount () {
    this.listTopics()
  }

  render () {
    return this.state.topics.map(this.topic)
  }
}
