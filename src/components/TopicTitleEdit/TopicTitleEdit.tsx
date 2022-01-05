import React, { Component, Fragment } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { updateTopicTitle } from '../Topics/Topics.slice'
import { toggleActiveForm } from '../TopicActionForm/TopicActionForm.slice'
import Button from '../Button/Button'
import Input from '../Input/Input'
import { RootState } from '../../store'

interface TopicTitleEditProps extends ConnectedProps<typeof connector> {}

interface TopicTitleEditState {
  title: string
}

class TopicTitleEdit
  extends Component<TopicTitleEditProps, TopicTitleEditState> {
  initialState: TopicTitleEditState = {
    title: ''
  }

  constructor (props: TopicTitleEditProps) {
    super(props)
    this.state = this.initialState
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
  }

  handleInputChange (name: string, value: string) {
    if (name === 'title') this.setState({ title: value })
  }

  handleEditClick () {
    const { title } = this.state
    const { activeTopicId } = this.props
    if (!title || !activeTopicId) return
    const payload = { id: activeTopicId, title }
    this.props.updateTopicTitle(payload)
    this.props.toggleActiveForm('topicTitleEdit')
  }

  render () {
    return (
      <Fragment>
        <Input
          name='title'
          value={this.state.title}
          placeholder='Title'
          onChange={this.handleInputChange} />
        <Button
          text="Update"
          onClick={this.handleEditClick} />
      </Fragment>
    )
  }
}

const mapState = (state: RootState) => ({
  activeTopicId: state.topics.activeId
})

const mapDispatch = { updateTopicTitle, toggleActiveForm }

const connector = connect(mapState, mapDispatch)

export default connector(TopicTitleEdit)
