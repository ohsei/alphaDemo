/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux'

import main from './modules/main/reducer'
import menu from './modules/menu/reducer'
import fileDialog from './modules/fileDialog/reducer'
import printNote from './modules/printNote/reducer'

export default combineReducers({
  main,
  menu,
  fileDialog,
  printNote
})
