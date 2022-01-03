import React, { Component } from 'react'
import NoteModify from '../NoteModify/NoteModify'

export default class NoteAdd extends Component {
  render () {
    return <NoteModify action='add' />
  }
}
