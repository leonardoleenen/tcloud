
export const LOAD_DOCUMENT = 'LOAD_DOCUMENT'
export const UPDATE_ENTITY_DETAIL_LIST = 'UPDATE_ENTITY_DETAIL_LIST'
export const CLEAN_DOCUMENT = "CLEAN_DOCUMENT"
export const SHOW_LEFT_PANEL = "SHOW_LEFT_PANEL"
export const HIDE_LEFT_PANEL = "HIDE_LEFT_PANEL"
export const SHOW_RIGHT_PANEL = "SHOW_RIGHT_PANEL"
export const HIDE_RIGHT_PANEL = "HIDE_RIGHT_PANEL"
export const SET_TAG_POS = "SET_TAG_POS"
export const UNSET_TAG_POS = "UNSET_TAG_POS"


export const initState  = { 
  pos_selected : null, 
  document: null, 
  entity_detail_list:[], 
  job_id: null }

export const documentViewerReducer = (state = initState, action) => {
  switch (action.type) {
    case CLEAN_DOCUMENT: 
      return {...state,
        document: action.document,
        entity_detail_list: action.entity_detail_list 
      }
    case LOAD_DOCUMENT:
      return {...state,document: action.document}
    case SET_TAG_POS: 
      return {...state,pos_selected: action.pos_selected}
    case UNSET_TAG_POS:
      return {...state,pos_selected: null}
    case UPDATE_ENTITY_DETAIL_LIST:
      return {...state,entity_detail_list: action.list}
    default:
      return { ...state }
  }
}