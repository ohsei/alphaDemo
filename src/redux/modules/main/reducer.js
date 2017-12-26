import {defaultNote, defaultSetting, defaultWidth, defaultPageHeight, landscapePageHeight} from '../../../utils/const.js'

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
  OFF_FORCECHANGE,
  ON_FORCECHANGE
} from './action-type'

const initialState = {
  saveFileTitle: '',
  setting: Object.assign({}, defaultSetting),
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
  errorMessage: ''
}

const {assign} = Object

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

  case SET_CUR_COMPONENT:
    return assign({}, state, {
      curComponent: payload
    })

  case UPDATE_NOTE:
    return assign({}, state, {
      note: payload,
    })

  case UPDATE_PRINT:
    return (() => {
      const {note, setting} = state
      let maxPageHeight = defaultPageHeight
      if (setting.layout != 'portrait') {
        maxPageHeight = landscapePageHeight
      }
      let pageHeight = 0
      const newNote = note.slice()
      const pages = [[]]
      let errorMessage = ''
      let pageNum = 0

      for (let i = 0;i < note.length; i++) {
        if (note[i].segmentHeight > maxPageHeight) {
          errorMessage = `第${i+1}セグメントの文章が一ページの範囲を超えているため、印刷レイアウトが崩れる可能性があります。`
        }
        pageHeight = note[i].segmentHeight + pageHeight

        if (pageHeight > maxPageHeight) {
          if (i > 0){
            newNote[i - 1].isPageBreak = true
            pages.push([i])
            pageNum++
            pageHeight = 0
          }
          else if (i == 0 ){
            newNote[i].isPageBreak = true
            pages[pageNum].push(i)
            pages.push([])
            pageNum++
            pageHeight = 0
          }
          else if (note[i].isPageBreak) {
            pages.push([])
          }
        }
        else {
          pages[pageNum].push(i)

          if (note[i].isPageBreak) {
            pageNum++
            pages.push([])
            pageHeight = 0
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
  default:
    return state
  }
}
