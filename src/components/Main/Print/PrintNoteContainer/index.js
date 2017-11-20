import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as Action from '../../../../redux/modules/printNote/action'
import PrintNote from '../PrintNote'

const mapStateToProps = ({printNote, main}) => {

  const note = main.note
  const title = main.saveFileTitle
  const setting = main.setting
  const namelist = [
    {id: 0, name: '四線太郎'},
    {id: 1, name: '四線次郎'},
    {id: 2, name: '四線三郎'},]
  const isPrint = main.isPrint
  const width = main.width

  return {
    ...printNote,
    note,
    title,
    setting,
    namelist,
    isPrint,
    width,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Action, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrintNote)
