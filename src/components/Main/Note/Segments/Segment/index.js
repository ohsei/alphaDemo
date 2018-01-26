import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {pick, keys} from 'lodash'

import {defaultPageHeight, landscapePageHeight} from '../../../../../utils/const'
import {changeFormat} from '../../../../../utils/changeFormat'
import {getMaxNumsWithSetting} from '../../../../../utils/getMaxNumsWithSetting'

import Actions from './common/Actions'
import TxtOnly from './TxtOnly'
import ImgOnly from './ImgOnly'
import ImgTxt from './ImgTxt'
import TxtImg from './TxtImg'


const SegArea = styled.div`
  width: ${props => `${props.width}px`};
  background-color: white;
  border: 2px solid #FFAE72;
`
const DivInterval = styled.div`
  height: ${props => props.interval};
  background-color: #E2FFF4;
`
const PageBreakLine = styled.div`
  margin-bottom: 25px;
  width: 100%;
  height: 2;
  border:1px dotted black;
  page-break-after: always;

  @media print{
    border-color: white;
  }
`

const DrawPageBreakLine = (object) => {
  if (object.isPageBreak == true){
    return (
      <div>
        <PageBreakLine />
      </div>
    )
  }
  else {
    return false
  }
}

class Segment extends Component{
  static propTypes = {
    id: PropTypes.number,
    width: PropTypes.number,
    setting: PropTypes.object,
    title: PropTypes.string,
    name: PropTypes.string,
    note: PropTypes.array,
    updateNote: PropTypes.func.isRequired,
    setOverPageId: PropTypes.func.isRequired,
    overPageId: PropTypes.number,
    updateWidth: PropTypes.func.isRequired,
    oldSetting: PropTypes.object,
    setOldSetting: PropTypes.func.isRequired,
    isChangedFormat: PropTypes.bool,
    updateIsChangeFormat: PropTypes.func.isRequired,
    updateSetting: PropTypes.func.isRequired,
    onShowCannotChangeSettingAlertDialog: PropTypes.func.isRequired,
    setAlertMessage: PropTypes.func.isRequired,
    setMaxLineNumMessage: PropTypes.func.isRequired,
    isChangedType: PropTypes.bool,
    updateIsChangeNote: PropTypes.func.isRequired,
    setOldType: PropTypes.func.isRequired,
    oldType: PropTypes.array,
    type: PropTypes.string,
    ...Actions.propTypes,
    ...ImgOnly.propTypes,
    ...TxtImg.propTypes,
    ...ImgTxt.propTypes,
    ...TxtOnly.propTypes,
  }

  componentDidUpdate (prevProps) {
    const {updateNote, note, id, onShowAddSegmentAlertDialog, updateOverOnePage,
      setting, setOverPageId, updateSetting,
      setOldSetting, updateIsChangeFormat, isChangedFormat, oldSetting,
      onShowCannotChangeSettingAlertDialog, setAlertMessage, setMaxLineNumMessage,
      updateWidth,
      updateIsChangeNote, setOldType, isChangedType, oldType, type} = this.props
    const segmentHeight = this.segArea.offsetHeight

    if (prevProps.note[id].segmentHeight != segmentHeight) {
      let newNote = note.slice()
      newNote[id].segmentHeight = segmentHeight
      updateNote(newNote)
    }
    const pageHeight = setting.layout == 'landscape' ? landscapePageHeight : defaultPageHeight

    if (this.segArea.offsetHeight > (pageHeight - 75)) {
      const isChangeFormat = changeFormat(prevProps.setting, setting)
      const isChangeType = prevProps.type === type ? false : true

      if (isChangeFormat) {
        updateIsChangeFormat(true)
        setOldSetting(Object.assign({}, prevProps.setting))
      }

      if (isChangeType) {
        updateIsChangeNote(true)
        setOldType(prevProps.type)
      }

      if ((isChangeFormat || isChangedFormat) && (setting != oldSetting)) {
        onShowCannotChangeSettingAlertDialog(true)
        let newSetting = Object.assign({}, prevProps.setting)
        updateSetting(newSetting)
        updateWidth(prevProps.width)
        const nums = getMaxNumsWithSetting(setting)
        setAlertMessage(`設定変更する場合、第${id + 1}ボックスの内容は印刷一ページの範囲を超えたため、設定の変更ができません。内容を適切※な範囲に変更してから、設定を変更してください。`)
        setMaxLineNumMessage(`用紙設定が<font color='#0000ff'>${setting.layout == 'portrait' ? '縦' : '横'}</font>、英字サイズが<font color='#0000ff'>${parseInt(setting.enSize) + 1}倍</font>、行間が<font color='#0000ff'>${setting.interval}</font>に設定を変更したい場合、<br />和文一行として、英文は最大<font color='#ff0000'>${nums}</font>行しか入力できません。<br /><small>和文を多数行で入れる場合、英文の最大行数もっと減らして調整する可能性がある。</small>`)
        updateIsChangeFormat(false)
      }
      else if ((isChangeType || isChangedType) && (note[id].type != oldType)) {
        onShowCannotChangeSettingAlertDialog(true)
        let newNote = note.slice()
        newNote[id].type = oldType
        updateNote(newNote)
        const nums = getMaxNumsWithSetting(setting)
        setAlertMessage('テキストの量を調整してください。<br />「画像＋テキスト」のレイアウトでは、テキストのみの場合よりも表示できる文字数が少なくなります。')
        setMaxLineNumMessage('<strong>「画像＋テキスト」</strong> のレイアウトで入力できるテキスト量は、およそその ６割 程度になります。<br />読み込んだのち、画像の縮小等の調整により、入力できるテキスト量は変化します。<br />（テキスト入力の目安については、ヘルプを参照してください）')
        updateIsChangeNote(false)
      }
      else {
        onShowAddSegmentAlertDialog(true)
        updateOverOnePage(true)
        setOverPageId(id)
        return
      }
    }
  }

  render (){
    const {id, width, note, title, name, type} = this.props
    const dataUrl = note[id].dataUrl
    const isPageBreak = note[id].isPageBreak

    const content = (()  => {
      switch (type) {
      case 'imgOnly':
        return <ImgOnly
          ref={(ref) => {this.imgOnlySeg = ref}}
          dataUrl={dataUrl}
          {...pick(this.props, keys(ImgOnly.propTypes))}
        />

      case 'imgTxt':
        return <ImgTxt
          ref={(ref) => {this.imgTxtSeg = ref}}
          dataUrl={dataUrl}
          {...pick(this.props, keys(ImgTxt.propTypes))}
        />

      case 'txtImg':
        return <TxtImg
          ref={(ref) => {this.txtImgSeg = ref}}
          dataUrl={dataUrl}
          {...pick(this.props, keys(TxtImg.propTypes))}
        />

      default:
        return <TxtOnly
          ref={(ref) => {this.txtOnlySeg = ref}}
          {...pick(this.props, keys(TxtOnly.propTypes))}
        />
      }

    })()
    return (
      <div ref={ref => this.segment = ref}>
        <SegArea width={width}  >
          <div ref={ref => this.segArea = ref}>{content}</div>
          <Actions type={type} {...pick(this.props, keys(Actions.propTypes))} />
        </SegArea>
        {isPageBreak && <DivInterval interval={'25px'} /> }
        {!isPageBreak && <DivInterval interval={'50px'} /> }
        <DrawPageBreakLine
          isPageBreak={isPageBreak}
          title={title}
          name={name} />
      </div>
    )
  }
}

export default Segment