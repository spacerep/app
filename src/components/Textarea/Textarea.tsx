import React, { ChangeEvent, Component } from 'react'
import style from './Textarea.style'

interface TextareaProps {
  name: string
  value: string
  placeholder?: string
  rows?: number
  onChange: (name: string, value: string) => void
}

export default class Textarea extends Component<TextareaProps> {
  constructor (props: TextareaProps) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  get rows () {
    return this.props.rows || 2
  }

  handleChange (event: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target
    this.props.onChange(name, value)
  }

  render () {
    return (
      <textarea
        className={style.textarea}
        name={this.props.name}
        value={this.props.value}
        placeholder={this.props.placeholder}
        rows={this.rows}
        onChange={this.handleChange} />
    )
  }
}
