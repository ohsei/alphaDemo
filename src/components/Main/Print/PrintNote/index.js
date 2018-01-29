/* 印刷用コンポーネント */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {pick, keys} from 'lodash'

import Segments from './Segments'

const StyledDiv = styled.div`
  margin: 0 0 0 0.5cm;
  display: ${props => props.isPrint ? 'block' : 'none'};
  width: ${props => `${props.width}px`};
`
const StyledButton = styled.button`
  width: 150px;
  height: 50px;
  font-size: 20px;

  @media print{
    display: none;
  }
`
const StyledMessageArea = styled.div.attrs({
  tabIndex: -1,
})`
  width: 100%;
  margin: 10px 10px;
  height: 40px;
  color: #f00;
  z-index: 99;

  @media print{
    display: none;
  }
`

class PrintNote extends Component{
  componentDidUpdate () {
    const {isPrint, setPrintStatus, printStatus, isLayoutError} = this.props

    if (isLayoutError) {
      return
    }

    if (isPrint === true){
      if (printStatus === '印刷可'){
        return
      }

      if (printStatus === '印刷準備中...'){
        if (this.getState() == true){
          setPrintStatus('印刷可')
        }
      }
    }
  }

  print = () => {
    const {printFinish, setPrintStatus, isLayoutError} = this.props

    if (isLayoutError) {
      return
    }
    window.print()

    this.onClearLoadstateArray()
    printFinish(true)
    setPrintStatus('印刷準備中...')
  }
  cancel = () => {
    const {printFinish, setPrintStatus} = this.props
    this.onClearLoadstateArray()
    printFinish(false)
    setPrintStatus('印刷準備中...')
  }
  getState = () => {
    const {loadedArray} = this.props

    if  (loadedArray.length <= 0){
      return false
    }

    for (let i = 0; i < loadedArray.length;i++){
      if (loadedArray[i].segments.length <= 0){
        return false
      }

      for (let j = 0;j < loadedArray[i].segments.length;j++){
        if (loadedArray[i].segments[j].loaded == false){
          return false
        }
      }
    }
    return true
  }
  onClearLoadstateArray = () => {
    const {updateLoadedArray, namelist} = this.props
    let loadedArray = []

    for (let i = 0;i < namelist.length;i ++) {
      loadedArray.push({id: i, segments: []})
    }
    updateLoadedArray(loadedArray)
  }

  render (){
    const {namelist, printStatus, errorMessage, setting, isLayoutError} = this.props

    let listSegments = null

    if (this.props.isPrint == true){
      listSegments = namelist.map((list) => {

        return (
          <Segments
            ref={(ref) => {this.PrintSegments = ref}}
            id={list.id}
            key={list.id}
            name={list.name}
            {...pick(this.props, keys(Segments.propTypes))}
          />
        )
      })
    }
    return (
      <StyledDiv
        isPrint={this.props.isPrint}
        width={this.props.width}>
        <StyledButton disabled={isLayoutError} onClick={this.print}>{printStatus}</StyledButton>
        <StyledButton onClick={this.cancel}>キャンセル</StyledButton>
        {isLayoutError && <StyledMessageArea>{errorMessage}</StyledMessageArea>}
        {setting.layout == 'landscape' && <StyledMessageArea>{'A4横のプリントレイアウトです。プリンタの用紙設定が「横」になっていることを確認してから、印刷を実行してください。'}</StyledMessageArea>}
        {listSegments}
      </StyledDiv>
    )
  }
}

PrintNote.propTypes = {
  namelist: PropTypes.array,
  note: PropTypes.array,
  title: PropTypes.string,
  isPrint: PropTypes.any,
  width: PropTypes.number,
  setting: PropTypes.any,
  printFinish: PropTypes.func.isRequired,
  setPrintStatus: PropTypes.func.isRequired,
  printStatus: PropTypes.string,
  loadedArray: PropTypes.array,
  updateLoadedArray: PropTypes.func,
  errorMessage: PropTypes.string,
  isLayoutError: PropTypes.bool,
}

export default PrintNote

