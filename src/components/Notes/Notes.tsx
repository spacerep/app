import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import style from './Notes.style'
import { NoteData } from '../../database'
import { RootState } from '../../store'
import { listNotes } from './Notes.slice'
import Note from '../Note/Note'

interface NotesProps extends ConnectedProps<typeof connector> {}

class Notes extends Component<NotesProps> {
  note (note: NoteData) {
    const { heading, content, learned, media } = note
    return (
      <Note
        heading={heading}
        content={content}
        learned={learned}
        media={media} />
    )
  }

  get notes () {
    return [...this.props.notes].reverse().map(note => this.note(note))
  }

  componentDidUpdate (props: NotesProps) {
    const { activeTopicId } = this.props
    if (activeTopicId && (activeTopicId !== props.activeTopicId)) {
      this.props.listNotes(activeTopicId)
    }
  }

  render () {
    return this.props.activeTopicId &&
      <div className={style.notes}>
        {this.notes}
      </div>
  }
}

const mapState = (state: RootState) => ({
  notes: state.notes.notes,
  activeTopicId: state.topics.activeId
})

const mapDispatch = { listNotes }

const connector = connect(mapState, mapDispatch)

export default connector(Notes)
