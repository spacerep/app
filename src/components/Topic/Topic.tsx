import React, { Component } from 'react'
import datetimeUtil from '../../utils/datetime.util'
import Progress from '../Progress/Progress'
import style from './Topic.style'

interface TopicProps {
  id: number
  title: string
  repetitions: number
  nextRepetitionAt: string
  notesCount: number
  notesLearnedCount: number
  active: boolean
  onClick: (id: number) => void
}

export default class Topic extends Component<TopicProps> {
  constructor (props: TopicProps) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  get topicStyle () {
    const active = this.props.active ? 'bg-dark-secondary' : 'bg-dark-primary'
    return `${style.topic} ${active}`
  }

  get relativeNexRepetitionAt () {
    return datetimeUtil.toRelativeCalendar(this.props.nextRepetitionAt)
  }

  handleClick () {
    const { id, onClick } = this.props
    onClick(id)
  }

  render () {
    return (
      <div
        className={this.topicStyle}
        onClick={this.handleClick}>
        <div className={style.details}>
          <h3 className={style.title}>
            {this.props.title}
          </h3>
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
