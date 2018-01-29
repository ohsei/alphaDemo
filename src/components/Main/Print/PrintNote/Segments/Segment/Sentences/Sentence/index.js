
import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import FourLine from '../../../../../../common/FourLine'

/* <<説明>> 
   edgeの場合、背景画像が印刷できないため、4線が背景画像ではなく、FourLineコンポーネントで実装している
   FourLineコンポーネントのロジックは4線作成用application(fourlineMaker)のFourLineコンポーネントと一致している。*/
const TextArea = styled.div`
  margin: 0 0 0 1px;
  width: 95%;
  border: none;
  outline-style: none;
  white-space: pre-line;
  word-wrap: break-word;
  font-family: ${props => props.fontFamily};
  font-size: ${props => props.fontSize};
  z-index: 9;
  position: absolute;
  top: 0;
  left: 0;
  text-align: left;
  letter-spacing: 1.5px;
  line-height: ${props => props.lineHeight};
`

const DivSen = styled.div`
  width: 100%;
  z-index: 0;
  display: block;
  position: relative;
`

class Sentence extends Component{

  static propTypes = {
    note: PropTypes.array,
    segmentId: PropTypes.number,
    setting: PropTypes.object,
  }

  render (){
    const {note, segmentId, setting} = this.props
    let height = 0
    let segmentHeight = 120 * parseFloat(setting.interval) / 1.5
    let fontSize = 80
    let font = 'MyFamilyFont1'

    if (setting.enSize === '1') {
      fontSize = 80 * 2
      segmentHeight = 2 * segmentHeight
    }
    else if (setting.enSize === '2') {
      fontSize = 80 * 4
      segmentHeight = 4 * segmentHeight
    }

    if (setting.enFont === 1) {
      font = 'MyFamilyFont2'
    }

    if (note[segmentId].enHeight == 0 ) {
      height = 1
    }
    else {
      height = (note[segmentId].enHeight / segmentHeight).toFixed(0)
    }

    let i = 0
    let marginTopArray = []

    for (i = 0;i < height;i++){
      marginTopArray.push(0)
    }
    let senList = null

    if (marginTopArray){
      senList = marginTopArray.map((obj, i) => {
        return  <FourLine key={i} interval={parseFloat(setting.interval)} lineNum={setting.lineNum} borderColor={setting.lineColor} enSize={parseInt(setting.enSize)} />
      })
    }

    return (
      <div style={{display: 'flex'}}>
        <DivSen>
          <div ref={ref => this.senList = ref}>{senList}</div>
          <TextArea
            dangerouslySetInnerHTML={{__html: note[segmentId].html}}
            innerRef={(ref) => {this.inputText = ref}}
            fontFamily={font}
            fontSize={`${fontSize}px`}
            lineHeight={setting.interval}
          />
        </DivSen>
      </div>
    )
  }
}

export default Sentence