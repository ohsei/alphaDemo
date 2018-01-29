import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {getBrowserType} from '../../../../../../../utils/browserType'
import FourLine from '../../../../../Print/PrintNote/Segments/Segment/common/FourLine'

const TextArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: 0 0 1px 1px;
  width: 95%;
  border: none;
  outline-style: none;
  white-space: pre-line;
  word-wrap: break-word;
  font-family: ${props => props.fontFamily};
  font-size: ${props => props.fontSize};
  z-index: 9;
  letter-spacing: 1.5px;
  color: black;
  line-height: ${props => props.lineHeight};
`
const DivSen = styled.div`
  width: 100%;
  z-index: 0;
  display: block;
  position: relative;
`

class Sentence extends Component{
  constructor (props){
    super(props)
    this.state = {
      range: null,
    }
    this.onKeyUp = this.onKeyUp.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onTextAreaChange = this.onTextAreaChange.bind(this)
    this.onTextAreaBlur = this.onTextAreaBlur.bind(this)
    this.onPaste = this.onPaste.bind(this)
    this.setBold = this.setBold.bind(this)
    this.setColor = this.setColor.bind(this)
    this.setItalic = this.setItalic.bind(this)
    this.setUnderline =  this.setUnderline.bind(this)
    this.saveSelection = this.saveSelection.bind(this)
    this.restoreSelection = this.restoreSelection.bind(this)
    this.handelMouseUp = this.handelMouseUp.bind(this)
  }

  static propTypes = {
    id: PropTypes.number,
    html: PropTypes.string,
    font: PropTypes.string,
    enSize: PropTypes.number,
    interval: PropTypes.number,
    lineNum: PropTypes.number,
    lineColor: PropTypes.string,
    enHeight: PropTypes.number,
    updateNote: PropTypes.func.isRequired,
    isBold: PropTypes.bool,
    isItalic: PropTypes.bool,
    isUnderline: PropTypes.bool,
    curColor: PropTypes.string,
    updateIsBold: PropTypes.func.isRequired,
    updateIsItalic: PropTypes.func.isRequired,
    updateIsUnderline: PropTypes.func.isRequired,
    updateCurColor: PropTypes.func.isRequired,
  }
  updateEn = () => {
    const {updateNote, id} = this.props
    updateNote({
      pattern: 'en',
      id,
      html: this.inputText.innerHTML,
      enHeight: this.inputText.offsetHeight})
  }
  setBold (){
    document.execCommand('bold', false)
    this.updateEn()
  }
  setItalic (){
    document.execCommand('italic', false)
    this.updateEn()
  }
  setUnderline (){
    document.execCommand('underline', false)
    this.updateEn()
  }
  saveSelection () {
    if (window.getSelection) {
      var sel = window.getSelection()

      if (sel.getRangeAt && sel.rangeCount) {
        return sel.getRangeAt(0)
      }
    } else if (document.selection && document.selection.createRange) {
      return document.selection.createRange()
    }
    return null
  }

  restoreSelection (range) {
    if (range) {
      if (window.getSelection) {
        var sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
      } else if (document.selection && range.select) {
        range.select()
      }
    }
  }

  toHex = (number) => {
    if ( number.toString(16) < 10 ) {
      return `0${number.toString(16)}`
    }
    else {
      return number.toString(16)
    }
  }

  setColor (color){
    var r = this.toHex(color.r)
    var g = this.toHex(color.g)
    var b = this.toHex(color.b)
    const newColor = `#${r}${g}${b}`
    this.restoreSelection(this.state.range)
    document.execCommand('foreColor', false,  newColor)
    this.updateEn()
  }
  handelMouseUp () {
    this.setState({range: this.saveSelection()})
  }
  onKeyUp (){
    this.setState({range: this.saveSelection()})
  }
  onKeyDown (event){
    if (event.keyCode === 229) {
      event.preventDefault()
    }
  }
  onPaste (e){
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

    this.updateEn()
  }

  onTextAreaBlur (){
    if (this.inputText.innerHTML.match(/[^\x01-\x7E]/)){
      let i = 0
      let newText = ''

      while (i < this.inputText.innerHTML.length){
        if (this.inputText.innerHTML[i].match(/[^\x01-\x7E]/)){
          newText = newText + ''
        }
        else {
          newText = newText + this.inputText.innerHTML[i]
        }
        i ++
      }
      this.inputText.innerHTML = newText

      this.updateEn()
    }
  }

  onTextAreaChange (){
    this.updateEn()
  }

  componentDidMount (){
/*    const {lineNum, lineColor, enSize, interval} = this.props
    const fileName = `${lineNum}lines_${lineColor}_${enSize}_${interval}.png`
    let url = `url(${require(`../../../../../../../resources/img/4lines/${fileName}`)})`
    this.inputText.style.backgroundImage = url*/
  }
  componentWillReceiveProps (nextProps) {
   const {lineNum, lineColor, enSize, interval, html} = nextProps
/*    const fileName = `${lineNum}lines_${lineColor}_${enSize}_${interval}.png`
    let url = `url(${require(`../../../../../../../resources/img/4lines/${fileName}`)})`
    this.inputText.style.backgroundImage = url*/

    if (html != this.inputText.innerHTML) {
      this.inputText.innerHTML = html
    }
  }
  componentDidUpdate (prevProps) {
    const {updateIsBold, updateIsItalic, updateIsUnderline, updateCurColor, enHeight} = this.props
    const isBold = document.queryCommandState('bold')
    const isItalic = document.queryCommandState('italic')
    const isUnderline = document.queryCommandState('underline')
    const curColor = document.queryCommandValue('foreColor')

    if (isBold !== prevProps.isBold) {
      updateIsBold(isBold)
    }

    if (isItalic !== prevProps.isItalic) {
      updateIsItalic(isItalic)
    }

    if (isUnderline !== prevProps.isUnderline) {
      updateIsUnderline(isUnderline)
    }

    if (document.activeElement === this.inputText){

      if (curColor !== prevProps.curColor) {
        updateCurColor(curColor)
      }
    }

    if (enHeight != this.inputText.offsetHeight)
    {
      this.updateEn()
    }
  }
  onCompositionEnd = () => {

    if (this.inputText.innerHTML.match(/[^\x01-\x7E]/)){
      let i = 0
      let newText = ''

      while (i < this.inputText.innerHTML.length){
        if (this.inputText.innerHTML[i].match(/[^\x01-\x7E]/)){
          newText = newText + ''
        }
        else {
          newText = newText + this.inputText.innerHTML[i]
        }
        i ++
      }
      this.inputText.innerHTML = newText

      this.updateEn()
    }
  }

  fourLineList = () => {
    const {interval, enHeight, enSize, lineNum, lineColor} = this.props
    const list = []

    let height = 0
    let segmentHeight = 120 * parseFloat(interval) / 1.5

    if (enSize === 1) {
      segmentHeight = 2 * segmentHeight
    }
    else if (enSize === 2) {
      segmentHeight = 4 * segmentHeight
    }

    if (enHeight == 0 ) {
      height = 1
    }
    else {
      height = (enHeight / segmentHeight).toFixed(0)
    }

    for (let i = 0; i < height; i ++) {
      list.push(<FourLine key={i} interval={parseFloat(interval)} lineNum={lineNum} borderColor={lineColor} enSize={enSize} isPrint={true} />)
    }

    return list

  }
  render (){
    const { id, html, enSize, font, interval} = this.props
    let fontSize = 80

    if (enSize === 1) {
      fontSize = 80 * 2
    }
    else if (enSize === 2 ) {
      fontSize = 80 * 4
    }


    return (
      <DivSen>
        <div>{this.fourLineList()}</div>
        <TextArea
          id={`en${id}`}
          contentEditable={true}
          value={html}
          disabled={false}
          spellCheck={false}
          innerRef={(ref) => {this.inputText = ref}}
          onChange={getBrowserType() === 'edge' ? this.onTextAreaChange : null}
          onInput={getBrowserType() === 'chrome' ? this.onTextAreaChange : null}
          onBlur={this.onTextAreaBlur}
          onKeyUp={this.onKeyUp}
          onKeyDown={this.onKeyDown}
          onMouseUp={this.handelMouseUp}
          onPaste={this.onPaste}
          fontFamily={font}
          fontSize={`${fontSize}px`}
          lineHeight={interval}
          onCompositionEnd={this.onCompositionEnd}
        />
      </DivSen>

    )
  }
}

export default Sentence