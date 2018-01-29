import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {pick, keys} from 'lodash'

import ContentEditable from '../common/ContentEditable'

import Sentence from './Sentence'

const DivSentences = styled.div`
  width: ${props => `${props.width}px`};
`
const DivJan = styled.div`
  border: 1px solid lightgray;
  width: 95%;
  font-size: ${props => props.fontSize};
  box-sizing:border-box;
`

class Sentences extends Component{
  constructor (props){
    super(props)
    this.getHeight = this.getHeight.bind(this)
    this.onDownChange = this.onDownChange.bind(this)
    this.onUpChange = this.onUpChange.bind(this)
    this.onFocus = this.onFocus.bind(this)
  }
  static propTypes = {
    id: PropTypes.number,
    jaHtml: PropTypes.string,
    jaHeight: PropTypes.number,
    upJaSize: PropTypes.string,
    downJaSize: PropTypes.string,
    senWidth: PropTypes.number,
    updateNote: PropTypes.func,
    setCurSegment: PropTypes.func,
    setCurComponent: PropTypes.func,
    updateJaInputing: PropTypes.func.isRequired,
    ...Sentence.propTypes,
  }

  getHeight (){
    return this.divSentences.offsetHeight
  }
  onUpChange (){
    const {id, updateNote} = this.props

    updateNote({pattern: 'ja', id, jaHeight: this.upJaHtml.offsetHeight, jaHtml: this.upJaHtml.innerHTML})
  }
  onDownChange (){
    const {id, updateNote} = this.props

    updateNote({pattern: 'ja', id, jaHeight: this.downJaHtml.offsetHeight, jaHtml: this.downJaHtml.innerHTML})
  }
  onUpJaFocus = () => {
    const {updateJaInputing} = this.props
    updateJaInputing(true)
  }
  onUpJaBlur = () => {
    const {updateJaInputing} = this.props
    updateJaInputing(false)
  }
  onUpPaste = (e) => {
    e.preventDefault()
    var text
    var range

    if (window.clipboardData) {
      text = window.clipboardData.getData('text')
    } else {
      text = e.clipboardData.getData('text/plain')
    }

    if (document.selection) {
    // 〜Internet Explorer 10
      range = document.selection.createRange()
      range.text = text
    } else {
    // Internet Explorer 11/Chrome/Firefox
      var selection = window.getSelection()
      range = selection.getRangeAt(0)
      var node = document.createTextNode(text)
      range.insertNode(node)
      range.setStartAfter(node)
      range.setEndAfter(node)
      selection.removeAllRanges()
      selection.addRange(range)
    }

    const {updateNote, id} = this.props
    updateNote({pattern: 'ja', id, jaHeight: this.upJaHtml.offsetHeight, jaHtml: this.upJaHtml.innerHTML})
  }
  onDownJaFocus = () => {
    const {updateJaInputing} = this.props
    updateJaInputing(true)
  }
  onDownJaBlur = () => {
    const {updateJaInputing} = this.props
    updateJaInputing(false)
  }
  onDownPaste = (e) => {
    e.preventDefault()
    var text
    var range

    if (window.clipboardData) {
      text = window.clipboardData.getData('text')
    } else {
      text = e.clipboardData.getData('text/plain')
    }

    if (document.selection) {
    // 〜Internet Explorer 10
      range = document.selection.createRange()
      range.text = text
    } else {
    // Internet Explorer 11/Chrome/Firefox
      var selection = window.getSelection()
      range = selection.getRangeAt(0)
      var node = document.createTextNode(text)
      range.insertNode(node)
      range.setStartAfter(node)
      range.setEndAfter(node)
      selection.removeAllRanges()
      selection.addRange(range)
    }

    const {updateNote, id} = this.props
    updateNote({pattern: 'ja', id, jaHeight: this.downJaHtml.offsetHeight, jaHtml: this.downJaHtml.innerHTML})
  }
  onFocus (){
    const {id, setCurSegment, setCurComponent} = this.props
    setCurSegment(id)
    setCurComponent(this.sentence)
  }
  componentDidMount (){
    const {id, setCurSegment, setCurComponent} = this.props

    setCurSegment(id)
    setCurComponent(this.sentence)
  }
  componentWillReceiveProps (nextProps) {
    const {jaHtml} = nextProps

    if (this.upJaHtml) {
      if (jaHtml != this.upJaHtml.innerHTML) {
        this.upJaHtml.innerHTML = jaHtml
      }
    }
    else if (this.downJaHtml) {
      if (jaHtml != this.downJaHtml.innerHTML) {
        this.downJaHtml.innerHTML = jaHtml
      }
    }
  }
  componentDidUpdate () {
    const {updateNote, id, jaHeight, jaHtml} = this.props

    if (this.upJaHtml) {
      if (jaHtml != this.upJaHtml.innerHTML) {
        this.upJaHtml.innerHTML = jaHtml
      }

      if (jaHeight != this.upJaHtml.offsetHeight) {
        updateNote({pattern: 'ja', id, jaHeight: this.upJaHtml.offsetHeight, jaHtml: this.upJaHtml.innerHTML})
      }
    }
    else if (this.downJaHtml) {
      if (jaHtml != this.downJaHtml.innerHTML) {
        this.downJaHtml.innerHTML = jaHtml
      }

      if (jaHeight != this.downJaHtml.offsetHeight) {
        updateNote({pattern: 'ja', id, jaHeight: this.downJaHtml.offsetHeight, jaHtml: this.downJaHtml.innerHTML})
      }
    }
    else {
      if (jaHeight !== 0) {
        updateNote({pattern: 'ja', id, jaHeight: 0, jaHtml: ''})
      }
    }
  }

  render (){
    const {id, senWidth, html, jaHtml, upJaSize, downJaSize} = this.props

    return (
      <DivSentences
        onFocus={this.onFocus}
        onKeyDown={this.keyDown}
        innerRef={ref => this.divSentences = ref}
        width={senWidth}>
        {upJaSize != 'オフ' &&
          <DivJan
            contentEditable={true}
            id={`up${id}`}
            value={jaHtml}
            innerRef={ref => this.upJaHtml = ref}
            fontSize={upJaSize}
            spellCheck={false}
            onInput={this.onUpChange}
            onFocus={this.onUpJaFocus}
            onBlur={this.onUpJaBlur}
            onPaste={this.onUpPaste}
          />
        }
        <Sentence
          ref={ref => this.sentence = ref}
          html={html}
          {...pick(this.props, keys(Sentence.propTypes))}
        />
        {downJaSize != 'オフ' &&
          <DivJan
            contentEditable={true}
            id={`down${id}`}
            value={jaHtml}
            innerRef={ref => this.downJaHtml = ref}
            fontSize={downJaSize}
            spellCheck={false}
            onInput={this.onDownChange}
            onFocus={this.onDownJaFocus}
            onBlur={this.onDownJaBlur}
            onPaste={this.onDownPaste}
          />
        }
      </DivSentences>
    )
  }
}

export default Sentences