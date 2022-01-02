import React, { Component } from 'react'
import Heading from '../Heading/Heading'
import Progress from '../Progress/Progress'
import style from './Topic.style'

interface TopicProps {
  title: string
  reps: number
  nextRepAt: string
  totalNotes: number
  completedNotes: number
  active: boolean
}

export default class Topic extends Component<TopicProps> {
  get className () {
    const active = this.props.active ? 'bg-dark-secondary' : 'bg-dark-primary'
    return `${style.topic} ${active}`
  }

  render () {
    return (
      <div className={this.className}>
        <div className={style.details}>
          <Heading text={this.props.title} />
          <div className={style.repsDetails}>
            <h4 className={style.repsCount}>{this.props.reps} reps</h4>
            <small className={style.nextRep}>Next {this.props.nextRepAt}</small>
          </div>
        </div>
        <Progress
          total={this.props.totalNotes}
          completed={this.props.completedNotes} />
      </div>
    )
  }
}
