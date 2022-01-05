import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../store'
import { activeTopic, deleteTopic } from '../Topics/Topics.slice'
import { toggleActiveForm } from '../TopicActionForm/TopicActionForm.slice'
import { exportNotes, toggleVisibility } from '../Notes/Notes.slice'
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
        return this.props.toggleTopicActiveForm('noteAdd')
      case 'visibility':
        return this.props.toggleNotesVisibility()
      case 'edit':
        return this.props.toggleTopicActiveForm('topicTitleEdit')
      case 'import':
        return this.props.toggleTopicActiveForm('notesImport')
      case 'export': {
        const { activeTopic } = this.props
        if (activeTopic) this.props.exportNotes(activeTopic)
        return
      }
      case 'delete': {
        const deleteConfirm = confirm('Are you sure to delete this topic?')
        if (deleteConfirm) this.props.deleteTopic(topicId)
        return null
      }
      default:
        return null
    }
  }

  render () {
    return this.props.activeTopic && (
      <Actions
        id={this.props.activeTopic.id}
        scope='topic'
        onClick={this.handleActionClick} />
    )
  }
}

const mapState = (state: RootState) => {
  return {
    activeTopic: activeTopic(state)
  }
}

const mapDispatch = {
  deleteTopic,
  toggleTopicActiveForm: toggleActiveForm,
  exportNotes,
  toggleNotesVisibility: toggleVisibility
}

const connector = connect(mapState, mapDispatch)

export default connector(TopicActions)
