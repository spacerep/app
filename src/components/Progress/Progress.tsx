import React, { Component } from 'react'
import style from './Progress.style'

interface ProgressProps {
  total: number
  completed: number
}

export default class Progress extends Component<ProgressProps> {
  get barStyle () {
    const { total, completed } = this.props
    const percentage = (completed / total) * 100
    const width = `${percentage}%`
    return { width }
  }

  render () {
    return (
      <div className={style.progress}>
        <div
          className={style.bar}
          style={this.barStyle} />
      </div>
    )
  }
}
