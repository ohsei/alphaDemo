import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {pick, keys} from 'lodash'

import Sentences from '../Sentences'
import LabNum from '../common/LabNum'
import Canvas from '../common/Canvas'


const SentenceArea = styled.div`
  display: flex;
  width: 100%;
`

class TxtImgSeg extends Component{
  componentDidUpdate (prevProps) {
    const {updateNote, note, id} = this.props
    const segmentHeight = this.sentencearea.offsetHeight

    if (prevProps.note[id].segmentHeight != segmentHeight){
      let newNote = note.slice()
      newNote[id].segmentHeight = segmentHeight
      updateNote(newNote)
    }
  }
  render (){
    const {id, width, setting, note} = this.props

    const imgMaxWidth = (width - 50) * 0.4
    let senWidth = (width - 50) * 0.6
    if (note[id].imgWidth > 0) {
      if (imgMaxWidth > (note[id].imgWidth + 20)) {
        senWidth = width - 50 - note[id].imgWidth - 20
      }
    }
    
    return (
      <SentenceArea
        innerRef={ref => this.sentencearea = ref}
        width={width}
        onClick={this.setCurSegment} >
        <LabNum lineNoType={setting.lineNos} id={id} />
        <Sentences
          senWidth={senWidth}
          ref={(ref) => {this.sentences = ref}}
          {...pick(this.props, keys(Sentences.propTypes))}
        />
        <Canvas
          imgMaxWidth={imgMaxWidth}
          canvasWidth={note[id].imgWidth + 20}
          {...pick(this.props, keys(Canvas.propTypes))}
        />
      </SentenceArea>
    )
  }
}

TxtImgSeg.propTypes = {
  note: PropTypes.array,
  width: PropTypes.number,
  setting: PropTypes.object,
  setCurSegment: PropTypes.any,
  id: PropTypes.any,
  curSegmentNo: PropTypes.any,
  updateNote: PropTypes.func.isRequired,
  tabNodeList: PropTypes.array,
  updateTabNodeList: PropTypes.func.isRequired,
  setCurComponent: PropTypes.func,
  isBold: PropTypes.bool,
  isItalic: PropTypes.bool,
  isUnderline: PropTypes.bool,
  updateIsBold: PropTypes.func.isRequired,
  updateIsItalic: PropTypes.func.isRequired,
  updateIsUnderline: PropTypes.func.isRequired,
  updateCurColor: PropTypes.func.isRequired,
  ...Sentences.propTypes,
}

export default TxtImgSeg