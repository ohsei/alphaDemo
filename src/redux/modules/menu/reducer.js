import {
  SET_IS_SHOW_MENU,
  SET_OPERATEJSON,
  UPDATE_OVERWRITE_STATUS,
  UPDATE_CREATE_FILE_STATUS,
  UPDATE_OPEN_FILE_STATUS
} from './action-type'

const initialState = {
  isShowMenu: false,
  operateJson: {},
  isOverwrite: false,
  isOkToCreateFile: false,
  isOkToOpenFile: false,
}

const {assign} = Object

export default (state = initialState, action) => {
  const {payload} = action

  switch (action.type) {

  case SET_IS_SHOW_MENU:
    return assign({}, state, {
      isShowMenu: payload
    })
  case SET_OPERATEJSON:
    return assign({}, state, {
      operateJson: payload
    })
  case UPDATE_OVERWRITE_STATUS:
    return assign({}, state, {
      isOverwrite: payload
    })
  case UPDATE_CREATE_FILE_STATUS:
    return assign({}, state, {
      isOkToCreateFile: payload
    })    
    
  case UPDATE_OPEN_FILE_STATUS:
    return assign({}, state, {
      isOkToOpenFile: payload
    })
  default:
    return state
  }
}
