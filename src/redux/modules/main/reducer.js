import {defaultNote, defaultSetting, defaultWidth, defaultPageHeight, landscapePageHeight, landscapeWidth} from '../../../utils/const.js'

import {
  LOAD_FILE,
  SET_CUR_SEGMENT_NO,
  SET_CUR_COMPONENT,
  UPDATE_NOTE,
  UPDATE_PRINT,
  FINISH_PRINT,
  UPDATE_FILE_TITLE,
  UPDATE_NAME,
  UPDATE_SETTING,
  INIT_NOTE,
  UPDATE_WIDTH,
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
  UPDATE_JA_INPUTING,
} from './action-type'

const initialState = {
  saveFileTitle: '',
  name: '',
  setting: Object.assign({}, defaultSetting),
  note: [Object.assign({}, defaultNote)],
  curSegmentNo: 0,
  curComponent: null,
  isPrint: false,
  width: defaultWidth,
  isBold: false,
  isItalic: false,
  isUnderline: false,
  curColor: 'rgb(0,0,0)',
  errorMessage: '',
  isShowTitleAlert: false,
  isShowSavedAlert: false,
  isShowOverwriteConfirm: false,
  isShowCreateFileConfirm: false,
  isNewFile: false,
  isOpenFile: false,
  isShowPrintErrorDialog: false,
  alertMessage: '',
  maxLineNumMessage: '',
  isJaInputing: false,
  isLayoutError: false,
  printCheckErrorMessage: '',
}

const {assign} = Object

const updateSegment = (segment, note, id) => {
  const newNote = []

  for (let i = 0;i < note.length; i++) {
    if (i == id) {
      newNote.push(segment)
    }
    else {
      newNote.push(note[i])
    }
  }
  return newNote
}

const addSegment = (note, id) => {
  const newNote = []

  for (let i = 0;i < note.length;i++){
    newNote.push(note[i])

    if (i > id) {
      newNote[i].id = newNote[i].id + 1
    }
  }
  const curNo = id + 1
  newNote.splice(curNo, 0, Object.assign({}, defaultNote))
  newNote[curNo].id = curNo
  return newNote
}

const delSegment = (note, id) => {
  const newNote = []

  for (let i = 0;i < note.length;i++){
    newNote.push(note[i])

    if (i > id) {
      newNote[i].id = newNote[i].id - 1
    }
  }
  newNote.splice(id, 1)
  return newNote
}

const addPageBreak = (note, id) => {
  const newNote = []

  for (let i = 0;i < note.length;i++){
    newNote.push(note[i])

    if (i == id) {
      newNote[i].isUserPageBreak = true
    }

    if (i > id) {
      newNote[i].id = newNote[i].id + 1
    }
  }
  const curNo = id + 1
  newNote.splice(curNo, 0, Object.assign({}, defaultNote))
  newNote[curNo].id = curNo
  return newNote
}

const checkSegmentHeight = (note, maxPageHeight) => {
  let resultList = ''
  for (let i = 0;i < note.length; i++) {
    if (note[i].segmentHeight > maxPageHeight) {
      if (resultList == '') {
        resultList = `${i + 1}`
      }
      else {
        resultList = `${resultList}、${i + 1}`
      }
    } 
  }
  return resultList
}

