import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {pick, keys} from 'lodash'

import LabNum from '../common/LabNum'
import Sentences from '../Sentences'
import {defaultPageHeight, landscapePageHeight} from '../../../../../../utils/const'

const SentenceArea = styled.div`
  display: flex;
  width: ${props => `${props.width}px`};
`

class TxtOnly extends Component{
  constructor (props){
    super(props)
    this.setCurSegment = this.setCurSegment.bind(this)
    this.setBold = this.setBold.bind(this)
    this.setColor = this.setColor.bind(this)
    this.setItalic = this.setItalic.bind(this)
    this.setUnderline =  this.setUnderline.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
  }
  static propTypes = {
    id: PropTypes.number,
    curSegmentNo: PropTypes.number,
    width: PropTypes.number,
    isPrint: PropTypes.bool,
    note: PropTypes.array,
    setCurSegment: PropTypes.func,
    setCurComponent: PropTypes.func,
    setting: PropTypes.object,
    updateNote: PropTypes.func,
    tabNodeList: PropTypes.array,
    updateTabNodeList: PropTypes.func.isRequired,
    isBold: PropTypes.bool,
    isItalic: PropTypes.bool,
    isUnderline: PropTypes.bool,
    updateIsBold: PropTypes.func.isRequired,
    updateIsItalic: PropTypes.func.isRequired,
    updateIsUnderline: PropTypes.func.isRequired,
    updateCurColor: PropTypes.func.isRequired,
    updateOverOnePage: PropTypes.func.isRequired,
    isOverOnePage: PropTypes.bool,
    onForceChange: PropTypes.func.isRequired,
    setOverPageId: PropTypes.func.isRequired,
    overPageId: PropTypes.number,
    ...Sentences.propTypes,
  }

  setBold (){
    this.sentences.setBold()
  }
  setColor (color){
    this.sentences.setColor(color)
  }
  setItalic (){
    this.sentences.setItalic()
  }
  setUnderline (){
    this.sentences.setUnderline()
  }
  setCurSegment (){
    this.props.setCurSegment(this.props.id)
  }

  componentDidUpdate (prevProps) {
    const {updateNote, note, id, onShowAddSegmentAlertDialog, updateOverOnePage, setting, setOverPageId} = this.props
    const segmentHeight = this.sentencearea.offsetHeight

    if (prevProps.note[id].segmentHeight != segmentHeight) {
      let newNote = note.slice()
      newNote[id].segmentHeight = segmentHeight
      updateNote(newNote)
    }
    const pageHeight = setting.layout == 'landscape' ? landscapePageHeight : defaultPageHeight
    
    if (this.sentencearea.offsetHeight > (pageHeight - 75)) {
      onShowAddSegmentAlertDialog(true)
      updateOverOnePage(true)
      setOverPageId(id)
    }
  }

  onKeyDown = (event) => {
   /* const {isOverOnePage} = this.props

    if (isOverOnePage  && event.keyCode !== 8) {
      event.preventDefault()
    }*/
  }
  render (){
    const {id, width, setting} = this.props
    return (
      <SentenceArea
        innerRef={ref => this.sentencearea = ref}
        width={width}
        onClick={this.setCurSegment}
        onKeyDown={this.onKeyDown} >
        <LabNum lineNoType={setting.lineNos} id={id} />
        <Sentences
          ref={ref => this.sentences = ref}
          senWidth={width - 50}
          {...pick(this.props, keys(Sentences.propTypes))} />
      </SentenceArea>
    )
  }
}

export default TxtOnly
