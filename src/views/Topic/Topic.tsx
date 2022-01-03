import React, { Component, Fragment } from 'react'
import TopicHeader from '../../components/TopicHeader/TopicHeader'
import TopicActionForm from '../../components/TopicActionForm/TopicActionForm'

interface TopicProps {}

export default class Topic extends Component<TopicProps> {
  render () {
    return (
      <Fragment>
        <TopicHeader />
        <TopicActionForm />
      </Fragment>
    )
  }
}
