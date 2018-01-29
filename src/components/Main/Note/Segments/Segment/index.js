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
  box-sizing:border-box;
`
const DivInterval = styled.div`
  height: ${props => props.interval};
  background-color: #E2FFF4;
`
const PageBreakLine = styled.div`
  margin-bottom: 25px;
  width: 100%;
  height: 2;
  border: 1px dotted black;
  page-break-after: always;

  @media print{
    border-color: white;
  }
`
const UserPageBreakLine = styled.div`
  margin-bottom: 25px;
  width: 100%;
  height: 2;
  border: 1px dotted #FFAE72;
  page-break-after: always;

  @media print{
    border-color: white;
  }
`

const DrawPageBreakLine = (object) => {
  if (object.isPageBreak) {
    return (
      <div>
        <PageBreakLine />
      </div>
    )
  }
  else if (object.isUserPageBreak) {
    return (
      <div>
        <UserPageBreakLine />
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
    dataUrl: PropTypes.string,
    isPageBreak: PropTypes.bool,
    isUserPageBreak: PropTypes.bool,
    segmentHeight: PropTypes.number,
    width: PropTypes.number,
    title: PropTypes.string,
    name: PropTypes.string,
    updateNote: PropTypes.func.isRequired,
    type: PropTypes.string,
    ...Actions.propTypes,
    ...ImgOnly.propTypes,
    ...TxtImg.propTypes,
    ...ImgTxt.propTypes,
    ...TxtOnly.propTypes,
  }

  componentDidUpdate () {
    const {segmentHeight, updateNote, id} = this.props


    if (segmentHeight != this.segArea.offsetHeight) {
      updateNote({
        pattern: 'segmentHeight',
        id,
        segmentHeight: this.segArea.offsetHeight
      })
    }
  }

  render (){
    const {width, type, dataUrl, isPageBreak, isUserPageBreak} = this.props

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
        <SegArea width={width}  >
          <div ref={ref => this.segArea = ref}>{content}</div>
          <Actions {...pick(this.props, keys(Actions.propTypes))} />
        </SegArea>
        {isPageBreak && <DivInterval interval={'25px'} /> }
        {!isPageBreak && <DivInterval interval={'50px'} /> }
        <DrawPageBreakLine
          isPageBreak={isPageBreak}
          isUserPageBreak={isUserPageBreak}
        />
      </div>
    )
  }
}

export default Segment