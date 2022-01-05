import React, { Component, Fragment } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../store'
import { importNotes } from '../Notes/Notes.slice'
import { toggleActiveForm } from '../TopicActionForm/TopicActionForm.slice'
import Button from '../Button/Button'
import InputFile from '../InputFile/InputFile'

interface NotesImportProps extends ConnectedProps<typeof connector> {}

interface NotesImportState {
  notes: File | null
  notesFilename: string
}

class NotesImport
  extends Component<NotesImportProps, NotesImportState> {
  initialState = {
    notes: null,
    notesFilename: ''
  }

  constructor (props: NotesImportProps) {
    super(props)
    this.state = this.initialState
    this.handleInputFileChange = this.handleInputFileChange.bind(this)
    this.handleImportClick = this.handleImportClick.bind(this)
  }

  resetFields () {
    this.setState(this.initialState)
  }

  handleInputFileChange (name: string, file: File | null, filename: string) {
    if (name === 'notes') {
      this.setState({ notes: file, notesFilename: filename })
    }
  }

  handleImportClick () {
    const { notes } = this.state
    const { activeTopicId: topicId } = this.props
    if (notes && topicId) this.props.importNotes({ notes, topicId })
    this.props.toggleActiveForm('notesImport')
    this.resetFields()
  }

  render () {
    return (
      <Fragment>
        <InputFile
          name='notes'
          filename={this.state.notesFilename}
          accept='.json'
          placeholder='Choose file'
          onChange={this.handleInputFileChange} />
        <Button
          text="Import notes"
          onClick={this.handleImportClick} />
      </Fragment>
    )
  }
}

const mapState = (state: RootState) => ({
  activeTopicId: state.topics.activeId
})

const mapDispatch = { importNotes, toggleActiveForm }

const connector = connect(mapState, mapDispatch)

export default connector(NotesImport)
