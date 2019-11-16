
import {LOAD_DOCUMENT, UPDATE_ENTITY_DETAIL_LIST, CLEAN_DOCUMENT} from '../reducers/document_viewer';



export const loadDocument = (document: any) => {
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
      document: {},
      entity_detail_list: []
    })
  }
}