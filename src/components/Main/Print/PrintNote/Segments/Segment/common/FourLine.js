import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const DivSen = styled.div`
  width: 100%;
  z-index: 0;
  display: block;
`
const DivLine = styled.div`
  width: 95%;
  display: flex;
  margin: 23px 0 0 0;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.borderColor};
  border-top: none;
  border-left: none;
  border-right: none;
`
const DivLineTop = styled.div`
  width: 95%;
  display: flex;
  margin: ${props=>props.marginTop} 0 0 0;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.lineNum == 2 ? 'white' : props.borderColor};
  border-top: none;
  border-left: none;
  border-right: none;
`

const DivLineDown = styled.div`
  width: 95%;
  display: flex;
  margin: 23px 0 12px 0;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.lineNum == 2 ? 'white' : props.borderColor};
  border-top: none;
  border-left: none;
  border-right: none;
`

class FourLine extends React.Component{
  static propTypes = {
    marginTop: PropTypes.number,
    marginDown: PropTypes.number,
    lineNum: PropTypes.number,
  }
  render (){
    const {marginTop, marginDown, lineNum, borderColor} = this.props
    return (
      <DivSen>
        <DivLineTop style={{marginTop: marginTop}} lineNum={lineNum} borderColor={borderColor} />
        <DivLine borderColor={borderColor} />
        <DivLine borderColor='orange' />
        <DivLineDown style={{marginDown: marginDown}}lineNum={lineNum} borderColor={borderColor} />
      </DivSen>
    )
  }
}

export default FourLine