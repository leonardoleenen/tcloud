
import {LOAD_DOCUMENT, UPDATE_ENTITY_DETAIL_LIST, CLEAN_DOCUMENT, initState, SHOW_LEFT_PANEL, HIDE_LEFT_PANEL,SHOW_RIGHT_PANEL,HIDE_RIGHT_PANEL} from '../reducers/document_viewer';
import {sortImages} from '../../service'




export const loadDocument = (document: LNDocument) => {
  document.images = sortImages(document.images)  
  document.images = sortImages(document.images)  
  return (dispatch) => {
    return dispatch({
      type: LOAD_DOCUMENT,
      document
    })
  }
} 

export const updateEntityDetailList = (id: string) => {
  return (dispatch, getState) => {
    let entityDetails = Object.assign([],getState().documentViewer.entity_detail_list as Array<LNEntity>)

    let  entitiesFromDocument =  Object.assign ([],getState().documentViewer.document.entities) as Array<LNEntity>
    
    const alreadyExists  =  entityDetails.filter( (e: LNEntity) =>  e.id ===id).length >=1 
    //console.log(alreadyExists)


    if (alreadyExists ){
      entityDetails = entityDetails.filter( e => e.id != id )
    } //must remove 
    else {
      entityDetails.push( Object.assign( {} , entitiesFromDocument.filter( (e: LNEntity) =>  e.id ===id)[0]))
    }

    return dispatch({
      type: UPDATE_ENTITY_DETAIL_LIST,
      list:  Object.assign([],entityDetails) 
    })
  }
} 

export const cleanDocument = () => {
  return (dispatch) => {
    return dispatch({
      type: CLEAN_DOCUMENT,
      ...initState
    })
  }
}

export const showLeftPanel = () => {
  return (dispatch) => {
    return dispatch({
      type: SHOW_LEFT_PANEL
    })
  }
}

export const hideLeftPanel = () => {
  return (dispatch) => {
    return dispatch({
      type: HIDE_LEFT_PANEL
    })
  }
}


export const showRightPanel = () => {
  return (dispatch) => {
    return dispatch({
      type: SHOW_RIGHT_PANEL
    })
  }
}

export const hideRightPanel = () => {
  return (dispatch) => {
    return dispatch({
      type: HIDE_RIGHT_PANEL
    })
  }
}
