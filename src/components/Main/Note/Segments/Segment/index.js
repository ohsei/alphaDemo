import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {pick, keys} from 'lodash'

import Actions from './common/Actions'
import TxtOnly from './TxtOnly'
import ImgOnly from './ImgOnly'
import ImgTxt from './ImgTxt'
import TxtImg from './TxtImg'


const SegArea = styled.div`
  width: ${props => `${props.width}px`};
  background-color: white;
  border: 2px solid #FFAE72;
`
const DivInterval = styled.div`
  height: ${props => props.interval};
  background-color: #E2FFF4;
`
const PageBreakLine = styled.div`
  margin-bottom: 25px;
  width: 100%;
  height: 2;
  border:1px dotted black;
  page-break-after: always;

  @media print{
    border-color: white;
  }
`

const DrawPageBreakLine = (object) => {
  if (object.isPageBreak == true){
    return (
      <div>
        <PageBreakLine />
      </div>
    )
  }
  else {
    return false
  }
}

class Segment extends Component{
  static propTypes = {
    id: PropTypes.number,
    width: PropTypes.number,
    setting: PropTypes.object,
    curSegmentNo: PropTypes.number,
    delSegment: PropTypes.func,
    title: PropTypes.string,
    name: PropTypes.string,
    note: PropTypes.array,
    updateNote: PropTypes.func.isRequired,
    setCurSegment: PropTypes.func,
    setCurComponent: PropTypes.func,
    isPrint: PropTypes.bool,
    tabNodeList: PropTypes.array,
    isBold: PropTypes.bool,
    isItalic: PropTypes.bool,
    isUnderline: PropTypes.bool,
    updateIsBold: PropTypes.func.isRequired,
    updateIsItalic: PropTypes.func.isRequired,
    updateIsUnderline: PropTypes.func.isRequired,
    updateCurColor: PropTypes.func.isRequired,
    ...Actions.propTypes,
    ...ImgOnly.propTypes,
    ...TxtImg.propTypes,
    ...ImgTxt.propTypes,
    ...TxtOnly.propTypes,
  }

  render (){
    const {id, width, note, title, name} = this.props
    const dataUrl = note[id].dataUrl
    const isPageBreak = note[id].isPageBreak
    const type = note[id].type

    const content = (()  => {
      switch (type) {
      case 'imgOnly':
        return <ImgOnly
          ref={(ref) => {this.imgOnlySeg = ref}}
          dataUrl={dataUrl}
          {...pick(this.props, keys(ImgOnly.propTypes))}
        />

      case 'imgTxt':
        return <ImgTxt
          ref={(ref) => {this.imgTxtSeg = ref}}
          dataUrl={dataUrl}
          {...pick(this.props, keys(ImgTxt.propTypes))}
        />

      case 'txtImg':
        return <TxtImg
          ref={(ref) => {this.txtImgSeg = ref}}
          dataUrl={dataUrl}
          {...pick(this.props, keys(TxtImg.propTypes))}
        />

      default:
        return <TxtOnly
          ref={(ref) => {this.txtOnlySeg = ref}}
          {...pick(this.props, keys(TxtOnly.propTypes))}
        />
      }

    })()
    return (
      <div ref={ref => this.segment = ref}>
        <SegArea width={width}>
          {content}
          <Actions type={type} {...pick(this.props, keys(Actions.propTypes))} />
        </SegArea>
        {isPageBreak && <DivInterval interval={'25px'} /> }
        {!isPageBreak && <DivInterval interval={'50px'} /> }
        <DrawPageBreakLine
          isPageBreak={isPageBreak}
          title={title}
          name={name} />
      </div>
    )
  }
}

export default Segment