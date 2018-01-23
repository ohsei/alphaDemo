import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {pick, keys} from 'lodash'

import Sentences from '../Sentences'
import LabNum from '../common/LabNum'
import Canvas from '../common/Canvas'
import {defaultPageHeight, landscapePageHeight} from '../../../../../../utils/const'
import {changeFormat} from '../../../../../../utils/changeFormat'
import {getMaxNumsWithSetting} from '../../../../../../utils/getMaxNumsWithSetting'

const SentenceArea = styled.div`
  display: flex;
  width: 100%;
`

class TxtImgSeg extends Component{
  componentDidUpdate (prevProps) {
    const {updateNote, note, id, onShowAddSegmentAlertDialog, updateOverOnePage,
      setting, setOverPageId, updateSetting,
      setOldSetting, updateIsChangeFormat, isChangedFormat, oldSetting,
      onShowCannotChangeSettingAlertDialog, setAlertMessage, updateWidth, setMaxLineNumMessage} = this.props
    const segmentHeight = this.sentencearea.offsetHeight

    if (prevProps.note[id].segmentHeight != segmentHeight) {
      let newNote = note.slice()
      newNote[id].segmentHeight = segmentHeight
      updateNote(newNote)
    }
    const pageHeight = setting.layout == 'landscape' ? landscapePageHeight : defaultPageHeight

    if (this.sentencearea.offsetHeight > (pageHeight - 75)) {
      const isChangeFormat = changeFormat(prevProps.setting, this.props.setting)

      if (isChangeFormat) {
        updateIsChangeFormat(true)
        setOldSetting(Object.assign({}, prevProps.setting))
      }

      if ((isChangeFormat || isChangedFormat) && (setting != oldSetting)) {
        onShowCannotChangeSettingAlertDialog(true)
        let newSetting = Object.assign({}, prevProps.setting)
        updateSetting(newSetting)
        updateWidth(prevProps.width)
        const nums = getMaxNumsWithSetting(setting)
        setAlertMessage(`設定変更する場合、第${id + 1}ボックスの内容は印刷一ページの範囲を超えたため、設定の変更ができません。内容を適切※な範囲に変更してから、設定を変更してください。`)
        setMaxLineNumMessage(`用紙設定が<font color='#0000ff'>${setting.layout == 'portrait' ? '縦' : '横'}</font>、英字サイズが<font color='#0000ff'>${setting.enSize}倍</font>、行間が<font color='#0000ff'>${setting.interval}</font>に設定を変更したい場合、<br />和文一行として、英文は最大<font color='#ff0000'>${nums}</font>行しか入力できません。<br /><small>和文を多数行で入れる場合、英文の最大行数もっと減らして調整する可能性がある。</small>`)
        updateIsChangeFormat(false)
      }
      else {
        onShowAddSegmentAlertDialog(true)
        updateOverOnePage(true)
        setOverPageId(id)
      }
    }
  }
  onKeyDown = (event) => {
    const {isOverOnePage} = this.props

    if (isOverOnePage  && event.keyCode !== 8) {
      event.preventDefault()
    }
  }
  render (){
    const {id, width, setting, note} = this.props

    const imgMaxWidth = (width - 50) * 0.4
    let senWidth = (width - 50) * 0.6

    if (note[id].imgWidth > 0) {
      if (imgMaxWidth > (note[id].imgWidth + 40)) {
        senWidth = width - 50 - note[id].imgWidth - 40
      }
    }

    return (
      <SentenceArea
        innerRef={ref => this.sentencearea = ref}
        width={width}
        onKeyDown={this.onKeyDown}
        onClick={this.setCurSegment} >
        <LabNum lineNoType={setting.lineNos} id={id} />
        <Sentences
          senWidth={senWidth}
          ref={(ref) => {this.sentences = ref}}
          {...pick(this.props, keys(Sentences.propTypes))}
        />
        <Canvas
          imgMaxWidth={imgMaxWidth}
          canvasWidth={note[id].imgWidth == 0 ? imgMaxWidth : note[id].imgWidth + 40}
          {...pick(this.props, keys(Canvas.propTypes))}
        />
      </SentenceArea>
    )
  }
}

TxtImgSeg.propTypes = {
  note: PropTypes.array,
  width: PropTypes.number,
  setting: PropTypes.object,
  setCurSegment: PropTypes.any,
  id: PropTypes.any,
  curSegmentNo: PropTypes.any,
  updateNote: PropTypes.func.isRequired,
  tabNodeList: PropTypes.array,
  setCurComponent: PropTypes.func,
  isBold: PropTypes.bool,
  isItalic: PropTypes.bool,
  isUnderline: PropTypes.bool,
  updateIsBold: PropTypes.func.isRequired,
  updateIsItalic: PropTypes.func.isRequired,
  updateIsUnderline: PropTypes.func.isRequired,
  updateCurColor: PropTypes.func.isRequired,
  oldSetting: PropTypes.object,
  setOldSetting: PropTypes.func.isRequired,
  isChangedFormat: PropTypes.bool,
  updateIsChangeFormat: PropTypes.func.isRequired,
  updateSetting: PropTypes.func.isRequired,
  onShowCannotChangeSettingAlertDialog: PropTypes.func.isRequired,
  setAlertMessage: PropTypes.func.isRequired,
  setOverPageId: PropTypes.func.isRequired,
  overPageId: PropTypes.number,
  updateWidth: PropTypes.func.isRequired,
  setMaxLineNumMessage: PropTypes.func.isRequired,
  ...Sentences.propTypes,
}

export default TxtImgSeg