import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const DivSen = styled.div`
  width: 95%;
  z-index: 0;
  display: block;
  padding-bottom: ${props => `${props.padding}px`};
  background-color: white;
`
const DivLine = styled.div`
  width: 100%;
  display: flex;
  padding-top: ${props => `${props.padding}px`};
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.borderColor};
  border-top: none;
  border-left: none;
  border-right: none;
`
const DivLineTop = styled.div`
  width: 100%;
  display: flex;
  padding-top: ${props => `${props.padding}px`};
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.lineNum == 2 ? 'white' : props.borderColor};
  border-top: none;
  border-left: none;
  border-right: none;
`
const DivLineDown = styled.div`
  width: 100%;
  display: flex;
  padding-top: ${props => `${props.padding}px`};
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.lineNum == 2 ? 'white' : props.borderColor};
  border-top: none;
  border-left: none;
  border-right: none;
`

class FourLine2 extends React.Component{
  static propTypes = {
    interval: PropTypes.number,
    lineNum: PropTypes.number,
    borderColor: PropTypes.string,
    enSize: PropTypes.number,
    enFont: PropTypes.number,
  }

  render (){
    const {lineNum, borderColor, enSize, interval} = this.props

    const padding1One = 16
    const padding1Two = 31
    const padding1Three = 22
    const bottomPadding1 = 13
    const topPadding1 = 34
    
    const segmentHeight1 = 120
    const segmentHeight2 = 240
    const segmentHeight4 = 480
    const intervalFloat = parseFloat(interval)
    
    let paddingOne = padding1One
    let paddingTwo = padding1Two
    let paddingThree = padding1Three
    let bottomPadding = bottomPadding1
    let topPadding = topPadding1
    
    if (enSize === 0) {
      const newSegmentHeight1 = intervalFloat * segmentHeight1 / 1.5
      const diff1 = newSegmentHeight1 - segmentHeight1
      paddingOne = padding1One
      paddingTwo = padding1Two
      paddingThree = padding1Three
      bottomPadding = bottomPadding1 + (diff1 / 2)
      topPadding = topPadding1 + (diff1 / 2)
    }
    else if (enSize === 1) {
      const newSegmentHeight2 = intervalFloat * segmentHeight2 / 1.5
      const diff2 = newSegmentHeight2 - segmentHeight2
      paddingOne = padding1One * 2 + 1
      paddingTwo = padding1Two * 2 + 1 + 1
      paddingThree = padding1Three * 2
      bottomPadding = bottomPadding1 * 2 + (diff2 / 2) + 1
      topPadding = topPadding1 * 2 + (diff2 / 2)
    }
    else if (enSize === 2) {
      const newSegmentHeight4 = intervalFloat * segmentHeight4 / 1.5
      const diff4 = newSegmentHeight4 - segmentHeight4
      paddingOne = padding1One * 4 + 1
      paddingTwo = padding1Two * 4 + 10
      paddingThree = padding1Three * 4
      bottomPadding = bottomPadding1 * 4 + (diff4 / 2) + 1
      topPadding = topPadding1 * 4 + (diff4 / 2)
    }
    return (
      <DivSen
        innerRef={ref => this.divsen = ref}
        padding={bottomPadding}>
        <DivLineTop lineNum={lineNum} borderColor={borderColor} padding={topPadding} />
        <DivLine borderColor={borderColor} padding={paddingOne} />
        <DivLine borderColor='#FFAE72' padding={paddingTwo} />
        <DivLineDown lineNum={lineNum} borderColor={borderColor} padding={paddingThree} />
      </DivSen>
    )
  }
}

export default FourLine2