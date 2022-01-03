import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../store'
import Actions, { ActionName } from '../Actions/Actions'

interface TopicActionsProps extends ConnectedProps<typeof connector> {}

class TopicActions extends Component<TopicActionsProps> {
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
        return null
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

const connector = connect(mapState)

export default connector(TopicActions)
