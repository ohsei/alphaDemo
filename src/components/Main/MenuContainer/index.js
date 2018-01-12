import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as Action from '../../../redux/modules/menu/action'
import Menu from '../Menu'

const mapStateToProps = ({menu, main}) => {
  const saveFileTitle = main.saveFileTitle
  const note = main.note
  const setting = main.setting
  const tabNodeList = main.tabNodeList
  const name = main.name
  return {
    saveFileTitle,
    note,
    setting,
    tabNodeList,
    name,
    ...menu
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Action, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu)
