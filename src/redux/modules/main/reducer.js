import {defaultNote, defaultSetting, defaultWidth} from '../../../utils/const.js'

import {
  LOAD_FILE,
  SET_CUR_SEGMENT_NO,
  SET_CUR_COMPONENT,
  UPDATE_NOTE,
  UPDATE_PAGES,
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
  OFF_FORCECHANGE,
  SET_CUR_PAGE_NO
} from './action-type'

const initialState = {
  saveFileTitle: '',
  setting: Object.assign({}, defaultSetting),
  note: [Object.assign({}, defaultNote)],
  pages: [[]],
  curSegmentNo: 0,
  curPageNo: 0,
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

const createTabNodeList = (note, setting) => {
  let tabNodeList = []

  for (let i = 0;i < note.length; i++) {
    if (note[i].type != 'imgOnly') {
      let node = []

      if (setting.jaPos == 'up') {
        node = [
          {label: 'up', node: null},
          {label: 'en', node: null}
        ]
      }
      else {
        node = [
          {label: 'en', node: null},
          {label: 'down', node: null}
        ]
      }
      tabNodeList.push({id: i, node: node})
    }
  }
  return tabNodeList
}

export default (state = initialState, action) => {
  const {payload} = action

  switch (action.type) {
  case LOAD_FILE:
    return (() => {
      return assign({}, state, {
        setting: payload.setting,
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

  case SET_CUR_PAGE_NO:
    return assign({}, state, {
      curPageNo: payload
    })

  case SET_CUR_COMPONENT:
    return assign({}, state, {
      curComponent: payload
    })

  case UPDATE_NOTE:
    return assign({}, state, {
      note: payload,
      forceChange: true,
    })

  case UPDATE_PAGES:
    return assign({}, state, {
      pages: payload,
    })

  case UPDATE_PRINT:
    return (() => {
      const {note, pages} = state
      let pageHeight = 0
      const newNote = note.slice()
      const newPages = pages.slice()

      let pageNum = 0


      for (let i = 0;i < note.length; i++) {
        pageHeight = note[i].segmentHeight + pageHeight

        if (pageHeight > 1607) {
          newNote[i - 1].isPageBreak = true
          newPages.push([i])
          pageNum++
          pageHeight = 0
        }
        else {
          newPages[pageNum].push(i)
        }
      }
      return assign({}, state, {
        isPrint: payload,
        note: newNote
      })
    })()


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
      return assign({}, state, {
        setting: Object.assign({}, defaultSetting),
        note: [Object.assign({}, defaultNote)],
        saveFileTitle: '',
        curSegmentNo: 0,
        curComponent: null,
        isPrint: false,
        curColor: 'rgb(0,0,0)',
        forceChange: true,
        pages: []
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
  default:
    return state
  }
}
