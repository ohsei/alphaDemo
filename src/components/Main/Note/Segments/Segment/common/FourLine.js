import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import html2canvas from 'html2canvas'
import FileSaver from 'file-saver'

const DivSen = styled.div`
  width: 100%;
  z-index: 0;
  display: block;
  padding-bottom: 12px;
  background-color: white;
`
const DivLine = styled.div`
  width: 100%;
  display: flex;
  padding: 23px 0 0 0;
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
  padding: 35px 0 0 0;
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
  padding: 23px 0 0 0;
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
  }

  componentDidMount () {
    html2canvas (this.divsen, {
      onrendered: function (canvas) {
        //const blob = canvas.msToBlob(blob)
        //window.navigator.msSaveBlob(blob, "fourline.png")
        //const blob = canvas.toBlob(blob)
        //FileSaver.saveAs(blob, "fourline.png")
        //const blob = canvas.msToBlob(blob)
        //window.navigator.msSaveBlob(blob, "fourline.png")
        canvas.toBlob(function (blob) {
          FileSaver.saveAs(blob, 'fourline.png')
        })
      }
    })
  }

  render (){
    const {marginTop, lineNum, borderColor} = this.props
    return (
      <DivSen
        innerRef={ref => this.divsen = ref}
        style={{marginTop: marginTop}}>
        <DivLineTop lineNum={lineNum} borderColor={borderColor}/>
        <DivLine borderColor={borderColor} />
        <DivLine borderColor='orange' />
        <DivLineDown lineNum={lineNum} borderColor={borderColor} />
      </DivSen>
    )
  }
}

export default FourLine