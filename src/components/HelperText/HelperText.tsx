import React, { Component } from 'react'
import style from './HelperText.style'

interface HelperTextProps {
  text: string
  className?: string
}

export default class HelperText extends Component<HelperTextProps> {
  get className () {
    return `${style.helperText} ${this.props.className}`
  }

  render () {
    return (
      <div className={this.className}>
        {this.props.text}
      </div>
    )
  }
}
