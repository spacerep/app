import React, { Component } from 'react'
import Panel from './Panel/Panel'
import Topic from '../views/Topic/Topic'

export default class App extends Component {
  render () {
    return (
      <Panel>
        <Topic />
      </Panel>
    )
  }
}
