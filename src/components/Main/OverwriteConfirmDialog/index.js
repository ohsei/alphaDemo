/* 保存されてないファイル存在する場合の確認用コンポーネント */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const DivOverlap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(100,100,100,0.5);
  display: ${props => props.show ? 'block' : 'none'}
`
const Wrapper = styled.div`
  position: fixed;
  width: 600px;
  top: 150px;
  left: 100px;
  z-index: 9999;
  border: 1px solid blue;
  color: black;
  background-color: #EEE;
`
const Button = styled.button`
  margin: 15px;
  width: 150px;
  height: 45px;
  background-color: #AAA;
  color: white;
  border: none;
  color: black;
  font-size: 16px;

  &:hover {
    border: 2px solid #555;
  }

  &:active {
    background-color: #555;
    border: 2px solid #555;
  }
`

class OverwriteConfirmDialog extends Component{
  constructor (props){
    super(props)
    this.files = new Map()
  }
  static propTypes = {
    isShowOverwriteConfirm: PropTypes.bool,
    onShowOverwriteConfirmDialog: PropTypes.func.isRequired,
    updateOverwriteStatus: PropTypes.func.isRequired
  }

  onOk = () => {
    const {updateOverwriteStatus, onShowOverwriteConfirmDialog} = this.props
    updateOverwriteStatus(true)
    onShowOverwriteConfirmDialog(false)
  }
  onCancel = () => {
    const {onShowOverwriteConfirmDialog} = this.props

    onShowOverwriteConfirmDialog(false)
  }
  
  render () {
    const {isShowOverwriteConfirm} = this.props

    return (
      <DivOverlap show={isShowOverwriteConfirm}>
        <Wrapper>
          <h3 style={{flex: 8, marginLeft: 10}}>同じ名称のファイルが既に存在します。上書きしますか？</h3>
          <div style={{display: 'flex', direction: 'row', justifyContent: 'flex-end'}}>
            <Button onClick={this.onOk}>はい</Button>
            <Button onClick={this.onCancel}>キャンセル</Button>
          </div>
        </Wrapper>
      </DivOverlap>
    )
  }
}

export default OverwriteConfirmDialog