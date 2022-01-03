import React, { Component, Fragment } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../store'
import { activeTopic } from '../../components/Topics/Topics.slice'
import TopicHeader from '../../components/TopicHeader/TopicHeader'

interface TopicProps extends ConnectedProps<typeof connector> {}

class Topic extends Component<TopicProps> {
  render () {
    return this.props.activeTopic &&
      <Fragment>
        <TopicHeader
          id={this.props.activeTopic.id}
          title={this.props.activeTopic.title} />
      </Fragment>
  }
}

const mapState = (state: RootState) => ({
  activeTopic: activeTopic(state)
})

const connector = connect(mapState)

export default connector(Topic)
