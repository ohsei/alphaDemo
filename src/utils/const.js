export const dbName = 'fileSaveDB'

export const tblName = 'fileList'

export const GET_ALL_FILE = 'GET_ALL_FILE'

export const GET_ONE_FILE = 'GET_ONE_FILE'

export const SAVE_ONE_FILE = 'SAVE_ONE_FILE'

export const DEL_ONE_FILE = 'DEL_ONE_FILE'

export const defaultSetting = {
  layout: 'portrait',
  jaPos: 'up',
  enSize: '１倍',
  upJaSize: '24pt',
  downJaSize: 'オフ',
  lineColor: 'gray',
  lineNum: 4,
  interval: 1.2,
  lineNos: 0,
}

export const defaultNote = {
  id: 0,
  type: 'txtOnly',
  html: '',
  jaHtml: '',
  dataUrl: '',
  isPageBreak: false,
  offsetHeight: 0,
  segmentHeight: 0,
  imgWidth: 0,
  imgHeight: 0,
  posX: 20,
  posY: 20,
  height: 0,
}

export const defaultColors = [
  '#000000', '#c0c0c0', '#808080', '#ffffff', '#800000', '#ff0000', '#800080', '#ff00ff', '#008000', '#00ff00', '#808000', '#ffff00', '#000080', '#0000ff', '#008080', '#00ffff'
]


export const enSizeList = [
  {
    id: 0,
    value: '１倍',
  },
  {
    id: 1,
    value: '２倍',
  },
  {
    id: 2,
    value: '４倍'
  }
]

export const intervalList = [
  {
    id: 0,
    value: 1.2,
  },
  {
    id: 1,
    value: 1.5,
  },
]

export const jaSizeList = [
  {
    id: 0,
    value: '24pt',
  },
  {
    id: 1,
    value: '26pt',
  },
  {
    id: 2,
    value: 'オフ',
  },
]

export const lineColorList = [
  {
    id: 0,
    value: 'lightgray',
  },
  {
    id: 1,
    value: 'gray',
  },
  {
    id: 2,
    value: 'black',
  },
]

export const lineNumStyleList = [
  {
    id: 0,
    value: '1,2,3,4......',
  },
  {
    id: 1,
    value: '(1),(2),(3),(4)......',
  },
]

export const lineNumList = [
  {
    id: 0,
    value: 4,
  },
  {
    id: 1,
    value: 2,
  },
]

export const defaultWidth = 1200

export const landscapeWidth = defaultWidth * 1.5

export const defaultPageHeight = 1600

export const landscapePageHeight = 1000