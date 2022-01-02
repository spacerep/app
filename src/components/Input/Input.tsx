import React, { ChangeEvent, Component } from 'react'
import style from './Input.style'

interface InputProps {
  name: string
  value: string
  placeholder?: string
  onChange: (name: string, value: string) => void
}

export default class Input extends Component<InputProps> {
  constructor (props: InputProps) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    this.props.onChange(name, value)
  }

  render () {
    return (
      <input
        className={style.input}
        name={this.props.name}
        value={this.props.value}
        placeholder={this.props.placeholder}
        onChange={this.handleChange} />
    )
  }
}
