import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../store'
import { deleteTopic } from '../Topics/Topics.slice'
import Actions, { ActionName } from '../Actions/Actions'

interface TopicActionsProps extends ConnectedProps<typeof connector> {}

class TopicActions extends Component<TopicActionsProps> {
  constructor (props: TopicActionsProps) {
    super(props)
    this.handleActionClick = this.handleActionClick.bind(this)
  }

  handleActionClick (action: ActionName, topicId: number) {
    switch (action) {
      case 'add':
        return null
      case 'visibility':
        return null
      case 'edit':
        return null
      case 'import':
        return null
      case 'export':
        return null
      case 'delete':
        return this.props.deleteTopic(topicId)
    }
  }

  render () {
    return this.props.activeTopicId && (
      <Actions
        id={this.props.activeTopicId}
        scope='topic'
        onClick={this.handleActionClick} />
    )
  }
}

const mapState = (state: RootState) => ({
  activeTopicId: state.topics.activeId
})

const mapDispatch = { deleteTopic }

const connector = connect(mapState, mapDispatch)

export default connector(TopicActions)