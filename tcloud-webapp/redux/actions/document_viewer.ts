
import {LOAD_DOCUMENT, UPDATE_ENTITY_DETAIL_LIST} from '../reducers/document_viewer';

export const loadDocument = (document: any) => {
  return (dispatch, getState) => {
    console.log(getState)
    return dispatch({
      type: LOAD_DOCUMENT,
      document
    })
  }
} 

export const updateEntityDetailList = (id: string) => {
  return (dispatch, getState) => {
    let  list =  Object.assign ([],getState().documentViewer.entity_detail_list)
    const result =  list.filter( e =>  e.key ===id)
    if (result.length >=1 ) //must remove 
      list = list.filter( e => e.key != id )
    else
      list.push( Object.assign({},{key: id, value: getState().documentViewer.document.data[id]}))

    return dispatch({
      type: UPDATE_ENTITY_DETAIL_LIST,
      list 
    })
  }
} 