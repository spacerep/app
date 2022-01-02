import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../store'
import Logo from '../Logo/Logo'
import TopicAdd from '../TopicAdd/TopicAdd'
import TopicAddToggle from '../TopicAddToggle'
import Topics from '../Topics/Topics'
import style from './Sidebar.style'

interface SidebarProps extends ConnectedProps<typeof connector> {}

class Sidebar extends Component<SidebarProps> {
  get topicAdd () {
    return this.props.opened &&
      <div className={style.topicAdd}>
        <TopicAdd />
      </div>
  }

  render () {
    return (
      <aside className={style.sidebar}>
        <div className={style.header}>
          <Logo />
          <TopicAddToggle />
        </div>
        {this.topicAdd}
        <div className={style.topics}>
          <Topics />
        </div>
      </aside>
    )
  }
}

const mapState = (state: RootState) => ({
  opened: state.topicAdd.opened
})

const connector = connect(mapState)

export default connector(Sidebar)
