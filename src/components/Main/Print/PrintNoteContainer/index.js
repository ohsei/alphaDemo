import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as Action from '../../../../redux/modules/printNote/action'
import PrintNote from '../PrintNote'

const mapStateToProps = ({printNote, main}) => {

  const note = main.note
  const title = main.saveFileTitle
  const setting = main.setting
  const namelist = [
    {id: 0, name: main.name},]
  const isPrint = main.isPrint
  const width = main.width
  const errorMessage = main.errorMessage
  const isLayoutError = main.isLayoutError

  return {
    ...printNote,
    note,
    title,
    setting,
    namelist,
    isPrint,
    width,
    errorMessage,
    isLayoutError
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Action, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrintNote)
