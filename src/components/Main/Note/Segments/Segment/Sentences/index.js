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
    curSegmentNo: PropTypes.number,
    id: PropTypes.number,
    senWidth: PropTypes.number,
    note: PropTypes.array,
    setting: PropTypes.object,
    isPrint: PropTypes.bool,
    updateNote: PropTypes.func,
    tabNodeList: PropTypes.array,
    updateTabNodeList: PropTypes.func.isRequired,
    setCurSegment: PropTypes.func,
    setCurComponent: PropTypes.func,
    isBold: PropTypes.bool,
    isItalic: PropTypes.bool,
    isUnderline: PropTypes.bool,
    updateIsBold: PropTypes.func.isRequired,
    updateIsItalic: PropTypes.func.isRequired,
    updateIsUnderline: PropTypes.func.isRequired,
    updateCurColor: PropTypes.func.isRequired,
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

    updateNote(newNote)
  }

  onDownChange (){
    const {id, updateNote, note} = this.props

    let newNote = note.slice()
    newNote[id].jaHtml = this.downJaHtml.htmlEl.innerHTML

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
  onFocus (){
    const {id, setCurSegment} = this.props
    setCurSegment(id)
 
  }


 
  componentDidMount (){
    const {id, setCurSegment} = this.props
 
    setCurSegment(id)
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
          onBlur={this.onUpJaBlur} />}
        <Sentence
          ref={ref => this.sentence = ref}
          lineNum={setting.lineNum}
          {...pick(this.props, keys(Sentence.propTypes))}
        />
        {setting.downJaSize != 'オフ' && <DivJan id={`down${id}`} html={note[id].jaHtml} innerRef={ref => this.downJaHtml = ref} fontSize={downJaSize} spellCheck={false} disabled={false} onChange={this.onDownChange}
          forceChange={true}
          offForceChange={offForceChange}
          onFocus={this.onDownJaFocus}
          onBlur={this.onDownBlur} />}
      </DivSentences>
    )
  }
}

export default Sentences