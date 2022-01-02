import React, { Component } from 'react'
import style from './Heading.style'

interface HeadingProps {
  text: string
  className?: string
}

export default class Heading extends Component<HeadingProps> {
  get className () {
    return `${style.heading} ${this.props.className}`
  }

  render () {
    return (
      <h3 className={this.className}>
        {this.props.text}
      </h3>
    )
  }
}
