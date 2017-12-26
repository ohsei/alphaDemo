import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ContentEditable from 'react-contenteditable'

import {getBrowserType} from '../../../../../../../../utils/browserType'
import FourLine from '../../../../../../common/FourLine'

const browserType = getBrowserType()

const TextArea = styled(ContentEditable)`
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
  constructor (props){
    super(props)
    this.state = {
      imeMode: 'inactive',
      textAreaHeight: 0,
    }
  }

  static propTypes = {
    note: PropTypes.array,
    segmentId: PropTypes.number,
    offsetHeight: PropTypes.number,
    setting: PropTypes.object,
  }

  render (){
    const {note, segmentId, setting} = this.props
    let height = 0
    let segmentHeight = 96
    let fontSize = 80
    let enSize = 1
    if (setting.enSize === '１倍') {
      if (setting.interval === '1.5') {
        segmentHeight = 120
      }
    }
    else if (setting.enSize === '２倍') {
      enSize = 2
      fontSize = 80 * 2
      segmentHeight = 192
    }
    else if (setting.enSize === '４倍') {
      enSize = 4
      fontSize = 80 * 4
      segmentHeight = 384
      if (setting.interval === '1.5') {
        segmentHeight = 480
      }
    }

    if (browserType == 'ie'){
      height = (note[segmentId].offsetHeight / segmentHeight).toFixed(0)
    }
    else {
      height = (note[segmentId].offsetHeight / segmentHeight).toFixed(0)
    }

    let i = 0
    let marginTopArray = []

    for (i = 0;i < height;i++){
      marginTopArray.push(0)
    }
    let senList = null

    if (marginTopArray){
      senList = marginTopArray.map((obj, i) => {
        let interval = 0
        let down = 0

        if (setting.interval == 1.5) {
          interval = 8 * 1.5
          down = interval
        }

        let top = 23 + interval
        if (i != 0)
        {
          top = 23 + interval + interval
        }
       return  <FourLine  key={i} interval={setting.interval} lineNum={setting.lineNum} borderColor={setting.lineColor} enSize={enSize} isPrint={true} />
      })
    }
  
    return (
      <div style={{display: 'flex'}}>
        <DivSen>
          <div ref={ref => this.senList = ref}>{senList}</div>
          <TextArea
            html={note[segmentId].html}
            disabled={true}
            spellCheck={false}
            style={{imeMode: this.state.imeMode}}
            innerRef={(ref) => {this.inputText = ref}}
            fontFamily={browserType == 'ie' ? 'MyFamilyIE' : 'MyFamilyCHROME'}
            fontSize={`${fontSize}px`}
            lineHeight={setting.interval}
          />
        </DivSen>
      </div>
    )
  }
}

export default Sentence