import React, { Component } from 'react'
import { MediaData } from '../../database'
import Heading from '../Heading/Heading'
import Icon from '../Icon/Icon'
import style from './Note.style'

interface NoteProps {
  heading: string | null
  content: string | null
  learned: boolean
  media: MediaData | null
}

export default class Note extends Component<NoteProps> {
  get learned () {
    const { learned } = this.props
    return learned &&
      <div className={style.learned}>
        <Icon
          name='bookmark'
          size='medium'
          type='fill'
          color='theme' />
      </div>
  }

  get heading () {
    const { heading } = this.props
    return heading &&
      <Heading text={heading} />
  }

  get media () {
    const { media, heading } = this.props
    if (!media) return null
    const { type, body } = media
    if (type === 'audio') {
      return (
        <audio
          className={style.media}
          controls>
          <source src={body} />
        </audio>
      )
    } else if (type === 'image') {
      return (
        <img
          className={style.media}
          src={body}
          alt={heading || 'image'} />
      )
    } else if (type === 'video') {
      return (
        <video
          className={style.media}
          controls>
          <source src={body} />
        </video>
      )
    }
  }

  get content () {
    const { content } = this.props
    return content &&
      <p className={style.content}>
        {content}
      </p>
  }

  render () {
    return (
      <div className={style.note}>
        {this.learned}
        <div className={style.wrapper}>
          {this.heading}
          {this.media}
          {this.content}
        </div>
      </div>
    )
  }
}
