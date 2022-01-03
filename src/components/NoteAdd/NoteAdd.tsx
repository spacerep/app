import React, { Component } from 'react'
import Button from '../Button/Button'
import Heading from '../Heading/Heading'
import HelperText from '../HelperText/HelperText'
import Input from '../Input/Input'
import InputFile from '../InputFile/InputFile'
import Textarea from '../Textarea/Textarea'
import style from './NoteAdd.style'

interface NoteAddProps {}

interface NoteAddState {
  heading: string
  media: File | null
  mediaFilename: string
  note: string
}

export default class NoteAdd extends Component<NoteAddProps, NoteAddState> {
  constructor (props: NoteAddProps) {
    super(props)
    this.state = {
      heading: '',
      media: null,
      mediaFilename: '',
      note: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputFileChange = this.handleInputFileChange.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)
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

  handleAddClick () {
    // TODO Handle add click
  }

  render () {
    return (
      <div className={style.noteAdd}>
        <div className={style.form}>
          <Heading text='Add note' />
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
            text="Add note"
            onClick={this.handleAddClick} />
        </div>
      </div>
    )
  }
}
