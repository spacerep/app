import React, { Component } from 'react'
import Button from './Button/Button'
import Input from './Input/Input'

export default class App extends Component {
  render () {
    return (
      <div className='flex'>
        <Input
          name='note'
          value=''
          placeholder='Enter note'
          onChange={() => { console.log('changed') }} />
        <Button
          text='Add note'
          onClick={() => console.log('clicked button')} />
      </div>
    )
  }
}
