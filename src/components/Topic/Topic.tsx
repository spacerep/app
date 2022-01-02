import React, { Component } from 'react'
import datetimeUtil from '../../utils/datetime.util'
import Progress from '../Progress/Progress'
import style from './Topic.style'

interface TopicProps {
  title: string
  repetitions: number
  nextRepetitionAt: string
  notesCount: number
  notesLearnedCount: number
  active: boolean
}

export default class Topic extends Component<TopicProps> {
  get className () {
    const active = this.props.active ? 'bg-dark-secondary' : 'bg-dark-primary'
    return `${style.topic} ${active}`
  }

  get relativeNexRepetitionAt () {
    return datetimeUtil.toRelativeCalendar(this.props.nextRepetitionAt)
  }

  render () {
    return (
      <div className={this.className}>
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
