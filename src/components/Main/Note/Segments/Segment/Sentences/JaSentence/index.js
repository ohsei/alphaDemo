import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ContentEditable from '../../common/ContentEditable'

import {getBrowserType} from '../../../../../../../utils/browserType'
import FourLine from '../../common/FourLine'

const browserType = getBrowserType()

const TextArea = styled(ContentEditable)`
  border: 1px solid lightgray;
  width: 95%;
  font-size: ${props => props.fontSize}
`
const DivSen = styled.div`
  width: 100%;
  z-index: 0;
  display: block;
  position: relative;
`
let isShiftKeyPressed = false
let isNewLine = false
let isCtrlKeyPressed = false

class JaSentence extends Component{
  constructor (props){
    super(props)
    this.state = {
      imeMode: 'inactive',
      range: null,
    }
    this.onTextAreaChange = this.onTextAreaChange.bind(this)
  }

  static propTypes = {
    note: PropTypes.array,
    segmentId: PropTypes.number,
    jaSentenceId: PropTypes.number,
    forceChange: PropTypes.bool,
    jaSize: PropTypes.string,
    offForceChange: PropTypes.func.isRequired,
    updateNote: PropTypes.func.isRequired,
  }

  onTextAreaChange (e){
    const {updateNote, note, segmentId, jaSentenceId} = this.props

    let newNote = note.slice()
    newNote[segmentId].jaHtmls[jaSentenceId].jaHtml = e.target.value
    updateNote(newNote)
  }

  render (){
    const { segmentId, jaSentenceId, note, jaSize, forceChange, offForceChange } = this.props
    console.log(this.props)
    console.log(note[segmentId].jaHtmls[jaSentenceId].jaHtml)
    return (
      <DivSen>
        <TextArea
          html={note[segmentId].jaHtmls[jaSentenceId].jaHtml}
          disabled={false}
          spellCheck={false}
          innerRef={(ref) => {this.inputText = ref}}
          onChange={this.onTextAreaChange}
          fontSize={jaSize}
          forceChange={forceChange}
          offForceChange={offForceChange}
        />
      </DivSen>

    )
  }
}

export default JaSentence