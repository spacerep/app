import React, { Component } from 'react'
import Icon from '../Icon/Icon'
import Logo from '../Logo/Logo'
import TopicAdd from '../TopicAdd/TopicAdd'
import Topics from '../Topics/Topics'
import style from './Sidebar.style'

export default class Sidebar extends Component {
  handleAddTitleClick () {
    // TODO
  }

  render () {
    return (
      <aside className={style.sidebar}>
        <div className={style.header}>
          <Logo />
          <Icon
            name='add'
            size='medium'
            onClick={this.handleAddTitleClick} />
        </div>
        <div className={style.topicAdd}>
          <TopicAdd />
        </div>
        <div className={style.topics}>
          <Topics />
        </div>
      </aside>
    )
  }
}
