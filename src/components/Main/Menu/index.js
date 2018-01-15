import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {pick, keys} from 'lodash'

import {dbOperate} from '../../../utils/database'

import {
  GET_ONE_FILE,
  SAVE_ONE_FILE,
} from '../../../utils/const.js'

import SetMenuItem from './SetMenuItem'

const DivOverlap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100%;
  height: 100%;
  background-color: rgba(100,100,100,0.5);
  display: ${props => props.show ? 'block' : 'none'}
`
const Item = styled.div`
  width: 30px;
  background-color: orange;
  color: white;
  -webkit-writing-mode: ${props => props.vertical ? 'vertical-lr' : 'horizontal-tb'};
  -ms-writing-mode:  ${props => props.vertical ? 'tb-lr' : 'lr-tb'};
  writing-mode: ${props => props.vertical ? 'tb-lr' : 'lr-tb'};
  text-orientation: upright;
  height: 50px;
  border: 0.1px solid white;
  flex-direction:row;
  line-height: 30px;
  cursor: pointer;
`
const DivMenu = styled.div`
  position: fixed;
  display: block;
  z-index: 999;
  margin: 5px 0 0 0;
  width: 50px;
  height: 350px;
`
const ItemSetting = Item.extend`
  vertical : ${props => props.vertical};
  margin: 0 0 10px 0;
  padding: 10px 0 5px 0;
  >a {
    color: white;
    text-decoration: none;
    :hover {
      color: white;
    }
  }
`

class Menu extends Component {
  constructor (props){
    super(props)
    this.onShowFileDialog = this.onShowFileDialog.bind(this)
    this.onSaveFile = this.onSaveFile.bind(this)
    this.onPrint = this.onPrint.bind(this)
    this.onCreateNewFile = this.onCreateNewFile.bind(this)
  }

  onShowFileDialog (){
    const {onShowCreateFileConfirmDialog, updateIsOpenFile} = this.props
    onShowCreateFileConfirmDialog(true)
    updateIsOpenFile(true)
  }

  onSaveFileOver = () => {
    const {onShowSavedAlertDialog} = this.props
    onShowSavedAlertDialog(true)
  }
  confirmOverWrite = (e) => {
    const {onIsFilelistUpdate, note, setting, saveFileTitle, name, tabNodeList, onShowOverwriteConfirmDialog, setOperateJson} = this.props
    let objContent = {}
    objContent.note = note
    objContent.setting = setting
    objContent.saveFileTitle = saveFileTitle
    objContent.name = name
    objContent.tabNodeList = tabNodeList
    let content = JSON.stringify(objContent)
    const fileObj = {
      filename: this.props.saveFileTitle,
      data: content
    }

    const operateJson = {
      callback: this.onSaveFileOver,
      fileObj: fileObj
    }

    if (e) {
      onShowOverwriteConfirmDialog(true)
      setOperateJson(operateJson)
    }
    else {
      dbOperate(SAVE_ONE_FILE, operateJson)
      onIsFilelistUpdate()
    }
  }

  onSaveFile (){
    const {saveFileTitle, onShowTitleAlertDialog} = this.props

    if (saveFileTitle == ''){
      onShowTitleAlertDialog(true)
      return false
    }
    const operateJson = {
      callback: this.confirmOverWrite,
      filename: saveFileTitle,
    }
    dbOperate(GET_ONE_FILE, operateJson)
    return true
  }

  onPrint (){
    const {onPrint} = this.props
    onPrint()
  }

  onCreateNewFile (){
    const {onShowCreateFileConfirmDialog, updateIsNewFile} = this.props
    onShowCreateFileConfirmDialog(true)
    updateIsNewFile(true)
  }
  
  componentDidUpdate () {
    const {isOverwrite, operateJson, onIsFilelistUpdate, updateOverwriteStatus, setOperateJson,
      isOkToCreateFile, updateCreateFileStatus, initalNote, isOkToOpenFile, onShowFileDialog, updateOpenFileStatus} = this.props

    if (isOverwrite) {
      dbOperate(SAVE_ONE_FILE, operateJson)
      onIsFilelistUpdate()
      updateOverwriteStatus(false)
      setOperateJson({})
    }

    if (isOkToCreateFile) {
      initalNote()
      updateCreateFileStatus(false)
    }

    if (isOkToOpenFile) {
      onShowFileDialog()
      updateOpenFileStatus(false)
    }
  } 
  render (){
    const {isShowMenu} = this.props
    return (
      <div>
        <DivMenu innerRef={ref => this.menu = ref}>
          <SetMenuItem
            setName='設定'
            {...pick(this.props, keys(SetMenuItem.propTypes))}
          ></SetMenuItem>
          <ItemSetting vertical><a
            ref={(ref) => this.print = ref}
            onClick={this.onPrint}>印刷</a></ItemSetting>
          <ItemSetting vertical><a
            ref={(ref) => {this.save = ref}}
            onClick={this.onSaveFile}>保存</a></ItemSetting>
          <ItemSetting vertical><a
            ref={(ref) => {this.newFile = ref}}
            onClick={this.onCreateNewFile}>新規</a></ItemSetting>
          <ItemSetting vertical><a
            ref={(ref) => {this.open = ref}}
            onClick={this.onShowFileDialog}>開く</a></ItemSetting>
        </DivMenu>
        <DivOverlap show={isShowMenu} />
      </div>
    )
  }
}
Menu.propTypes = {
  saveFileTitle: PropTypes.string,
  loadFile: PropTypes.any,
  note: PropTypes.any,
  setting: PropTypes.object,
  setSetting: PropTypes.any,
  createNewFile: PropTypes.any,
  print: PropTypes.any,
  setShowFileDialog: PropTypes.func,
  onShowFileDialog: PropTypes.func.isRequired,
  onPrint: PropTypes.func.isRequired,
  onIsFilelistUpdate: PropTypes.func.isRequired,
  updateSetting: PropTypes.func.isRequired,
  initalNote: PropTypes.func.isRequired,
  updateWidth: PropTypes.func.isRequired,
  isShowMenu: PropTypes.bool,
  name: PropTypes.string,
  tabNodeList: PropTypes.array,
  onShowTitleAlertDialog: PropTypes.func.isRequired,
  onShowSavedAlertDialog: PropTypes.func.isRequired,
  onShowOverwriteConfirmDialog: PropTypes.func.isRequired,
  isOverwrite: PropTypes.bool,
  updateOverwriteStatus: PropTypes.func.isRequired,
  operateJson: PropTypes.object,
  setOperateJson: PropTypes.func.isRequired,
  isOkToCreateFile: PropTypes.bool,
  isOkToOpenFile: PropTypes.bool,
  updateCreateFileStatus: PropTypes.func.isRequired,
  onShowCreateFileConfirmDialog: PropTypes.func.isRequired,
  updateIsNewFile: PropTypes.func.isRequired,
  updateIsOpenFile: PropTypes.func.isRequired,
  updateOpenFileStatus: PropTypes.func.isRequired,
}

export default Menu