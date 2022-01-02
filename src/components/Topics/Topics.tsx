import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { TopicData } from '../../database'
import { RootState } from '../../store'
import { listTopics } from './Topics.slice'
import Topic from '../Topic/Topic'

interface TopicsProps extends ConnectedProps<typeof connector> {}

interface TopicsState {
  activeId: number | null
}

class Topics extends Component<TopicsProps, TopicsState> {
  constructor (props: TopicsProps) {
    super(props)
    this.state = {
      activeId: 0
    }
    this.topic = this.topic.bind(this)
    this.handleTopicClick = this.handleTopicClick.bind(this)
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
    this.props.listTopics()
  }

  render () {
    return this.props.topics.map(this.topic)
  }
}

const mapState = (state: RootState) => state.topics
const mapDispatch = { listTopics }

const connector = connect(mapState, mapDispatch)

export default connector(Topics)
