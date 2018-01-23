/* メイン画面用コンポーネント */
import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import PropTypes from 'prop-types'
import {pick, keys} from 'lodash'

import Flines_block_Regular_font1 from '../../resources/font/4lines_2018-Regular.ttf'
import Flines_block_Regular_font2 from '../../resources/font/4lines_block-Regular.ttf'
import ColorPicker from '../../utils/ColorPicker'

import MenuContainer from './MenuContainer'
import Segments from './Note/Segments'
import PrintNoteContainer from './Print/PrintNoteContainer'
import FileDialogContainer from './FileDialogContainer'
import TitleAlertDialog from './TitleAlertDialog'
import FileSavedAlertDialog from './FileSavedAlertDialog'
import OverwriteConfirmDialog from './OverwriteConfirmDialog'
import EditingConfirmDialog from './EditingConfirmDialog'
import OnlyEnglishAlertDialog from './OnlyEnglishAlertDialog'
import AddSegmentAlertDialog from './AddSegmentAlertDialog'
import CannotChangeSettingAlertDialog from './CannotChangeSettingAlertDialog'

injectGlobal`
  @font-face {
    font-family: 'MyFamilyFont1';
    src: url('${Flines_block_Regular_font1}');
  }
  @font-face {
    font-family: 'MyFamilyFont2';
    src: url('${Flines_block_Regular_font2}');
  }
`
/* define layout start*/
const DivBg = styled.div.attrs({
  tabIndex: -1,
})`
  display: ${props => props.isPrint ? 'none' : 'block'};
  position: relative;
  background-color: #E2FFF4;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: none;
`
const DivFixed = styled.div.attrs({
  tabIndex: -1,
})`
  position: fixed;
  width: 100%;
  z-index: 9;
  top: 0;
  left: 0;
  height: 65px;
  background-color: #E2FFF4;
`
const DivMenu = styled.div.attrs({
  tabIndex: -1,
})`
  position: fixed;
  z-index: 999;
  top: 60px;
  left: 5px;
`
const StyleEditArea = styled.div.attrs({
  tabIndex: -1,
})`
  position: fixed;
  display: flex;
  top: 60px;
  left: 50px;
  width: 100%;
  padding: 10px 0px 20px 0px;
  height: 50px;
  background-color: #E2FFF4;
`
const DivSegments = styled.div`
  z-index: 0;
  margin: 150px 0 0 50px;
  width: ${props => `${props.width}px`};

  @media print{
    margin: 0;
    padding: 0;
  }
`
const DisabledColor = styled.div.attrs({
  tabIndex: -1,
})`
  width: 55px;
  height: 50px;
  background-color: gray;
`
const Button = styled.button.attrs({
  tabIndex: -1,
})`
  width: 50px;
  height: 50px;
  border: ${props => {if (props.active == true) {return '2px solid black'} else {return '1px solid lightgray'}}};
  font-size: 1.5em;
  color: #aaa;
  text-align: center;
  text-decoration: ${props => {if (props.active == true) {return 'underline'} else {return 'none'}}};
  background-color: white;
`
const DivFixedTitle = styled.div.attrs({
  tabIndex: -1,
})`
  width: 418px;
  height: 40px;
  color: white;
  text-align: center;
  position: fixed;
  top: 14px;
  left: 14px;
`
const InFileTitle = styled.input.attrs({
  tabIndex: -1,
  maxLength: 25,
})`
  position: fixed;
  top: 14px;
  left: 450px;
  width: 600px;
  height: 40px;
  font-size: 24px;
  border: 2px solid #FFAE72;
  background-color: white;
`
const InName = styled.input.attrs({
  tabIndex: -1,
  maxLength: 15
})`
  position: fixed;
  top: 75px;
  left: 700px;
  width: 350px;
  height: 40px;
  font-size: 24px;
  border: 2px solid #FFAE72;
  background-color: white;
`
/* define layout end*/

const PrintOrientation = (object) => {
  if (object.layout === 'landscape'){
    return (
      <style type='text/css'>
        {'@media print{@page {size: A4 landscape; margin: 0}}'}
      </style>
    )
  }
  else {
    return (
      <style type='text/css'>
        {'@media print{@page {size: A4 portrait; margin: 0}}'}
      </style>
    )
  }
}

class Main extends Component {
  constructor (props){
    super(props)
    /* 色設定 */
    this.setColor = this.setColor.bind(this)
    /* Bold設定 */
    this.setBold = this.setBold.bind(this)
    /* italic設定 */
    this.setItalic = this.setItalic.bind(this)
    /* underline設定 */
    this.setUnderline = this.setUnderline.bind(this)
  }

