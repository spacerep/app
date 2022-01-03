import React, { Component } from 'react'
import NoteModify from '../NoteModify/NoteModify'

export default class NoteEdit extends Component {
  render () {
    return <NoteModify action='edit' />
  }
}
