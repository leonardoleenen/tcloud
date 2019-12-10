import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { combineReducers } from 'redux';
//import {userReducer,signUpReducer} from '../redux/reducers/user';
import {documentViewerReducer} from '../redux/reducers/document_viewer';
import {SHOW_LEFT_PANEL,HIDE_LEFT_PANEL, SHOW_RIGHT_PANEL, HIDE_RIGHT_PANEL} from '../redux/reducers/document_viewer'

const initialState = {
  settings:{
    leftPanelIsOpen:true,
    rightPanelIsOpen: true
  },
}

export const settingReducer = (state = initialState.settings, action) => {
  switch (action.type) {
    case SHOW_LEFT_PANEL:
      return {...state,leftPanelIsOpen: true}
    case HIDE_LEFT_PANEL:
        return {...state,leftPanelIsOpen: false}
    case SHOW_RIGHT_PANEL:
        return {...state,rightPanelIsOpen: true}
    case HIDE_RIGHT_PANEL:
        return {...state,rightPanelIsOpen: false}
    default:
      return state
  }
}

const reducers = combineReducers({
  settings: settingReducer,
  documentViewer: documentViewerReducer
});

export function initializeStore (initialState) {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}