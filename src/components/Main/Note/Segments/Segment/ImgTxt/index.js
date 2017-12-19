import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {pick, keys} from 'lodash'

import Sentences from '../Sentences'
import LabNum from '../common/LabNum'
import Canvas from '../common/Canvas'


const SentenceArea = styled.div`
  display: flex;
  direction: row;
  width: 100%;
`

class ImgTxt extends Component{
  componentDidUpdate (prevProps) {
    const {updateNote, note, id} = this.props
    const segmentHeight = this.sentencearea.offsetHeight

    if (prevProps.note[id].segmentHeight != segmentHeight){
      let newNote = note.slice()
      newNote[id].segmentHeight = segmentHeight
      updateNote(newNote)
    }

    if (segmentHeight > 1607) {
      alert('1ページを超えたため、印刷レイアウトが崩れる可能性があります。')
    }
  }
  render (){
    const {id, width, setting} = this.props
    return (
      <SentenceArea
        innerRef={ref => this.sentencearea = ref}
        width={width}
        onClick={this.setCurSegment} >
        <LabNum lineNoType={setting.lineNos} id={id} />
        <div>
          <Canvas
            canvasWidth={(width - 50) * 0.4}
            {...pick(this.props, keys(Canvas.propTypes))}
          />
        </div>
        <Sentences
          senWidth={(width - 50) * 0.6}
          ref={(ref) => {this.sentences = ref}}
          {...pick(this.props, keys(Sentences.propTypes))}
        />
      </SentenceArea>
    )
  }
}

ImgTxt.propTypes = {
  width: PropTypes.number,
  note: PropTypes.array,
  setting: PropTypes.object,
  setCurSegment: PropTypes.func,
  setCurComponent: PropTypes.func,
  id: PropTypes.any,
  curSegmentNo: PropTypes.any,
  updateNote: PropTypes.func.isRequired,
  tabNodeList: PropTypes.array,
  updateTabNodeList: PropTypes.func.isRequired,
  isBold: PropTypes.bool,
  isItalic: PropTypes.bool,
  isUnderline: PropTypes.bool,
  updateIsBold: PropTypes.func.isRequired,
  updateIsItalic: PropTypes.func.isRequired,
  updateIsUnderline: PropTypes.func.isRequired,
  updateCurColor: PropTypes.func.isRequired,
  ...Sentences.propTypes,
}

export default ImgTxt