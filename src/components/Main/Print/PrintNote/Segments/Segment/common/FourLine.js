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
  margin: 22px 0 0 0;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.borderColor}
`
const DivLineTwo = styled.div`
  width: 95%;
  display: flex;
  margin: 22px 0 0 0;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.lineNum == 2 ? 'white' : props.borderColor};
`

class FourLine extends React.Component{
  static propTypes = {
    marginTop: PropTypes.number,
    lineNum: PropTypes.number,
  }
  render (){
    const {marginTop, lineNum} = this.props
    return (
      <DivSen style={{marginTop: marginTop}}>
        <DivLineTwo lineNum={lineNum} borderColor='gray' />
        <DivLine borderColor='gray' />
        <DivLine borderColor='orange' />
        <DivLineTwo lineNum={lineNum} borderColor='gray' />
      </DivSen>
    )
  }
}

export default FourLine