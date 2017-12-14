import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ContentEditable from 'react-contenteditable'

import {getBrowserType} from '../../../../../../../../utils/browserType'
import FourLine from '../../common/FourLine'

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
  height: ${props => `${props.height}px`}
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
    pageId: PropTypes.number,
    segmentId: PropTypes.number,
    offsetHeight: PropTypes.number,
    setting: PropTypes.object,
  }
  componentDidMount (){
    this.inputText.htmlEl.style.backgroundImage = `url(${require('../../../../../../../resources/img/4line.png')})`
  }
  componentWillReceiveProps (nextProps) {
    const {setting} = nextProps
    const interval = setting.interval
    const lineNum = setting.lineNum
    const lineColor = setting.lineColor
    let url = `url(${require('../../../../../../../resources/img/4line.png')})`

    if (interval == 1.5) {
      if (lineNum == 4) {
        if (lineColor == 'gray') {
          url = `url(${require('../../../../../../../resources/img/4line_1.5.png')})`
        }
        else if (lineColor == 'lightgray') {
          url = `url(${require('../../../../../../../resources/img/4line_1.5_lightgray.png')})`
        }
        else if (lineColor == 'black') {
          url = `url(${require('../../../../../../../resources/img/4line_1.5_black.png')})`
        }
      }
      else if (lineNum == 2) {
        if (lineColor == 'gray') {
          url = `url(${require('../../../../../../../resources/img/2line_1.5.png')})`
        }
        else if (lineColor == 'lightgray') {
          url = `url(${require('../../../../../../../resources/img/2line_1.5_lightgray.png')})`
        }
        else if (lineColor == 'black') {
          url = `url(${require('../../../../../../../resources/img/2line_1.5_black.png')})`
        }
      }
    }
    else {
      /* default setting */
      if (lineNum == 4) {
        if (lineColor == 'gray') {
          url = `url(${require('../../../../../../../resources/img/4line.png')})`
        }
        else if (lineColor == 'lightgray') {
          url = `url(${require('../../../../../../../resources/img/4line_lightgray.png')})`
        }
        else if (lineColor == 'black') {
          url = `url(${require('../../../../../../../resources/img/4line_black.png')})`
        }
      }
      else if (lineNum == 2) {
        if (lineColor == 'gray') {
          url = `url(${require('../../../../../../../resources/img/2line.png')})`
        }
        else if (lineColor == 'lightgray') {
          url = `url(${require('../../../../../../../resources/img/2line_lightgray.png')})`
        }
        else if (lineColor == 'black') {
          url = `url(${require('../../../../../../../resources/img/2line_black.png')})`
        }
      }
    }

    this.inputText.htmlEl.style.backgroundImage = url
  }
  render (){
    const {note, segmentId, setting, pageId} = this.props
/*    let height = 0
    let segmentHeight = 96

    if (setting.interval == 1.5) {
      segmentHeight = 120
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
        return <FourLine key={i} marginTop={top} maginDown={down} lineNum={setting.lineNum} borderColor={setting.lineColor} />
      })
    }
*/
    return (
      <div style={{display: 'flex'}}>
        <DivSen>
{/*          <div ref={ref => this.senList = ref}>{senList}</div>*/}
          <TextArea
            height={note[pageId][segmentId].sentenceNum * 96}
            html={note[segmentId].html}
            disabled={true}
            spellCheck={false}
            style={{imeMode: this.state.imeMode}}
            innerRef={(ref) => {this.inputText = ref}}
            fontFamily={browserType == 'ie' ? 'MyFamilyIE' : 'MyFamilyCHROME'}
            fontSize={browserType == 'ie' ? '96px' : '80px'}
            lineHeight={setting.interval}
          />
        </DivSen>
      </div>
    )
  }
}

export default Sentence