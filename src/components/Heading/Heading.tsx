import React, { Component } from 'react'
import style from './Heading.style'

interface HeadingProps {
  text: string
}

export default class Heading extends Component<HeadingProps> {
  render () {
    return (
      <h3 className={style.heading}>
        {this.props.text}
      </h3>
    )
  }
}
