import React, { Component } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import style from './Panel.style'

interface PanelProps {}

export default class Panel extends Component<PanelProps> {
  render () {
    return (
      <div className={style.panel}>
        <div className={style.container}>
          <div className={style.sidebar}>
            <Sidebar />
          </div>
          <main className={style.main}>
            {this.props.children}
          </main>
        </div>
      </div>
    )
  }
}
