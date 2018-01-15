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

class TxtImg extends Component{
  render (){
    const {note, segmentId, width, setting} = this.props
    return (
      <SentenceArea
        width={width}
        onClick={this.setCurSegment} >
        <LabNum lineNoType={setting.lineNos} id={segmentId} />
        <Sentences
          senWidth={width - 50 - note[segmentId].imgWidth - 40}
          note={note}
          segmentId={segmentId}
          ref={(ref) => {this.divSegWithJan = ref}}
          setting={setting}
        />
        <Canvas
          id={segmentId}
          canvasWidth={note[segmentId].imgWidth + 40}
          {...pick(this.props, keys(Canvas.propTypes))}
        />
      </SentenceArea>
    )
  }
}

TxtImg.propTypes = {
  note: PropTypes.array,
  width: PropTypes.number,
  editSegments: PropTypes.any,
  jaSentence: PropTypes.any,
  setting: PropTypes.any,
  curSegmentNo: PropTypes.any,
  offsetHeight: PropTypes.any,
  isPageBreak: PropTypes.any,
  updateLoadedArray: PropTypes.func.isRequired,
  noteId: PropTypes.number,
  segmentId: PropTypes.number,
  loadedArray: PropTypes.array,
}

export default TxtImg