import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { createTopic } from '../Topics/Topics.slice'
import Button from '../Button/Button'
import Input from '../Input/Input'
import style from './TopicAdd.style'

interface TopicAddProps extends ConnectedProps<typeof connector> {}

interface TopicAddState {
  title: string
}

class TopicAdd extends Component<TopicAddProps, TopicAddState> {
  constructor (props: TopicAddProps) {
    super(props)
    this.state = {
      title: ''
    }
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)
  }

  resetTitle () {
    this.setState({ title: '' })
  }

  handleTitleChange (name: string, title: string) {
    this.setState({ title })
  }

  handleAddClick () {
    this.props.createTopic(this.state.title)
    this.resetTitle()
  }

  render () {
    return (
      <div className={style.topicAdd}>
        <div className={style.input}>
          <Input
            name='title'
            value={this.state.title}
            placeholder='Title'
            onChange={this.handleTitleChange} />
        </div>
        <div className={style.button}>
          <Button
            text="Add topic"
            onClick={this.handleAddClick} />
        </div>
      </div>
    )
  }
}

const mapDispatch = { createTopic }

const connector = connect(null, mapDispatch)

export default connector(TopicAdd)
