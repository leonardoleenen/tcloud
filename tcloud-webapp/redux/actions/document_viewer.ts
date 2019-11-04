
import {LOAD_DOCUMENT} from '../reducers/document_viewer';

export const loadDocument = (document: any) => {
  return (dispatch, getState) => {
    console.log(getState)
    return dispatch({
      type: LOAD_DOCUMENT,
      document
    })
  }
} 