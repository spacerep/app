import React, { Component } from 'react'
import Button from '../Button/Button'
import Input from '../Input/Input'
import style from './TopicAdd.style'

interface TopicAddProps {}

interface TopicAddState {
  title: string
}

export default class TopicAdd extends Component<TopicAddProps, TopicAddState> {
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
    this.resetTitle()
    // TODO
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
