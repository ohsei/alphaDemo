import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {pick, keys} from 'lodash'

import LabNum from '../common/LabNum'
import Canvas from '../common/Canvas'

const SentenceArea = styled.div`
  display: flex;
  width: 100%;
`
const DivCanvas = styled.div`
  width: 100%;
  display: flex;
  direction: row;
  justify-content: space-around;
  margin: 0px auto;
`

class ImgOnly extends Component{
  static propTypes = {
    width: PropTypes.number,
    setting: PropTypes.object,
    id: PropTypes.any,
    segmentHeight: PropTypes.number,
    updateNote: PropTypes.func.isRequired,
    ...Canvas.propTypes,
  }

  render (){
    const { setting, id, width } = this.props
    return (
      <SentenceArea
        innerRef={ref => this.sentencearea = ref} >
        <LabNum lineNoType={parseInt(setting.lineNos)} id={id} />
        <DivCanvas>
          <Canvas
            imgMaxWidth={width - 50}
            canvasWidth={width - 50}
            imgMaxHeight={800}
            {...pick(this.props, keys(Canvas.propTypes))}
          />
        </DivCanvas>
      </SentenceArea>
    )
  }
}

export default ImgOnly