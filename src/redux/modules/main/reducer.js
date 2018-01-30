import {defaultNote, defaultSetting, defaultWidth, defaultPageHeight, landscapePageHeight} from '../../../utils/const.js'

import {
  LOAD_FILE,
  SET_CUR_SEGMENT_NO,
  SET_CUR_COMPONENT,
  UPDATE_NOTE,
  UPDATE_PRINT,
  UPDATE_FILE_TITLE,
  UPDATE_NAME,
  UPDATE_SETTING,
  INIT_NOTE,
  UPDATE_TAB_NODE_LIST,
  UPDATE_WIDTH,
  UPDATE_IS_BOLD,
  UPDATE_IS_ITALIC,
  UPDATE_IS_UNDERLINE,
  UPDATE_CUR_COLOR,
  OFF_FORCECHANGE,
  ON_FORCECHANGE,
  SHOW_TITLE_ALERT_DIALOG,
  SHOW_SAVED_ALERT_DIALOG,
  SHOW_OVERWRITE_CONFIRM_DIALOG,
  SHOW_CREATE_FILE_CONFIRM_DIALOG,
  UPDATE_IS_NEW_FILE,
  UPDATE_IS_OPEN_FILE,
  SHOW_ONLY_ENGLISH_ALERT_DIALOG,
  SHOW_ADD_SEGMENT_ALERT_DIALOG,
  UPDATE_OVER_ONE_PAGE,
  SET_OVER_PAGE_ID,
  UPDATE_IS_CHANGE_FORMAT,
  SET_OLD_SETTING,
  SHOW_CANNOT_CHANGE_SETTING_ALERT_DIALOG,
  SET_ALERT_MESSAGE,
  UPDATE_JA_INPUTING,
  UPDATE_IS_CHANGE_TYPE,
  SET_OLD_TYPE,
  FINISH_PRINT,
  SET_FOCUS_SEGMENT
} from './action-type'

const initialState = {
  saveFileTitle: '',
  name: '',
  setting: Object.assign({}, defaultSetting),
  oldSetting: Object.assign({}, defaultSetting),
  note: [Object.assign({}, defaultNote)],
  curSegmentNo: 0,
  curComponent: null,
  isPrint: false,
  tabNodeList: [],
  width: defaultWidth,
  isBold: false,
  isItalic: false,
  isUnderline: false,
  curColor: 'rgb(0,0,0)',
  forceChange: false,
  errorMessage: '',
  isShowTitleAlert: false,
  isShowSavedAlert: false,
  isShowOverwriteConfirm: false,
  isShowCreateFileConfirm: false,
  isNewFile: false,
  isOpenFile: false,
  isShowOnlyEnglishAlert: false,
  isShowAddSegmentAlert: false,
  isOverOnePage: false,
  overPageId: 0,
  isChangedFormat: false,
  isShowCannotChangeSettingAlert: false,
  alertMessage: '',
  isJaInputing: false,
  isOmitZenkaku: false,
  isChangedType: false,
  oldType: 'txtOnly',
  focusId: -1
}

const {assign} = Object

