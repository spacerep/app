import React, { Component } from 'react'
import logo from '../../assets/logo.png'
import style from './Logo.style'

export default class Logo extends Component {
  render () {
    return <img
      className={style.logo}
      src={logo}
      alt='Spacerep' />
  }
}
