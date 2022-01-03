import React, { Component, Fragment } from 'react'
import Button from '../Button/Button'
import InputFile from '../InputFile/InputFile'

interface NotesImportProps {}

interface NotesImportState {
  notes: File | null
  notesFilename: string
}

export default class NotesImport
  extends Component<NotesImportProps, NotesImportState> {
  constructor (props: NotesImportProps) {
    super(props)
    this.state = {
      notes: null,
      notesFilename: ''
    }
    this.handleInputFileChange = this.handleInputFileChange.bind(this)
    this.handleImportClick = this.handleImportClick.bind(this)
  }

  handleInputFileChange (name: string, file: File | null, filename: string) {
    if (name === 'notes') {
      this.setState({ notes: file, notesFilename: filename })
    }
  }

  handleImportClick () {
    // TODO Handle import click
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
