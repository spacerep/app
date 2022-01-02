import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { toggle } from './TopicAdd/TopicAdd.slice'
import Icon from './Icon/Icon'

interface TopicAddToggleProps extends ConnectedProps<typeof connector> {}

class TopicAddToggle extends Component<TopicAddToggleProps> {
  constructor (props: TopicAddToggleProps) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.topicAddToggle()
  }

  render () {
    return (
      <Icon
        name='add'
        size='medium'
        onClick={this.handleClick} />
    )
  }
}

const mapDispatch = { topicAddToggle: toggle }

const connector = connect(null, mapDispatch)

export default connector(TopicAddToggle)
