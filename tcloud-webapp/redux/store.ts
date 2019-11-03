import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { combineReducers } from 'redux';
//import {userReducer,signUpReducer} from '../redux/reducers/user';


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
  /*
  user: userReducer,
  signupProcess: signUpReducer, 
  mainProcess: mainProcessReducer,
  agenda: agendaReducer,
  reservation: reservationReducer*/
});

export function initializeStore (initialState) {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}