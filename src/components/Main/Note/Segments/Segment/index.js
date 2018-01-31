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
const UserPageBreakLine = styled.div`
margin-bottom: 25px;
width: 100%;
height: 2;
border:1px dotted #FFAE72;
page-break-after: always;

@media print{
  border-color: white;
}
`

const DrawPageBreakLine = (object) => {
  if (object.isPageBreak || object.isUserPageBreak){
    if (object.isPageBreak) {
      return (
        <div>
          <PageBreakLine />
        </div>
      )
    }
    else {
      return (
        <div>
          <UserPageBreakLine />
        </div>
      )
    }
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
    isChangedType: PropTypes.bool,
    updateIsChangeType: PropTypes.func.isRequired,
    setOldType: PropTypes.func.isRequired,
    oldType: PropTypes.string,
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
      onShowCannotChangeSettingAlertDialog, setAlertMessage,
      updateWidth,
      updateIsChangeType, setOldType, isChangedType, oldType, type} = this.props
    const segmentHeight = this.segArea.offsetHeight

    const pageHeight = setting.layout == 'landscape' ? landscapePageHeight : defaultPageHeight

    if (this.segArea.offsetHeight > (pageHeight - 75)) {
      const isChangeFormat = changeFormat(prevProps.setting, setting)
      const isChangeType = prevProps.type === type ? false : true

      if (isChangeFormat) {
        updateIsChangeFormat(true)
        setOldSetting(Object.assign({}, prevProps.setting))
      }

      if (isChangeType) {
        updateIsChangeType(true)
        setOldType(prevProps.type)
      }

      if ((isChangeFormat || isChangedFormat) && (setting != oldSetting)) {
        onShowCannotChangeSettingAlertDialog(true)
        let newSetting = Object.assign({}, prevProps.setting)
        updateSetting(newSetting)
        updateWidth(prevProps.width)
        const nums = getMaxNumsWithSetting(setting)
        let s = 120 * parseFloat(setting.interval) / 1.5
        let height = 0
        let fontSize = '1倍'

        if (setting.enSize === '1') {
          s = 2 * s
          fontSize = '1倍'
        }
        else if (setting.enSize === '2') {
          s = 4 * s
          fontSize = '2倍'
        }

        if (note[id].enHeight == 0 ) {
          height = 1
          fontSize = '4倍'
        }
        else {
          height = (note[id].enHeight / s).toFixed(0)
        }
        setAlertMessage({
          header: `変更しようとした設定では、${id + 1}行目の編集ボックスは、1ページに印刷できるテキスト範囲を超えています。<br />複数の編集ボックスに分けて入力するか、行数を調整してください。<br /><br />`,
          detail: '※テキスト入力の目安については、ヘルプを参照してください。'
        })
        updateIsChangeFormat(false)
      }
      else if ((isChangeType || isChangedType) && (note[id].type != oldType)) {
        onShowCannotChangeSettingAlertDialog(true)
        let newNote = note.slice()
        newNote[id].type = oldType
        updateNote(newNote)
        setAlertMessage({
          header: `${id + 1}行目の編集ボックスのテキスト行数を調整してください。<br />「画像＋テキスト」のレイアウトでは、テキストのみのレイアウトよりも表示できる文字数が少なくなります。<br /><br />`,
          detail: '<strong>「画像＋テキスト」</strong> のレイアウトで入力できる行数は、およそその ６割 程度になります。<br />読み込んだのち、画像の縮小等の調整により、入力できるテキスト量は変化します。<br />（テキスト入力の目安については、ヘルプを参照してください）'
        })
        updateIsChangeType(false)
      }
      else {
        onShowAddSegmentAlertDialog(true)
        updateOverOnePage(true)
        setOverPageId(id)
        return
      }
    }

    if (note[id].segmentHeight != segmentHeight) {
      let newNote = note.slice()
      newNote[id].segmentHeight = segmentHeight
      updateNote(newNote)
    }

  }

  render (){
    const {id, width, note, title, name, type} = this.props
    const dataUrl = note[id].dataUrl
    const isPageBreak = note[id].isPageBreak
    const isUserPageBreak = note[id].isUserPageBreak

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
        {(isPageBreak || isUserPageBreak) && <DivInterval interval={'25px'} /> }
        {(!isPageBreak  && !isUserPageBreak) && <DivInterval interval={'50px'} /> }
        <DrawPageBreakLine
          isPageBreak={isPageBreak}
          isUserPageBreak={isUserPageBreak}
          title={title}
          name={name} />
      </div>
    )
  }
}

export default Segment