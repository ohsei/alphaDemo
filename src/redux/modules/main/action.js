import {
  UPDATE_OVERWRITE_STATUS,
  UPDATE_CREATE_FILE_STATUS,
  UPDATE_OPEN_FILE_STATUS,
} from '../menu/action-type'

import {
  UPDATE_FILE_TITLE,
  UPDATE_NAME,
  UPDATE_PRINT,
  SET_CUR_SEGMENT_NO,
  SET_CUR_COMPONENT,
  UPDATE_NOTE,
  UPDATE_IS_BOLD,
  UPDATE_IS_ITALIC,
  UPDATE_IS_UNDERLINE,
  UPDATE_CUR_COLOR,
  SHOW_TITLE_ALERT_DIALOG,
  SHOW_SAVED_ALERT_DIALOG,
  SHOW_OVERWRITE_CONFIRM_DIALOG,
  SHOW_CREATE_FILE_CONFIRM_DIALOG,
  UPDATE_IS_NEW_FILE,
  UPDATE_IS_OPEN_FILE,
  SHOW_PRINT_ERROR_DIALOG,
  UPDATE_SETTING,
  UPDATE_WIDTH,
  UPDATE_JA_INPUTING,
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

export const updateNote = (obj) => {
  return {
    type: UPDATE_NOTE,
    payload: obj
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


export const updateOpenFileStatus = (status) => {
  return {
    type: UPDATE_OPEN_FILE_STATUS,
    payload: status
  }
}

export const updateIsNewFile = (status) => {
  return {
    type: UPDATE_IS_NEW_FILE,
    payload: status
  }
}

export const updateIsOpenFile = (status) => {
  return {
    type: UPDATE_IS_OPEN_FILE,
    payload: status
  }
}

export const onShowPrintErrorDialog = (status) => {
  return {
    type: SHOW_PRINT_ERROR_DIALOG,
    payload: status
  }
}

export const updateSetting = (setting, isChangeFormat) => {
  return {
    type: UPDATE_SETTING,
    payload: {
      setting,
      isChangeFormat
    }
  }
}

export const updateWidth = (width) => {
  return {
    type: UPDATE_WIDTH,
    payload: width
  }
}


export const updateJaInputing = (status) => {
  return {
    type: UPDATE_JA_INPUTING,
    payload: status
  }
}

