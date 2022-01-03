import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import style from './TopicHeader.style'
import { RootState } from '../../store'
import { activeTopic } from '../Topics/Topics.slice'
import Heading from '../Heading/Heading'
import TopicActions from '../TopicActions/TopicActions'

interface TopicHeaderProps extends ConnectedProps<typeof connector> {}

class TopicHeader extends Component<TopicHeaderProps> {
  render () {
    const { activeTopic } = this.props
    return activeTopic &&
      <div className={style.topicHeader}>
        <Heading text={activeTopic.title} />
        <TopicActions />
      </div>
  }
}

const mapState = (state: RootState) => ({
  activeTopic: activeTopic(state)
})

const connector = connect(mapState)

export default connector(TopicHeader)
