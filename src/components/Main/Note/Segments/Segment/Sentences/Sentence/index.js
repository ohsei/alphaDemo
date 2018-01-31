import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import ContentEditable from '../../common/ContentEditable'

const TextArea = styled(ContentEditable)`
  margin: 0 0 1px 1px;
  width: 95%;
  border: none;
  outline-style: none;
  white-space: pre-line;
  word-wrap: break-word;
  font-family: ${props => props.fontFamily};
  font-size: ${props => props.fontSize};
  position: relative;
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
    note: PropTypes.array,
    id: PropTypes.number,
    updateNote: PropTypes.func,
    setting: PropTypes.object,
    isBold: PropTypes.bool,
    isItalic: PropTypes.bool,
    isUnderline: PropTypes.bool,
    curColor: PropTypes.string,
    updateIsBold: PropTypes.func.isRequired,
    updateIsItalic: PropTypes.func.isRequired,
    updateIsUnderline: PropTypes.func.isRequired,
    updateCurColor: PropTypes.func.isRequired,
    forceChange: PropTypes.bool,
    offForceChange: PropTypes.func.isRequired,
    onShowOnlyEnglishAlertDialog: PropTypes.func.isRequired,
    onShowAddSegmentAlertDialog: PropTypes.func.isRequired,
    isOverOnePage: PropTypes.bool,
    overPageId: PropTypes.number,
    updateOverOnePage: PropTypes.func.isRequired,
    isShowOnlyEnglishAlert: PropTypes.bool,
    focusId: PropTypes.number,
    setFocusSegment: PropTypes.func,
  }
  setBold (){
    const {updateNote, note, id} = this.props
    document.execCommand('bold', false)
    let newNote = note.slice()
    newNote[id].html = this.inputText.htmlEl.innerHTML
    newNote[id].enHeight = this.inputText.htmlEl.offsetHeight
    updateNote(newNote)
  }
  setItalic (){
    const {updateNote, note, id} = this.props
    document.execCommand('italic', false)
    let newNote = note.slice()
    newNote[id].html = this.inputText.htmlEl.innerHTML
    newNote[id].enHeight = this.inputText.htmlEl.offsetHeight
    updateNote(newNote)
  }
  setUnderline (){
    const {updateNote, note, id} = this.props
    document.execCommand('underline', false)
    let newNote = note.slice()
    newNote[id].html = this.inputText.htmlEl.innerHTML
    newNote[id].enHeight = this.inputText.htmlEl.offsetHeight
    updateNote(newNote)
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
    const {updateNote, note, id} = this.props
    var r = this.toHex(color.r)
    var g = this.toHex(color.g)
    var b = this.toHex(color.b)
    const newColor = `#${r}${g}${b}`
    this.restoreSelection(this.state.range)
    document.execCommand('foreColor', false,  newColor)
    let newNote = note.slice()
    newNote[id].html = this.inputText.htmlEl.innerHTML
    newNote[id].enHeight = this.inputText.htmlEl.offsetHeight
    updateNote(newNote)
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

    const {updateNote, note, id} = this.props
    let newNote = note.slice()
    newNote[id].html = this.inputText.htmlEl.innerHTML
    newNote[id].enHeight = this.inputText.htmlEl.offsetHeight
    updateNote(newNote)
  }

  onTextAreaBlur (){
    const {updateNote, note, id} = this.props

    if (this.inputText.htmlEl.innerHTML.match(/[^\x01-\x7E]/)){
      let i = 0
      let newText = ''

      while (i < this.inputText.htmlEl.innerHTML.length){
        if (this.inputText.htmlEl.innerHTML[i].match(/[^\x01-\x7E]/)){
          newText = newText + ''
        }
        else {
          newText = newText + this.inputText.htmlEl.innerHTML[i]
        }
        i ++
      }
      this.inputText.htmlEl.innerHTML = newText

      let newNote = note.slice()
      newNote[id].html = this.inputText.htmlEl.innerHTML
      newNote[id].enHeight = this.inputText.htmlEl.offsetHeight
      updateNote(newNote)
    }
  }

  onTextAreaChange (e){
    const {updateNote, note, id} = this.props
    let newNote = note.slice()
    newNote[id].html = e.target.value
    newNote[id].enHeight = this.inputText.htmlEl.offsetHeight
    updateNote(newNote)
  }

  componentDidMount (){
    const {setting} = this.props
    const lineNum = setting.lineNum
    const lineColor = setting.lineColor
    const enSize = setting.enSize
    const interval = setting.interval
    const enFont = setting.enFont
    const fileName = `${lineNum}lines_${lineColor}_${enSize}_${interval}_${enFont}.png`
    let url = `url(${require(`../../../../../../../resources/img/4lines/${fileName}`)})`
    this.inputText.htmlEl.style.backgroundImage = url
  }

  componentWillReceiveProps (nextProps) {
    const {setting} = nextProps

    const lineNum = setting.lineNum
    const lineColor = setting.lineColor
    const enSize = setting.enSize
    const interval = setting.interval
    const enFont = setting.enFont
    const fileName = `${lineNum}lines_${lineColor}_${enSize}_${interval}_${enFont}.png`
    let url = `url(${require(`../../../../../../../resources/img/4lines/${fileName}`)})`
    this.inputText.htmlEl.style.backgroundImage = url
  }
  componentDidUpdate (prevProps) {
    const {updateIsBold, updateIsItalic, updateIsUnderline, updateCurColor,
      isOverOnePage, overPageId, id, updateOverOnePage, updateNote, note,
      setFocusSegment, focusId} = this.props
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

    if (document.activeElement === this.inputText.htmlEl){

      if (curColor !== prevProps.curColor) {
        updateCurColor(curColor)
      }
    }

    if (isOverOnePage && overPageId == id) {
      document.execCommand('delete')
      let newNote = note.slice()
      newNote[id].html = this.inputText.htmlEl.innerHTML
      newNote[id].enHeight = this.inputText.htmlEl.offsetHeight
      updateNote(newNote)
      updateOverOnePage(false)
    }

    if ((note[id].enHeight != this.inputText.htmlEl.offsetHeight))
    {
      let newNote = note.slice()
      newNote[id].enHeight = this.inputText.htmlEl.offsetHeight
      updateNote(newNote)
    }

    if (focusId == id) {
      const node = document.getElementById(`en${id}`)
      node.focus()
      setFocusSegment(-1)
    }
  }
  onCompositionEnd = () => {
    const {note, id, updateNote} = this.props

    if (this.inputText.htmlEl.innerHTML.match(/[^\x01-\x7E]/)){
      let i = 0
      let newText = ''

      while (i < this.inputText.htmlEl.innerHTML.length){
        if (this.inputText.htmlEl.innerHTML[i].match(/[^\x01-\x7E]/)){
          newText = newText + ''
        }
        else {
          newText = newText + this.inputText.htmlEl.innerHTML[i]
        }
        i ++
      }
      this.inputText.htmlEl.innerHTML = newText

      let newNote = note.slice()
      newNote[id].html = this.inputText.htmlEl.innerHTML
      newNote[id].enHeight = this.inputText.htmlEl.offsetHeight
      updateNote(newNote)
    }
  }

  render (){
    const { id, note, setting, forceChange, offForceChange } = this.props
    let fontSize = 80
    let font = 'MyFamilyFont1'

    if (setting.enSize === '1') {
      fontSize = 80 * 2
    }
    else if (setting.enSize === '2' ) {
      fontSize = 80 * 4
    }

    if (setting.enFont === 1) {
      font = 'MyFamilyFont2'
    }

    return (
      <DivSen>
        <TextArea
          id={`en${id}`}
          html={note[id].html}
          disabled={false}
          spellCheck={false}
          innerRef={(ref) => {this.inputText = ref}}
          onChange={this.onTextAreaChange}
          onBlur={this.onTextAreaBlur}
          onKeyUp={this.onKeyUp}
          onKeyDown={this.onKeyDown}
          onMouseUp={this.handelMouseUp}
          onPaste={this.onPaste}
          fontFamily={font}
          fontSize={`${fontSize}px`}
          lineHeight={setting.interval}
          forceChange={forceChange}
          offForceChange={offForceChange}
          onCompositionEnd={this.onCompositionEnd}
        />
      </DivSen>

    )
  }
}

export default Sentence