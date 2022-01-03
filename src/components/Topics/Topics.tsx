import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { TopicData } from '../../database'
import { RootState } from '../../store'
import { listTopics } from './Topics.slice'
import Topic from '../Topic/Topic'

interface TopicsProps extends ConnectedProps<typeof connector> {}

class Topics extends Component<TopicsProps> {
  constructor (props: TopicsProps) {
    super(props)
    this.topic = this.topic.bind(this)
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
        notesLearnedCount={notesLearnedCount} />
    )
  }

  componentDidMount () {
    this.props.listTopics()
  }

  render () {
    return this.props.topics.map(this.topic)
  }
}

const mapState = (state: RootState) => ({
  topics: state.topics.topics,
  activeId: state.topics.activeId
})
const mapDispatch = { listTopics }

const connector = connect(mapState, mapDispatch)

export default connector(Topics)
