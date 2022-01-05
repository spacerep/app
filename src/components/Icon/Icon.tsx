import React, { Component, MouseEvent } from 'react'

export type IconSize = 'regular' | 'medium'
type IconType = 'line' | 'fill'
type IconColor = 'tertiary' | 'theme'

type SizeStyle = Record<IconSize, string>

interface IconProps {
  name: string
  size: IconSize
  type?: IconType
  color?: IconColor
  onClick?: (event: MouseEvent) => void
}

export default class Icon extends Component<IconProps> {
  sizeStyles: SizeStyle = {
    regular: 'text-base',
    medium: 'text-lg'
  }

  constructor (props: IconProps) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  get style () {
    const { name, color, type, onClick } = this.props
    const size = this.sizeStyles[this.props.size]
    const cursor = onClick && 'cursor-pointer'
    const iconType: IconType = type || 'line'
    const iconColor = `text-${color || 'tertiary'}`
    const icon = `ri-${name}-${iconType}`
    return `${icon} ${size} ${cursor} ${iconColor}`
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
