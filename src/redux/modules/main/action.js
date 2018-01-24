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
  UPDATE_TAB_NODE_LIST,
  UPDATE_IS_BOLD,
  UPDATE_IS_ITALIC,
  UPDATE_IS_UNDERLINE,
  UPDATE_CUR_COLOR,
  OFF_FORCECHANGE,
  ON_FORCECHANGE,
  SHOW_TITLE_ALERT_DIALOG,
  SHOW_ONLY_ENGLISH_ALERT_DIALOG,
  SHOW_SAVED_ALERT_DIALOG,
  SHOW_OVERWRITE_CONFIRM_DIALOG,
  SHOW_CREATE_FILE_CONFIRM_DIALOG,
  UPDATE_IS_NEW_FILE,
  UPDATE_IS_OPEN_FILE,
  SHOW_ADD_SEGMENT_ALERT_DIALOG,
  UPDATE_OVER_ONE_PAGE,
  SET_OVER_PAGE_ID,
  UPDATE_SETTING,
  UPDATE_IS_CHANGE_FORMAT,
  SET_OLD_SETTING,
  SHOW_CANNOT_CHANGE_SETTING_ALERT_DIALOG,
  SET_ALERT_MESSAGE,
  UPDATE_WIDTH,
  SET_MAX_LINE_NUM_MESSAGE,
  UPDATE_JA_INPUTING,
  UPDATE_OMIT_ZENKAKU,
  UPDATE_IS_CHANGE_NOTE,
  SET_OLD_TYPE,
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

export const onShowOnlyEnglishAlertDialog = (status) => {
  return {
    type: SHOW_ONLY_ENGLISH_ALERT_DIALOG,
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

export const onShowAddSegmentAlertDialog = (status) => {
  return {
    type: SHOW_ADD_SEGMENT_ALERT_DIALOG,
    payload: status
  }
}

export const onShowCannotChangeSettingAlertDialog = (status) => {
  return {
    type: SHOW_CANNOT_CHANGE_SETTING_ALERT_DIALOG,
    payload: status
  }
}

export const updateOverOnePage = (status) => {
  return {
    type: UPDATE_OVER_ONE_PAGE,
    payload: status
  }
}

export const setOverPageId = (id) => {
  return {
    type: SET_OVER_PAGE_ID,
    payload: id
  }
}

export const updateSetting = (setting) => {
  return {
    type: UPDATE_SETTING,
    payload: setting
  }
}

export const updateIsChangeFormat = (isChangedFormat) => {
  return {
    type: UPDATE_IS_CHANGE_FORMAT,
    payload: isChangedFormat
  }
}

export const updateIsChangeNote = (isChangedNote) => {
  return {
    type: UPDATE_IS_CHANGE_NOTE,
    payload: isChangedNote
  }
}
export const setOldSetting = (oldSetting) => {
  return {
    type: SET_OLD_SETTING,
    payload: oldSetting
  }
}

export const setAlertMessage = (alertMessage) => {
  return {
    type: SET_ALERT_MESSAGE,
    payload: alertMessage
  }
}

export const updateWidth = (width) => {
  return {
    type: UPDATE_WIDTH,
    payload: width
  }
}

export const setMaxLineNumMessage = (message) => {
  return {
    type: SET_MAX_LINE_NUM_MESSAGE,
    payload: message
  }
}

export const updateJaInputing = (status) => {
  return {
    type: UPDATE_JA_INPUTING,
    payload: status
  }
}

export const updateOmitZenkaku = (status) => {
  return {
    type: UPDATE_OMIT_ZENKAKU,
    payload: status
  }
}

export const setOldType = (oldType) => {
  return {
    type: SET_OLD_TYPE,
    payload: oldType
  }
}