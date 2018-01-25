import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {pick, keys} from 'lodash'

import ContentEditable from '../common/ContentEditable'

import Sentence from './Sentence'

const DivSentences = styled.div`
  width: ${props => `${props.width}px`};
`
const DivJan = styled(ContentEditable)`
  border: 1px solid lightgray;
  width: 95%;
  font-size: ${props => props.fontSize}
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
    senWidth: PropTypes.number,
    note: PropTypes.array,
    setting: PropTypes.object,
    updateNote: PropTypes.func,
    setCurSegment: PropTypes.func,
    setCurComponent: PropTypes.func,
    offForceChange: PropTypes.func.isRequired,
    updateJaInputing: PropTypes.func.isRequired,
    ...Sentence.propTypes,
  }

  getHeight (){
    return this.divSentences.offsetHeight
  }
  onUpChange (){
    const {id, updateNote, note} = this.props

    let newNote = note.slice()
    newNote[id].jaHtml = this.upJaHtml.htmlEl.innerHTML
    newNote[id].jaHeight = this.upJaHtml.htmlEl.offsetHeight

    updateNote(newNote)
  }
  onDownChange (){
    const {id, updateNote, note} = this.props

    let newNote = note.slice()
    newNote[id].jaHtml = this.downJaHtml.htmlEl.innerHTML
    newNote[id].jaHeight = this.downJaHtml.htmlEl.offsetHeight

    updateNote(newNote)
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

    const {updateNote, note, id} = this.props
    let newNote = note.slice()
    newNote[id].jaHtml = this.upJaHtml.htmlEl.innerHTML
    newNote[id].jaHeight = this.upJaHtml.htmlEl.offsetHeight
    updateNote(newNote)
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

    const {updateNote, note, id} = this.props
    let newNote = note.slice()
    newNote[id].jaHtml = this.downJaHtml.htmlEl.innerHTML
    newNote[id].jaHeight = this.downJaHtml.htmlEl.offsetHeight
    updateNote(newNote)
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
  componentDidUpdate (prevProps) {
    const {setting, note, updateNote, id} = this.props

    if ((prevProps.setting != setting) )
    {
      let newNote = note.slice()
      
      if (this.upJaHtml) {
        newNote[id].jaHeight = this.upJaHtml.htmlEl.offsetHeight
      }
      else if (this.downJaHtml) {
        newNote[id].jaHeight = this.downJaHtml.htmlEl.offsetHeight
      }
      else {
        newNote[id].jaHeight = 0
      }
      updateNote(newNote)
    }
  }

  render (){
    const {note, id, setting, senWidth, offForceChange} = this.props
    const upJaSize = setting.upJaSize
    const downJaSize = setting.downJaSize

    return (
      <DivSentences
        onFocus={this.onFocus}
        onKeyDown={this.keyDown}
        innerRef={ref => this.divSentences = ref}
        width={senWidth}>
        {setting.upJaSize != 'オフ' && <DivJan id={`up${id}`} html={note[id].jaHtml} innerRef={ref => this.upJaHtml = ref} fontSize={upJaSize} spellCheck={false} disabled={false} onChange={this.onUpChange}
          forceChange={true}
          offForceChange={offForceChange}
          onFocus={this.onUpJaFocus}
          onBlur={this.onUpJaBlur}
          onPaste={this.onUpPaste} />}
        <Sentence
          ref={ref => this.sentence = ref}
          lineNum={setting.lineNum}
          {...pick(this.props, keys(Sentence.propTypes))}
        />
        {setting.downJaSize != 'オフ' && <DivJan id={`down${id}`} html={note[id].jaHtml} innerRef={ref => this.downJaHtml = ref} fontSize={downJaSize} spellCheck={false} disabled={false} onChange={this.onDownChange}
          forceChange={true}
          offForceChange={offForceChange}
          onFocus={this.onDownJaFocus}
          onBlur={this.onDownBlur}
          onPaste={this.onDownPaste}  />}
      </DivSentences>
    )
  }
}

export default Sentences