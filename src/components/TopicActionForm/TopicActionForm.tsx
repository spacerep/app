import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../store'
import style from './TopicActionForm.style'
import Heading from '../Heading/Heading'
import NoteEdit from '../NoteEdit/NoteEdit'
import NoteAdd from '../NoteAdd/NoteAdd'
import NotesImport from '../NotesImport/NotesImport'

export type TopicActionFormName = 'topicTitleEdit' |
  'noteAdd' |
  'noteEdit' |
  'notesImport'

type Headings = Record<TopicActionFormName, string>

interface TopicActionFormProps extends ConnectedProps<typeof connector> {}

class TopicActionForm extends Component<TopicActionFormProps> {
  headings: Headings = {
    topicTitleEdit: 'Edit title',
    noteAdd: 'Add note',
    noteEdit: 'Edit note',
    notesImport: 'Import notes'
  }

  get heading () {
    const { activeForm } = this.props
    return activeForm &&
      <Heading text={this.headings[activeForm]} />
  }

  get form () {
    switch (this.props.activeForm) {
      case 'topicTitleEdit':
        return null
      case 'noteAdd':
        return <NoteAdd />
      case 'noteEdit':
        return <NoteEdit />
      case 'notesImport':
        return <NotesImport />
      default:
        return null
    }
  }

  render () {
    return this.props.activeForm &&
      <div className={style.wrapper}>
        <div className={style.form}>
          {this.heading}
          {this.form}
        </div>
      </div>
  }
}

const mapState = (state: RootState) => ({
  activeForm: state.topicActionForm.activeForm
})

const connector = connect(mapState)

export default connector(TopicActionForm)
