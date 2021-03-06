/* ファイル一覧用コンポーネント */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {getFileList, dbOperate} from '../../../utils/database'
import {
  GET_ALL_FILE,
  GET_ONE_FILE,
  DEL_ONE_FILE,
} from '../../../utils/const.js'

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
  width: 700px;
  top: 150px;
  left: 100px;
  z-index: 9999;
  border: 1px solid blue;
  color: black;
  background-color: #EEE;
`
const DialogDiv = styled.div`
  margin: 20px;
  width: auto;
  height: 300px;
  background-color: white;
  display: ${props => props.show ? 'block' : 'none'};
  overflow-y: scroll;
  overflow-x: hidden;
  color: black;
`
const ListLabel = styled.div`
  padding: 0 25px 0 15px;
  width: 100%;
  height: 50px;
  line-height: 2.5;
  border: 1px solid gray;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 999;
  background-color: ${props => props.isSelected ? '#FFAE72' : 'white'}
`
const FileNameLabel = styled.div`
  width: 70%;
`
const TimeLable = styled.div`
  width: 30%;
  text-align: left;
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

class FileDialog extends Component{
  constructor (props){
    super(props)
    this.files = new Map()
  }
  static propTypes = {
    isShowFileDialog: PropTypes.bool,
    onLoadFile: PropTypes.func.isRequired,
    onShowFileDialog: PropTypes.func.isRequired,
    updateContent: PropTypes.func.isRequired,
    content: PropTypes.arrayOf(PropTypes.object),
    updateSelectFile: PropTypes.func.isRequired,
    selectedFile: PropTypes.string,
    offIsFilelistUpdate: PropTypes.func.isRequired,
    isFileListUpdated: PropTypes.bool,
  }

  updateContent = () => {
    const {updateContent} = this.props

    updateContent(getFileList())
  }

  onSelectFile = (e) => {
    const {updateSelectFile} = this.props

    updateSelectFile(e.target.innerText)
  }

  onOpenFile = () => {
    const {selectedFile} = this.props

    if (!selectedFile) {
      return
    }
    const operateJson = {
      callback: this.onGetFile,
      filename: selectedFile
    }
    dbOperate(GET_ONE_FILE, operateJson)
  }

  onAfterDelete = () => {
    const operateJson = {
      callback: this.updateContent
    }
    dbOperate(GET_ALL_FILE, operateJson)
  }

  onDeleteFile = () => {
    const {selectedFile, updateSelectFile} = this.props
    const operateJson = {
      callback: this.onAfterDelete,
      filename: selectedFile
    }
    dbOperate(DEL_ONE_FILE, operateJson)
    updateSelectFile('')
  }
  onCancel = () => {
    const {onShowFileDialog} = this.props

    onShowFileDialog(false)
  }
  onGetFile = (e) => {
    const {onLoadFile, onShowFileDialog} = this.props

    if (e.data) {
      let fileStr = e.data
      let savedFile = JSON.parse(fileStr)

      onLoadFile(savedFile)
      onShowFileDialog(false)
    }
  }
  componentDidMount () {
    const operateJson = {
      callback: this.updateContent
    }
    dbOperate(GET_ALL_FILE, operateJson)
  }

  componentWillReceiveProps (nextProps) {
    const {offIsFilelistUpdate} = this.props

    if (nextProps.isFileListUpdated) {
      const operateJson = {
        callback: this.updateContent
      }
      dbOperate(GET_ALL_FILE, operateJson)
      offIsFilelistUpdate()
    }
  }
  render () {
    const {isShowFileDialog, content, selectedFile} = this.props

    return (
      <DivOverlap show={isShowFileDialog}>
        <Wrapper>
          <h3 style={{flex: 8, marginLeft: 10}}>保存したファイル</h3>
          <DialogDiv show={isShowFileDialog}>

            {content.map((fileObj, i) => {     
              return (
                <ListLabel
                  isSelected={selectedFile == fileObj.filename}
                  key={i}
                  ref={ref => this.files.set(i, ref)}
                  onClick={this.onSelectFile}>
                  <FileNameLabel isSelected={selectedFile == fileObj.filename} onClick={this.onSelectFile}>{fileObj.filename}</FileNameLabel>
                  <TimeLable isSelected={selectedFile == fileObj.filename}>{fileObj.time}</TimeLable>
                </ListLabel>
              )
            })}

          </DialogDiv>
          <div style={{display: 'flex', direction: 'row'}}>
            <Button style={{marginLeft: 50}}onClick={this.onOpenFile}>ファイルを開く</Button>
            <Button onClick={this.onDeleteFile}>ファイルを削除</Button>
            <Button onClick={this.onCancel}>キャンセル</Button>
          </div>
        </Wrapper>
      </DivOverlap>
    )
  }
}

export default FileDialog