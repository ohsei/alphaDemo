import {
  SHOW_FILE_DIALOG,
  SET_IS_FILE_LIST_UPDATE,
} from '../fileDialog/action-type'
import {
  UPDATE_PRINT,
  UPDATE_SETTING,
  INIT_NOTE,
  UPDATE_WIDTH,
  SHOW_TITLE_ALERT_DIALOG,
  SHOW_SAVED_ALERT_DIALOG,
  SHOW_OVERWRITE_CONFIRM_DIALOG,
  SHOW_CREATE_FILE_CONFIRM_DIALOG,
  UPDATE_IS_NEW_FILE,
  UPDATE_IS_OPEN_FILE,
} from '../main/action-type'

import {
  SET_IS_SHOW_MENU,
  SET_OPERATEJSON,
  UPDATE_OVERWRITE_STATUS,
  UPDATE_CREATE_FILE_STATUS,
  UPDATE_OPEN_FILE_STATUS
} from './action-type'

export const onShowFileDialog = () => {
  return {
    type: SHOW_FILE_DIALOG,
    payload: true,
  }
}

export const onPrint = () => {
  return {
    type: UPDATE_PRINT,
    payload: true,
  }
}

export const onIsFilelistUpdate = () => {
  return {
    type: SET_IS_FILE_LIST_UPDATE,
    payload: true,
  }
}

export const updateSetting = (setting) => {
  return {
    type: UPDATE_SETTING,
    payload: setting
  }
}

export const initalNote = () => {
  return {
    type: INIT_NOTE,
  }
}

export const updateWidth = (width) => {
  return {
    type: UPDATE_WIDTH,
    payload: width
  }
}

export const onShowMenu = (isShowMenu) => {
  return {
    type: SET_IS_SHOW_MENU,
    payload: isShowMenu
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

export const setOperateJson = (operateJson) => {
  return {
    type: SET_OPERATEJSON,
    payload: operateJson
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

export const updateOpenFileStatus = (status) => {
  return {
    type: UPDATE_OPEN_FILE_STATUS,
    payload: status
  }
}