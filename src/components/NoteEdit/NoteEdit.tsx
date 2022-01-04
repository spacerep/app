import React, { Component } from 'react'
import NoteModify from '../NoteModify/NoteModify'

interface NoteEditProps {}

export default class NoteEdit extends Component<NoteEditProps> {
  constructor (props: NoteEditProps) {
    super(props)
    this.handleEditClick = this.handleEditClick.bind(this)
  }

  handleEditClick () {
    // TODO
  }

  render () {
    return (
      <NoteModify
        action='edit'
        onModify={this.handleEditClick} />
    )
  }
}
