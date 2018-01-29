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
  static propTypes = {
    segmentHeight: PropTypes.number,
    width: PropTypes.number,
    setting: PropTypes.object,
    id: PropTypes.any,
    updateNote: PropTypes.func.isRequired,
    dataUrl: PropTypes.string,
    imgWidth: PropTypes.number,
    imgHeight: PropTypes.number,
    ...Sentences.propTypes,
    ...Canvas.propTypes,
  }
  render (){
    const {id, width, setting, imgWidth} = this.props

    const imgMaxWidth = (width - 50) * 0.4
    let senWidth = (width - 50) * 0.6

    if (imgWidth > 0) {
      if (imgMaxWidth > (imgWidth + 40)) {
        senWidth = width - 50 - imgWidth - 40
      }
    }

    return (
      <SentenceArea
        innerRef={ref => this.sentencearea = ref}
        width={width}
        onKeyDown={this.onKeyDown} >
        <LabNum lineNoType={parseInt(setting.lineNos)} id={id} />
        <Sentences
          senWidth={senWidth}
          ref={(ref) => {this.sentences = ref}}
          {...pick(this.props, keys(Sentences.propTypes))}
        />
        <Canvas
          imgMaxWidth={imgMaxWidth}
          imgMaxHeight={800}
          canvasWidth={imgWidth == 0 ? imgMaxWidth : imgWidth + 40}
          {...pick(this.props, keys(Canvas.propTypes))}
        />
      </SentenceArea>
    )
  }
}

export default TxtImgSeg