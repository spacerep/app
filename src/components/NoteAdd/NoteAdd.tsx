import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { NoteCreationData } from '../../database'
import { createNote } from '../Notes/Notes.slice'
import { toggleActiveForm } from '../TopicActionForm/TopicActionForm.slice'
import NoteModify from '../NoteModify/NoteModify'

interface NoteAddProps extends ConnectedProps<typeof connector> {}

class NoteAdd extends Component<NoteAddProps> {
  constructor (props: NoteAddProps) {
    super(props)
    this.handleAddClick = this.handleAddClick.bind(this)
  }

  handleAddClick (noteData: NoteCreationData, media: File | null) {
    const payload = { noteData, media }
    this.props.createNote(payload)
    this.props.toggleActiveForm('noteAdd')
  }

  render () {
    return (
      <NoteModify
        action='add'
        onModify={this.handleAddClick} />
    )
  }
}

const mapDispatch = { createNote, toggleActiveForm }

const connector = connect(null, mapDispatch)

export default connector(NoteAdd)
