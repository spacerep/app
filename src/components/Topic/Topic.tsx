import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import style from './Topic.style'
import { RootState } from '../../store'
import datetimeUtil from '../../utils/datetime.util'
import { isActiveTopic, setActiveId } from '../Topics/Topics.slice'
import Heading from '../Heading/Heading'
import Progress from '../Progress/Progress'

interface TopicProps {
  id: number
  title: string
  repetitions: number
  nextRepetitionAt: string
  notesCount: number
  notesLearnedCount: number
}

interface TopicCombinedProps
 extends TopicProps, ConnectedProps<typeof connector> {}

class Topic extends Component<TopicCombinedProps> {
  constructor (props: TopicCombinedProps) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  get topicStyle () {
    const active = this.props.isActive ? 'bg-dark-secondary' : 'bg-dark-primary'
    return `${style.topic} ${active}`
  }

  get relativeNexRepetitionAt () {
    return datetimeUtil.toRelativeCalendar(this.props.nextRepetitionAt)
  }

  handleClick () {
    this.props.setActiveId(this.props.id)
  }

  render () {
    return (
      <div
        className={this.topicStyle}
        onClick={this.handleClick}>
        <div className={style.details}>
          <Heading text={this.props.title} />
          <div className={style.repsDetails}>
            <h4 className={style.repsCount}>
              {this.props.repetitions} reps
            </h4>
            <small className={style.nextRep}>
              Next {this.relativeNexRepetitionAt}
            </small>
          </div>
        </div>
        <Progress
          total={this.props.notesCount}
          completed={this.props.notesLearnedCount} />
      </div>
    )
  }
}

const mapState = (state: RootState) => {
  return (state: RootState, props: TopicProps) => {
    return {
      activeId: state.topics.activeId,
      isActive: isActiveTopic(state, props.id)
    }
  }
}

const mapDispatch = { setActiveId }

const connector = connect(mapState, mapDispatch)

export default connector(Topic)
