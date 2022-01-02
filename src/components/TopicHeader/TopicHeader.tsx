import React, { Component } from 'react'
import Actions, { ActionName } from '../Actions/Actions'
import style from './TopicHeader.style'

interface TopicHeaderProps {
  id: number
  title: string
}

export default class TopicHeader extends Component<TopicHeaderProps> {
  constructor (props: TopicHeaderProps) {
    super(props)
    this.handleActionClick = this.handleActionClick.bind(this)
  }

  handleActionClick (action: ActionName, id: number) {
    // TODO Handle action click
  }

  render () {
    return (
      <div className={style.topicHeader}>
        <h3 className={style.title}>{this.props.title}</h3>
        <Actions
          id={this.props.id}
          scope='topic'
          onClick={this.handleActionClick} />
      </div>
    )
  }
}
