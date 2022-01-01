import React, { Component, MouseEvent } from 'react'
import style from './Button.style'

interface ButtonProps {
  text: string
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

export default class Button extends Component<ButtonProps> {
  render () {
    return (
      <button
        className={style.button}
        onClick={this.props.onClick}>
        {this.props.text}
      </button>
    )
  }
}
