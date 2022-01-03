import React, { Component, Fragment } from 'react'
import TopicHeader from '../../components/TopicHeader/TopicHeader'

interface TopicProps{}

export default class Topic extends Component<TopicProps> {
  render () {
    return (
      <Fragment>
        <TopicHeader />
      </Fragment>
    )
  }
}