export default (state = initialState, action) => {
  const {payload} = action

  switch (action.type) {
  case LOAD_FILE:
    return (() => {
      return assign({}, state, {
        setting: payload.setting,
        oldSetting: payload.setting,
        oldWidth: payload.setting.layout === 'portrait' ? defaultWidth : landscapeWidth,
        width: payload.setting.layout === 'portrait' ? defaultWidth : landscapeWidth,
        name: payload.name,
        note: payload.note,
        curSegmentNo: payload.note.length - 1,
        saveFileTitle: payload.saveFileTitle,
        isShowFileDialog: false,
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
    return (() => {
      const {note} = state
      const pattern = payload.pattern
      const id = payload.id
      let segment = Object.assign({}, note[id])
      let newNote = []

      switch (pattern) {
      case 'ja':
        segment.jaHeight = payload.jaHeight
        segment.jaHtml = payload.jaHtml
        newNote = updateSegment(segment, note, id)
        break

      case 'en':
        segment.html = payload.html
        segment.enHeight = payload.enHeight
        newNote = updateSegment(segment, note, id)
        break

      case 'segmentHeight':
        segment.segmentHeight = payload.segmentHeight
        newNote = updateSegment(segment, note, id)
        break

      case 'type':
        segment.type = payload.type

        if (payload.type == 'txtOnly') {
          segment.dataUrl = ''
          segment.imgWidth = 0
          segment.imgHeight = 0
          segment.posX = 20
          segment.posY = 20
        }
        else if ((payload.type == 'txtImg') || (payload.type == 'imgTxt')) {
          segment.imgWidth = 0
          segment.imgHeight = 0
          segment.posX = 20
          segment.posY = 20
        }
        else if (payload.type == 'imgOnly') {
          segment.html = ''
          segment.imgWidth = 0
          segment.imgHeight = 0
          segment.posX = 0
          segment.posY = 0
          segment.enHeight = 0
          segment.jaHtml = ''
          segment.jaHeight = 0
        }
        newNote = updateSegment(segment, note, id)
        break

      case 'add':
        newNote = addSegment(note, id)
        break

      case 'del':
        newNote = delSegment(note, id)
        break

      case 'loadImg':
        segment.dataUrl = payload.dataUrl
        segment.imgWidth = 0
        segment.imgHeight = 0
        segment.posX = 20
        segment.posY = 20

        newNote = updateSegment(segment, note, id)
        break

      case 'upImg':
        segment.imgWidth = payload.imgWidth
        segment.imgHeight = payload.imgHeight
        segment.posX = payload.posX
        segment.posY = payload.posY

        newNote = updateSegment(segment, note, id)
        break

      case 'imgLoading':
        segment.isImgLoading = payload.isImgLoading
        newNote = updateSegment(segment, note, id)
        break

      case 'addBreak':
        newNote = addPageBreak(note, id)
        break

      case 'delBreak':
        segment.isPageBreak = false
        segment.isUserPageBreak = false
        newNote = updateSegment(segment, note, id)
        break
      }

      return assign({}, state, {
        note: newNote
      })
    })()

  case FINISH_PRINT:
    return (() => {
      const {note} = state
      const isPrinted = payload
      let newNote = []

      for (let i = 0;i < note.length; i++) {
        newNote.push(note[i])

        if (!isPrinted && note[i].isPageBreak) {
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
      let errorSegmentList = ''
      let printCheckErrorSegmentList = ''
      let isLayoutError = false

      if (setting.layout !== 'portrait') {
        maxPageHeight = landscapePageHeight
      }
      printCheckErrorSegmentList = checkSegmentHeight(note, maxPageHeight)

      if (printCheckErrorSegmentList !== '')
      {
        return assign({}, state, {
          isPrint: false,
          isShowPrintErrorDialog: true,
          printCheckErrorMessage: {
            header: `${printCheckErrorSegmentList}行目の編集ボックスのテキストの量を調整してください。 <br />「画像＋テキスト」のレイアウトでは、テキストのみの場合よりも表示できる文字数が少なくなります。`,
            content: '※<br />「画像＋テキスト」 のレイアウトで入力できるテキスト量は、およそその ６割 程度になります。<br />読み込んだのち、画像の縮小等の調整により、入力できるテキスト量は変化します。<br />（テキスト入力の目安については、ヘルプを参照してください）',
          }
        })
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
          if (errorSegmentList == '') {
            errorSegmentList = `${i + 1}`
          }
          else {
            errorSegmentList = `${errorSegmentList}、${i + 1}`
          }
          isLayoutError = true
        }
        pageHeight = note[i].segmentHeight + pageHeight

        if (pageHeight > maxPageHeight) {
          if (i > 0){
            if (!newNote[i - 1].isUserPageBreak) {
              newNote[i - 1].isPageBreak = true
            }
            pages.push([i])
            pageNum++
            pageHeight = note[i].segmentHeight
          }
          else if (i == 0 ){
            if (!newNote[i].isUserPageBreak) {
              newNote[i].isPageBreak = true
            }
            pages[pageNum].push(i)
            pages.push([])
            pageNum++
            pageHeight = 0
          }
        }
        else {
          pageHeight = pageHeight + pageInterval

          if (pageHeight > maxPageHeight) {
            if (i > 0){
              if (!newNote[i - 1].isUserPageBreak) {
                newNote[i - 1].isPageBreak = true
              }
              pages.push([i])
              pageNum++
              pageHeight = note[i].segmentHeight
            }
            else if (i == 0 ){
              if (!newNote[i].isUserPageBreak) {
                newNote[i].isPageBreak = true
              }
              pages[pageNum].push(i)
              pages.push([])
              pageNum++
              pageHeight = 0
            }
          }
          else {
            pages[pageNum].push(i)

            if (note[i].isPageBreak || note[i].isUserPageBreak) {
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
        errorMessage: `第${errorSegmentList}編集ボックスの内容が一ページの範囲を超えているため、印刷をキャンセルして、内容を調整してください。`,
        isLayoutError
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
    return (() => {
      const {note} = state

      const newNote = []

      for (let i = 0;i < note.length;i ++) {
        newNote.push(note[i])
        newNote[i].segmentHeight = 0
        newNote[i].enHeight = 0
        newNote[i].jaHeight = 0
      }

      return assign({}, state, {
        setting: payload.setting,
        note: newNote,
      })
    })()

  case INIT_NOTE:
    return (() => {
      return assign({}, state, {
        setting: Object.assign({}, defaultSetting),
        note: [Object.assign({}, defaultNote)],
        saveFileTitle: '',
        curSegmentNo: 0,
        curComponent: null,
        curColor: 'rgb(0,0,0)',
        name: ''
      })
    })()

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

  case SHOW_TITLE_ALERT_DIALOG:
    return assign({}, state, {
      isShowTitleAlert: payload
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

  case SHOW_PRINT_ERROR_DIALOG:
    return assign({}, state, {
      isShowPrintErrorDialog: payload
    })

  case UPDATE_JA_INPUTING:
    return assign({}, state, {
      isJaInputing: payload
    })

  default:
    return state
  }
}
