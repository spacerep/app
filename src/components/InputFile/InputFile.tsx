import React, { ChangeEvent, Component, createRef, RefObject } from 'react'
import style from './InputFile.style'

interface InputFileProps {
  name: string
  filename: string
  accept: string
  placeholder?: string
  className?: string
  onChange: (name: string, file: File | null, filename: string) => void
}

export default class InputFile extends Component<InputFileProps> {
  inputRef: RefObject<HTMLInputElement>

  constructor (props: any) {
    super(props)
    this.inputRef = createRef()
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  get placeholder () {
    const placeholder = this.props.filename || this.props.placeholder
    return <div className={style.placeholder}>{placeholder}</div>
  }

  get className () {
    return `${style.inputFile} ${this.props.className}`
  }

  handleClick () {
    const input = this.inputRef.current
    input && input.click()
    this.setState({ file: null })
  }

  resetValue (event: ChangeEvent<HTMLInputElement>) {
    event.target.value = ''
  }

  async handleChange (event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target
    const file = files && files[0]
    const filename = file ? file.name : ''
    this.props.onChange(this.props.name, file, filename)
    this.setState({ filename })
    this.resetValue(event)
  }

  render () {
    return (
      <div
        className={this.className}
        onClick={this.handleClick}>
        <input
          className={style.hiddenInput}
          name={this.props.name}
          type="file"
          accept={this.props.accept}
          ref={this.inputRef}
          onChange={this.handleChange} />
        {this.placeholder}
      </div>
    )
  }
}