export default (state = initialState, action) => {
  const {payload} = action

  switch (action.type) {
  case LOAD_FILE:
    return (() => {
      return assign({}, state, {
        setting: payload.setting,
        name: payload.name,
        note: payload.note,
        tabNodeList: payload.tabNodeList,
        curSegmentNo: payload.note.length - 1,
        saveFileTitle: payload.saveFileTitle,
        isShowFileDialog: false,
        forceChange: true,
      })
    })()

  case SET_CUR_SEGMENT_NO:
    return assign({}, state, {
      curSegmentNo: payload
    })

  case SET_CUR_COMPONENT:
    return assign({}, state, {
      curComponent: payload
    })

  case UPDATE_NOTE:
    return assign({}, state, {
      note: payload,
    })

  case FINISH_PRINT:
    return (() => {
      const {note} = state
      let newNote = []

      for (let i = 0;i < note.length;i++) {
        newNote.push(note[i])

        if (note[i].isPageBreak) {
          newNote[i].isPageBreak = false
        }
      }

      return assign({}, state, {
        isPrint: false,
        note: newNote,
      })
    })()

  case UPDATE_PRINT:
    return (() => {
      const {note, setting} = state
      let maxPageHeight = defaultPageHeight
      let errorMessage = ''

      if (setting.layout !== 'portrait') {
        maxPageHeight = landscapePageHeight
        errorMessage = 'A4横のプリントレイアウトです。プリンタの用紙設定が「横」になっていることを確認してから、印刷を実行してください。'
      }
      let pageHeight = 0
      let newNote = note.slice()
      const pages = [[]]

      let pageNum = 0

      let pageInterval = 0

      if (parseFloat(setting.interval) == 1.5) {
        pageInterval = 40
      }
      else if (parseFloat(setting.interval) == 2) {
        pageInterval = 80
      }
      else if (parseFloat(setting.interval) == 2.5) {
        pageInterval = 120
      }
      else if (parseFloat(setting.interval) == 3) {
        pageInterval = 160
      }

      for (let i = 0;i < note.length; i++) {
        if (note[i].segmentHeight > maxPageHeight) {
          errorMessage = `第${i + 1}セグメントの文章が１ページの範囲を超えているため、印刷レイアウトが崩れる可能性があります。`
        }
        pageHeight = note[i].segmentHeight + pageHeight

        if (pageHeight > maxPageHeight) {
          if (i > 0){
            newNote[i - 1].isPageBreak = true
            pages.push([i])
            pageNum++
            pageHeight = note[i].segmentHeight
          }
          else if (i == 0 ){
            newNote[i].isPageBreak = true
            pages[pageNum].push(i)
            pages.push([])
            pageNum++
            pageHeight = 0
          }
          else if (note[i].isUserPageBreak) {
            pages.push([])
          }
        }
        else {
          pageHeight = pageHeight + pageInterval

          if ((pageHeight > maxPageHeight) && (note.length > 1)) {
            if (i > 0){
              newNote[i - 1].isPageBreak = true
              pages.push([i])
              pageNum++
              pageHeight = note[i].segmentHeight
            }
            else if (i == 0 ){
              newNote[i].isPageBreak = true
              pages[pageNum].push(i)
              pages.push([])
              pageNum++
              pageHeight = 0
            }
            else if (note[i].isUserPageBreak) {
              pages.push([])
            }
          }
          else {
            pages[pageNum].push(i)

            if (note[i].isUserPageBreak) {
              pageNum++
              pages.push([])
              pageHeight = 0
            }
          }
        }
      }
      return assign({}, state, {
        isPrint: payload,
        note: newNote,
        errorMessage
      })
    })()


  case UPDATE_FILE_TITLE:
    return assign({}, state, {
      saveFileTitle: payload
    })

  case UPDATE_NAME:
    return assign({}, state, {
      name: payload
    })

  case UPDATE_SETTING:
    return assign({}, state, {
      setting: payload
    })

  case INIT_NOTE:
    return (() => {
      return assign({}, state, {
        setting: Object.assign({}, defaultSetting),
        width: defaultWidth,
        note: [Object.assign({}, defaultNote)],
        saveFileTitle: '',
        curSegmentNo: 0,
        curComponent: null,
        isPrint: false,
        curColor: 'rgb(0,0,0)',
        forceChange: true,
        tabNodeList: [],
        name: ''
      })
    })()

  case UPDATE_TAB_NODE_LIST:
    return assign({}, state, {
      tabNodeList: payload,
    })

  case UPDATE_WIDTH:
    return assign({}, state, {
      width: payload
    })

  case UPDATE_IS_BOLD:
    return assign({}, state, {
      isBold: payload
    })

  case UPDATE_IS_ITALIC:
    return assign({}, state, {
      isItalic: payload
    })

  case UPDATE_IS_UNDERLINE:
    return assign({}, state, {
      isUnderline: payload
    })

  case UPDATE_CUR_COLOR:
    return assign({}, state, {
      curColor: payload
    })

  case OFF_FORCECHANGE:
    return assign({}, state, {
      forceChange: false
    })

  case ON_FORCECHANGE:
    return assign({}, state, {
      forceChange: true
    })

  case SHOW_TITLE_ALERT_DIALOG:
    return assign({}, state, {
      isShowTitleAlert: payload
    })

  case SHOW_ONLY_ENGLISH_ALERT_DIALOG:
    return assign({}, state, {
      isShowOnlyEnglishAlert: payload
    })

  case SHOW_SAVED_ALERT_DIALOG:
    return assign({}, state, {
      isShowSavedAlert: payload
    })

  case SHOW_OVERWRITE_CONFIRM_DIALOG:
    return assign({}, state, {
      isShowOverwriteConfirm: payload
    })

  case SHOW_CREATE_FILE_CONFIRM_DIALOG:
    return assign({}, state, {
      isShowCreateFileConfirm: payload
    })

  case UPDATE_IS_NEW_FILE:
    return assign({}, state, {
      isNewFile: payload
    })

  case UPDATE_IS_OPEN_FILE:
    return assign({}, state, {
      isOpenFile: payload
    })

  case SHOW_ADD_SEGMENT_ALERT_DIALOG:
    return assign({}, state, {
      isShowAddSegmentAlert: payload
    })

  case UPDATE_OVER_ONE_PAGE:
    return assign({}, state, {
      isOverOnePage: payload
    })

  case SET_OVER_PAGE_ID:
    return assign({}, state, {
      overPageId: payload
    })

  case UPDATE_IS_CHANGE_FORMAT:
    return assign({}, state, {
      isChangedFormat: payload
    })

  case UPDATE_IS_CHANGE_TYPE:
    return assign({}, state, {
      isChangedType: payload
    })

  case SET_OLD_SETTING:
    return assign({}, state, {
      oldSetting: payload
    })

  case SHOW_CANNOT_CHANGE_SETTING_ALERT_DIALOG:
    return assign({}, state, {
      isShowCannotChangeSettingAlert: payload
    })

  case SET_ALERT_MESSAGE:
    return assign({}, state, {
      alertMessage: payload
    })

  case UPDATE_JA_INPUTING:
    return assign({}, state, {
      isJaInputing: payload
    })

  case SET_OLD_TYPE:
    return assign({}, state, {
      oldType: payload
    })

  case SET_FOCUS_SEGMENT:
    return assign({}, state, {
      focusId: payload
    })
  default:
    return state
  }
}
