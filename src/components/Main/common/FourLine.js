import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import html2canvas from 'html2canvas'
import FileSaver from 'file-saver'

const DivSen = styled.div`
  width: 100%;
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

class FourLine extends React.Component{
  static propTypes = {
    interval: PropTypes.number,
    lineNum: PropTypes.number,
    borderColor: PropTypes.string,
    enSize: PropTypes.string
  }

  onClick =  () => {
    const {lineNum, borderColor, enSize, interval} = this.props
    const fileName = `${lineNum}lines_${borderColor}_${enSize}_${interval}.png`
    html2canvas (this.divsen, {
      onrendered: function (canvas) {
        canvas.toBlob(function (blob) {
          FileSaver.saveAs(blob, fileName)
        })
      }
    })
  }

  render (){
    const {lineNum, borderColor, enSize, interval} = this.props
    
    const padding1 = 23
    const bottomPadding1 = 12
    const segmentHeight1 = 120
    const padding2 = 47
    const bottomPadding2 = 24
    const segmentHeight2 = 240
    const padding4 = 95
    const bottomPadding4 = 48
    const segmentHeight4 = 480
    const intervalFloat = parseFloat(interval)
        
    let padding = padding1
    let bottomPadding = bottomPadding1
    let topPadding = bottomPadding + padding
    
    if (enSize === '１倍') {
      const newSegmentHeight1 = intervalFloat * segmentHeight1 / 1.5
      const diff1 = newSegmentHeight1 - segmentHeight1
      padding = padding1
      bottomPadding = bottomPadding1 + (diff1 / 2)
      topPadding = bottomPadding + padding
          
    }
    else if (enSize === '２倍') {
      const newSegmentHeight2 = intervalFloat * segmentHeight2 / 1.5
      const diff2 = newSegmentHeight2 - segmentHeight2
      padding = padding2
      bottomPadding = bottomPadding2 + (diff2 / 2)
      topPadding = bottomPadding + padding
    }
    else if (enSize === '４倍') {
      const newSegmentHeight4 = intervalFloat * segmentHeight4 / 1.5
      const diff4 = newSegmentHeight4 - segmentHeight4
      padding = padding4
      bottomPadding = bottomPadding4 + (diff4 / 2)
      topPadding = bottomPadding + padding
    }
    return (
      <DivSen
        innerRef={ref => this.divsen = ref}
        padding={bottomPadding}>
        <DivLineTop lineNum={lineNum} borderColor={borderColor} padding={topPadding} />
        <DivLine borderColor={borderColor} padding={padding} />
        <DivLine borderColor='orange' padding={padding} />
        <DivLineDown lineNum={lineNum} borderColor={borderColor} padding={padding} />
      </DivSen>
    )
  }
}

export default FourLine