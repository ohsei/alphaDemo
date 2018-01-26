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
  updateHeight = () => {
    const {updateNote, note, id} = this.props
    const segmentHeight = this.sentencearea.offsetHeight

    if (note[id].segmentHeight != segmentHeight) {
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
      if (imgMaxWidth > (note[id].imgWidth + 40)) {
        senWidth = width - 50 - note[id].imgWidth - 40
      }
    }

    return (
      <SentenceArea
        innerRef={ref => this.sentencearea = ref}
        width={width}
        onKeyDown={this.onKeyDown} >
        <LabNum lineNoType={setting.lineNos} id={id} />
        <Sentences
          senWidth={senWidth}
          ref={(ref) => {this.sentences = ref}}
          {...pick(this.props, keys(Sentences.propTypes))}
        />
        <Canvas
          imgMaxWidth={imgMaxWidth}
          imgMaxHeight={800}
          canvasWidth={note[id].imgWidth == 0 ? imgMaxWidth : note[id].imgWidth + 40}
          updateHeight={this.updateHeight}
          enHeight={note[id].enHeight}
          jaHeight={note[id].jaHeight}
          dataUrl={note[id].dataUrl}
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
  id: PropTypes.any,
  updateNote: PropTypes.func.isRequired,
  ...Sentences.propTypes,
}

export default TxtImgSeg