  static propTypes = {
    width: PropTypes.number,
    note: PropTypes.array,
    setting: PropTypes.object,
    isShowFileDialog: PropTypes.bool,
    curSegmentNo: PropTypes.number,
    saveFileTitle: PropTypes.string,
    setFileTitle: PropTypes.func.isRequired,
    isPrint: PropTypes.bool,
    printFinish: PropTypes.func.isRequired,
    curComponent: PropTypes.object,
    isBold: PropTypes.bool,
    isItalic: PropTypes.bool,
    isUnderline: PropTypes.bool,
    curColor: PropTypes.string,
    forceChange: PropTypes.bool,
    offForceChange: PropTypes.func.isRequired,
    setName: PropTypes.func.isRequired,
    name: PropTypes.string,
    isJaInputing: PropTypes.bool,
  }
  setName = (event) => {
    const {setName} = this.props
    setName(event.target.value)
  }
  setFileTitle = (event) => {
    const {setFileTitle} = this.props
    setFileTitle(event.target.value)
  }
  setBold = () => {
    const {curComponent} = this.props
    curComponent.setBold()
  }
  setItalic (){
    const {curComponent} = this.props
    curComponent.setItalic()
  }
  setUnderline (){
    const {curComponent} = this.props
    curComponent.setUnderline()
  }
  setColor (color){
    const {curComponent} = this.props
    curComponent.setColor(color)
  }

  componentWillReceiveProps (nextProps) {
    const {curColor} = this.props

    if (nextProps.curColor && (nextProps.curColor !== curColor)) {
      this.colorChange.setColor(nextProps.curColor)
    }
  }
  componentDidMount () {
  }
  render () {
    const { isPrint, setting, width, isBold, isItalic, isUnderline, isJaInputing, saveFileTitle, name} = this.props
    return (
      <div>
        <PrintOrientation layout={setting.layout} />
        {!isPrint && <DivBg style={{minWidth: width}} >
          <DivFixed>
            <DivFixedTitle style={{backgroundImage: `url(${require('../../resources/img/4line_logo.png')})`}}></DivFixedTitle>
            <InFileTitle
              type='text'
              placeholder='名称未設定'
              name='title'
              ref={(ref) => {this.saveFileTitle = ref}}
              onChange={this.setFileTitle}
              onKeyDown={this.onKeyDown}
              value={saveFileTitle}
            />
            <DivMenu>
              <MenuContainer />
            </DivMenu>
            <StyleEditArea>
              {!isJaInputing && <ColorPicker
                tabIndex={-1}
                ref={ref => this.colorChange = ref}
                setColor={this.setColor}
              />}
              {isJaInputing && <DisabledColor />}
              <Button
                disabled={isJaInputing ? true : false}
                active={isBold}
                innerRef={ref => this.boldChange = ref}
                onClick={this.setBold}>
                B
              </Button>
              <Button
                disabled={isJaInputing ? true : false}
                active={isItalic}
                innerRef={ref => this.italicChange = ref}
                onClick={this.setItalic}>
                /
              </Button>
              <Button
                disabled={isJaInputing ? true : false}
                active={isUnderline}
                ref={ref => this.underlineChange = ref}
                onClick={this.setUnderline}>
                U
              </Button>
            </StyleEditArea>
            <InName
              type='text'
              ref={ref => this.name = ref}
              name='name'
              placeholder='名前'
              onChange={this.setName}
              onKeyDown={this.onNameKeyDown}
              value={name}
            />
          </DivFixed>
          <DivSegments
            innerRef={(ref) => {this.allSegs = ref}}
            width={width}>
            <Segments {...pick(this.props, keys(Segments.propTypes))} />
          </DivSegments>
          <TitleAlertDialog {...pick(this.props, keys(TitleAlertDialog.propTypes))} />
          <FileSavedAlertDialog {...pick(this.props, keys(FileSavedAlertDialog.propTypes))} />
          <OverwriteConfirmDialog {...pick(this.props, keys(OverwriteConfirmDialog.propTypes))} />
          <EditingConfirmDialog {...pick(this.props, keys(EditingConfirmDialog.propTypes))} />
          <OnlyEnglishAlertDialog {...pick(this.props, keys(OnlyEnglishAlertDialog.propTypes))} />
          <AddSegmentAlertDialog {...pick(this.props, keys(AddSegmentAlertDialog.propTypes))} />
          <CannotChangeSettingAlertDialog {...pick(this.props, keys(CannotChangeSettingAlertDialog.propTypes))} />
          <FileDialogContainer />
        </DivBg>}
        {isPrint && <PrintNoteContainer />}
      </div>
    )
  }
}

export default Main

