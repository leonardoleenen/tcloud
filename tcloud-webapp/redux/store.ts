import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { combineReducers } from 'redux';
//import {userReducer,signUpReducer} from '../redux/reducers/user';
import {documentViewerReducer} from '../redux/reducers/document_viewer';


const initialState = {
  settings:{},
}

export const settingReducer = (state = initialState.settings, action) => {
  switch (action.type) {
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