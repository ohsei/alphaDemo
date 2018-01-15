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

class EditingConfirmDialog extends Component{
  constructor (props){
    super(props)
    this.files = new Map()
  }
  static propTypes = {
    isShowCreateFileConfirm: PropTypes.bool,
    onShowCreateFileConfirmDialog: PropTypes.func.isRequired,
    updateCreateFileStatus: PropTypes.func.isRequired,
    updateOpenFileStatus: PropTypes.func.isRequired,
    isNewFile: PropTypes.bool,
    isOpenFile: PropTypes.bool,
    updateIsNewFile: PropTypes.func.isRequired,
    updateIsOpenFile: PropTypes.func.isRequired,
  }

  onOk = () => {
    const {isNewFile, isOpenFile, updateCreateFileStatus, updateOpenFileStatus, onShowCreateFileConfirmDialog, updateIsNewFile, updateIsOpenFile} = this.props
    if (isNewFile) {
      updateCreateFileStatus(true)
    }
    if (isOpenFile) {
      updateOpenFileStatus(true)
    }
    onShowCreateFileConfirmDialog(false)
    updateIsNewFile(false)
    updateIsOpenFile(false)
  }
  onCancel = () => {
    const {onShowCreateFileConfirmDialog, updateIsNewFile, updateIsOpenFile} = this.props
    onShowCreateFileConfirmDialog(false)
    updateIsNewFile(false)
    updateIsOpenFile(false)
  }
  
  render () {
    const {isShowCreateFileConfirm, isNewFile, isOpenFile} = this.props
    let message = ''
    if (isNewFile) {
      message = 'このファイルは保存されていません。このまま新規ファイルを作成しますか？'
    }
    if (isOpenFile) {
      message = 'このファイルは保存されていません。このままファイルを開きますか？'
    }

    return (
      <DivOverlap show={isShowCreateFileConfirm}>
        <Wrapper>
          <h3 style={{flex: 8, marginLeft: 10}}>{message}</h3>
          <div style={{display: 'flex', direction: 'row', justifyContent: 'flex-end'}}>
            <Button onClick={this.onOk}>はい</Button>
            <Button onClick={this.onCancel}>キャンセル</Button>
          </div>
        </Wrapper>
      </DivOverlap>
    )
  }
}

export default EditingConfirmDialog