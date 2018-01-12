import {
  UPDATE_OVERWRITE_STATUS,
  UPDATE_CREATE_FILE_STATUS
} from '../menu/action-type'

import {
  UPDATE_FILE_TITLE,
  UPDATE_NAME,
  UPDATE_PRINT,
  SET_CUR_SEGMENT_NO,
  SET_CUR_COMPONENT,
  UPDATE_NOTE,
  UPDATE_TAB_NODE_LIST,
  UPDATE_IS_BOLD,
  UPDATE_IS_ITALIC,
  UPDATE_IS_UNDERLINE,
  UPDATE_CUR_COLOR,
  OFF_FORCECHANGE,
  ON_FORCECHANGE,
  SHOW_TITLE_ALERT_DIALOG,
  SHOW_SAVED_ALERT_DIALOG,
  SHOW_OVERWRITE_CONFIRM_DIALOG,
  SHOW_CREATE_FILE_CONFIRM_DIALOG
} from './action-type'

export const setFileTitle = (title) => {
  return {
    type: UPDATE_FILE_TITLE,
    payload: title
  }
}

export const setName = (name) => {
  return {
    type: UPDATE_NAME,
    payload: name
  }
}


export const printFinish = () => {
  return {
    type: UPDATE_PRINT,
    payload: false
  }
}

export const setCurSegment = (id) => {
  return {
    type: SET_CUR_SEGMENT_NO,
    payload: id
  }
}

export const setCurComponent = (component) => {
  return {
    type: SET_CUR_COMPONENT,
    payload: component
  }
}

export const updateNote = (note) => {
  return {
    type: UPDATE_NOTE,
    payload: note
  }
}

export const updateTabNodeList = (tabNodeList) => {
  return {
    type: UPDATE_TAB_NODE_LIST,
    payload: tabNodeList
  }
}

export const updateIsBold = (isBold) => {
  return {
    type: UPDATE_IS_BOLD,
    payload: isBold
  }
}

export const updateIsItalic = (isItalic) => {
  return {
    type: UPDATE_IS_ITALIC,
    payload: isItalic
  }
}

export const updateIsUnderline = (isUnderline) => {
  return {
    type: UPDATE_IS_UNDERLINE,
    payload: isUnderline
  }
}

export const updateCurColor = (curColor) => {
  return {
    type: UPDATE_CUR_COLOR,
    payload: curColor
  }
}

export const offForceChange = () => {
  return {
    type: OFF_FORCECHANGE,
  }
}

export const onForceChange = () => {
  return {
    type: ON_FORCECHANGE,
  }
}

export const onShowTitleAlertDialog = (status) => {
  return {
    type: SHOW_TITLE_ALERT_DIALOG,
    payload: status
  }
}

export const onShowSavedAlertDialog = (status) => {
  return {
    type: SHOW_SAVED_ALERT_DIALOG,
    payload: status
  }
}

export const onShowOverwriteConfirmDialog = (status) => {
  return {
    type: SHOW_OVERWRITE_CONFIRM_DIALOG,
    payload: status
  }
}

export const updateOverwriteStatus = (status) => {
  return {
    type: UPDATE_OVERWRITE_STATUS,
    payload: status
  }
}

export const updateCreateFileStatus = (status) => {
  return {
    type: UPDATE_CREATE_FILE_STATUS,
    payload: status
  }
}

export const onShowCreateFileConfirmDialog = (status) => {
  return {
    type: SHOW_CREATE_FILE_CONFIRM_DIALOG,
    payload: status
  }
}
