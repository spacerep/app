import React, { Component } from 'react'
import Heading from '../Heading/Heading'
import style from './TopicForm.style'

interface TopicFormProps {
  heading: string
}

export default class TopicForm extends Component<TopicFormProps> {
  render () {
    return (
      <div className={style.topicForm}>
        <div className={style.form}>
          <Heading text={this.props.heading} />
          {this.props.children}
        </div>
      </div>
    )
  }
}
