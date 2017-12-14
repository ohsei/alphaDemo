import {defaultNote, defaultSetting, defaultWidth, printPattern} from '../../../utils/const.js'

import {
  LOAD_FILE,
  SET_CUR_SEGMENT_NO,
  SET_CUR_COMPONENT,
  UPDATE_NOTE,
  UPDATE_PRINT,
  UPDATE_FILE_TITLE,
  UPDATE_SETTING,
  INIT_NOTE,
  UPDATE_TAB_NODE_LIST,
  UPDATE_WIDTH,
  UPDATE_IS_BOLD,
  UPDATE_IS_ITALIC,
  UPDATE_IS_UNDERLINE,
  UPDATE_CUR_COLOR,
  OFF_FORCECHANGE
} from './action-type'

const initialState = {
  saveFileTitle: '',
  setting: Object.assign({}, defaultSetting),
  note: [],
  curSegmentNo: 0,
  curComponent: null,
  isPrint: false,
  tabNodeList: [],
  width: defaultWidth,
  isBold: false,
  isItalic: false,
  isUnderline: false,
  curColor: 'rgb(0,0,0)',
  forceChange: false
}

const {assign} = Object

export default (state = initialState, action) => {
  const {payload} = action

  switch (action.type) {
  case LOAD_FILE:
    return assign({}, state, {
      setting: payload.setting,
      note: payload.note,
      curSegmentNo: payload.note.length - 1,
      saveFileTitle: payload.saveFileTitle,
      isShowFileDialog: false,
      forceChange: true,
    })

  case SET_CUR_SEGMENT_NO:
    return assign({}, state, {
      curSegmentNo: payload
    })

  case SET_CUR_COMPONENT:
    return assign({}, state, {
      curComponent: payload
    })

  case UPDATE_NOTE:
    return (() => {
      return assign({}, state, {
        note: payload,
        forceChange: true,
      })
    })()


  case UPDATE_PRINT:
    return assign({}, state, {
      isPrint: payload
    })

  case UPDATE_FILE_TITLE:
    return assign({}, state, {
      saveFileTitle: payload
    })

  case UPDATE_SETTING:
    return assign({}, state, {
      setting: payload
    })

  case INIT_NOTE:
    return (() => {
      const page = []
      const pattern = printPattern[payload]

      pattern.segments.map((s) => {
        const segment = Object.assign({}, defaultNote)
        segment.type = s.type
        segment.sentenceNum = s.sentencesNum
        page.push(segment)
      })
      const note = []
      note.push(page)

      return assign({}, state, {
        setting: Object.assign({}, defaultSetting),
        note: note,
        saveFileTitle: '',
        curSegmentNo: 0,
        curComponent: null,
        isPrint: false,
        curColor: 'rgb(0,0,0)',
        forceChange: true,
      })
    })()

  case UPDATE_TAB_NODE_LIST:
    return assign({}, state, {
      tabNodeList: payload
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
  default:
    return state
  }
}
