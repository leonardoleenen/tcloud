
export const LOAD_DOCUMENT = 'LOAD_DOCUMENT'
export const UPDATE_ENTITY_DETAIL_LIST = 'UPDATE_ENTITY_DETAIL_LIST'
export const CLEAN_DOCUMENT = "CLEAN_DOCUMENT"

export const initState  = { document: null, entity_detail_list:[], job_id: null }

export const documentViewerReducer = (state = initState, action) => {
  switch (action.type) {
    case CLEAN_DOCUMENT: 
      return {...state,
        document: action.document,
        entity_detail_list: action.entity_detail_list 
      }
    case LOAD_DOCUMENT:
      return {...state,document: action.document}
    case UPDATE_ENTITY_DETAIL_LIST:
      return {...state,entity_detail_list: action.list}
    default:
      return { ...state }
  }
}