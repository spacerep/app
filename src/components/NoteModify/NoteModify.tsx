import React, { Component } from 'react'
import Button from '../Button/Button'
import HelperText from '../HelperText/HelperText'
import Input from '../Input/Input'
import InputFile from '../InputFile/InputFile'
import Textarea from '../Textarea/Textarea'
import TopicForm from '../TopicForm/TopicForm'

type NoteModifyAction = 'add' | 'edit'
type NoteModifyActionText = Record<NoteModifyAction, string>

interface NoteModifyProps {
  action: NoteModifyAction
}

interface NoteModifyState {
  heading: string
  media: File | null
  mediaFilename: string
  note: string
}

export default class NoteModify extends Component<NoteModifyProps, NoteModifyState> {
  actionTexts: NoteModifyActionText = {
    add: 'Add note',
    edit: 'Edit note'
  }

  constructor (props: NoteModifyProps) {
    super(props)
    this.state = {
      heading: '',
      media: null,
      mediaFilename: '',
      note: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputFileChange = this.handleInputFileChange.bind(this)
    this.handleModifyClick = this.handleModifyClick.bind(this)
  }

  get actionText () {
    return this.actionTexts[this.props.action]
  }

  handleInputChange (name: string, value: string) {
    if (name === 'heading') this.setState({ heading: value })
    else if (name === 'note') this.setState({ note: value })
  }

  handleInputFileChange (name: string, file: File | null, filename: string) {
    if (name === 'media') {
      this.setState({ media: file, mediaFilename: filename })
    }
  }

  handleModifyClick () {
    // TODO Handle modify click
  }

  render () {
    return (
      <TopicForm heading={this.actionText}>
        <Input
          name='heading'
          value={this.state.heading}
          placeholder='Heading'
          onChange={this.handleInputChange} />
        <InputFile
          name='media'
          filename={this.state.mediaFilename}
          accept='audio/*,video/*,image/*'
          placeholder='Choose media'
          onChange={this.handleInputFileChange} />
        <div>
          <Textarea
            name='note'
            value={this.state.note}
            placeholder='Note'
            rows={4}
            onChange={this.handleInputChange} />
          <HelperText
            text='Text format: _italic_, *bold*, ~strikethrough~, ```monospace```' />
        </div>
        <Button
          text={this.actionText}
          onClick={this.handleModifyClick} />
      </TopicForm>
    )
  }
}
