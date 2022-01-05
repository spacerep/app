import React, { Component } from 'react'
import style from './Topic.style'
import TopicHeader from '../../components/TopicHeader/TopicHeader'
import TopicActionForm from '../../components/TopicActionForm/TopicActionForm'
import Notes from '../../components/Notes/Notes'

interface TopicProps {}

export default class Topic extends Component<TopicProps> {
  render () {
    return (
      <div className={style.topic}>
        <div className={style.header}>
          <TopicHeader />
        </div>
        <div className={style.actionForm}>
          <TopicActionForm />
        </div>
        <div className={style.notes}>
          <Notes />
        </div>
      </div>
    )
  }
}
