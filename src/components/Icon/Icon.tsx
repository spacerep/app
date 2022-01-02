import React, { Component, MouseEvent } from 'react'

type IconSize = 'regular' | 'medium'

type SizeStyle = Record<IconSize, string>

interface IconProps {
  name: string
  size: IconSize
  onClick?: (event: MouseEvent) => void
}

export default class Icon extends Component<IconProps> {
  sizeStyle: SizeStyle = {
    regular: 'text-xl',
    medium: 'text-2xl'
  }

  constructor (props: IconProps) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  get style () {
    const size = this.sizeStyle[this.props.size]
    const cursor = this.props.onClick && 'cursor-pointer'
    return `ri-${this.props.name}-line text-tertiary ${size} ${cursor}`
  }

  handleClick (event: MouseEvent) {
    const { onClick } = this.props
    if (onClick) onClick(event)
  }

  render () {
    return (
      <i
        className={this.style}
        onClick={this.handleClick} />
    )
  }
}
