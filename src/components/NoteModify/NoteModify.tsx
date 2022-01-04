import React, { Component, Fragment } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { NoteCreationData } from '../../database'
import { RootState } from '../../store'
import Button from '../Button/Button'
import HelperText from '../HelperText/HelperText'
import Input from '../Input/Input'
import InputFile from '../InputFile/InputFile'
import Textarea from '../Textarea/Textarea'

type NoteModifyAction = 'add' | 'edit'
type NoteModifyActionText = Record<NoteModifyAction, string>

interface NoteModifyProps extends ConnectedProps<typeof connector> {
  action: NoteModifyAction
  onModify: (noteData: NoteCreationData, media: File | null) => void
}

interface NoteModifyState {
  heading: string
  content: string
  media: File | null
  mediaFilename: string
}

class NoteModify extends Component<NoteModifyProps, NoteModifyState> {
  initialState: NoteModifyState = {
    heading: '',
    content: '',
    media: null,
    mediaFilename: ''
  }

  actionTexts: NoteModifyActionText = {
    add: 'Add note',
    edit: 'Edit note'
  }

  constructor (props: NoteModifyProps) {
    super(props)
    this.state = this.initialState
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputFileChange = this.handleInputFileChange.bind(this)
    this.handleModifyClick = this.handleModifyClick.bind(this)
  }

  get actionText () {
    return this.actionTexts[this.props.action]
  }

  resetFields () {
    this.setState(this.initialState)
  }

  handleInputChange (name: string, value: string) {
    if (name === 'heading') this.setState({ heading: value })
    else if (name === 'content') this.setState({ content: value })
  }

  handleInputFileChange (name: string, file: File | null, filename: string) {
    if (name === 'media') {
      this.setState({ media: file, mediaFilename: filename })
    }
  }

  handleModifyClick () {
    if (!this.props.activeTopicId) return
    const { heading, content, media } = this.state
    if (!heading || !content) return
    const noteData = {
      topicId: this.props.activeTopicId,
      heading,
      content,
      learned: false
    }
    this.props.onModify(noteData, media)
    this.resetFields()
  }

  render () {
    return (
      <Fragment>
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
            name='content'
            value={this.state.content}
            placeholder='Note'
            rows={4}
            onChange={this.handleInputChange} />
          <HelperText
            text='Text format: _italic_, *bold*, ~strikethrough~, ```monospace```' />
        </div>
        <Button
          text={this.actionText}
          onClick={this.handleModifyClick} />
      </Fragment>
    )
  }
}

const mapState = (state: RootState) => ({
  activeTopicId: state.topics.activeId
})

const connector = connect(mapState)

export default connector(NoteModify)
