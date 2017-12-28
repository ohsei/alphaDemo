import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import html2canvas from 'html2canvas'
import FileSaver from 'file-saver'

const DivSen = styled.div`
  width: 100%;
  z-index: 0;
  display: block;
  padding: ${props => props.padding};
  background-color: white;
`
const DivLine = styled.div`
  width: 100%;
  display: flex;
  padding: ${props => props.padding};
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
  padding: ${props => props.padding};
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
  padding: ${props => props.padding};
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
    lineNum: PropTypes.number,
    isPrint: PropTypes.bool,
    borderColor: PropTypes.string,
    enSize: PropTypes.number
  }

  componentDidMount () {
    const {isPrint} = this.props
    if (!isPrint) {
      html2canvas (this.divsen, {
        onrendered: function (canvas) {
          canvas.toBlob(function (blob) {
            FileSaver.saveAs(blob, '4line_1.5_2.png')
          })
        }
      })
    }
  }

  render (){
    const {lineNum, borderColor, enSize} = this.props
    /* １倍 */
    let padding = '23px 0 0 0'
    let topPadding = '23px 0 0 0'
    let bottomPadding = '0 0 0 0'

    if (enSize === 1) {
      topPadding = '35px 0 0 0'
      bottomPadding = '0 0 12px 0'
    }
    else if (enSize === 2) {
      padding = '47px 0 0 0'
      topPadding = '71px 0 0 0'
      bottomPadding = '0 0 24px 0'
    }
    else if (enSize === 4) {
      padding = '95px 0 0 0'
      topPadding = '143px 0 0 0'
      bottomPadding = '0 0 48px 0'
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